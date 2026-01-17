"use client";

import {
  useState,
  useRef,
  useCallback,
  createElement,
  KeyboardEvent,
  useEffect,
} from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePageContent } from "../contexts/PageContentContext";

interface EditableTextProps {
  contentKey: string;
  defaultValue: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  multiline?: boolean;
}

export function EditableText({
  contentKey,
  defaultValue,
  as = "span",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const { adminMode } = useAuth();
  const { contents, updateContent } = usePageContent();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const originalValueRef = useRef<string>("");

  // Firestoreの値 > デフォルト値
  const displayValue = contents[contentKey] ?? defaultValue;

  // displayValueが変更されたら要素のテキストを更新（編集中以外）
  useEffect(() => {
    if (!isEditing && elementRef.current) {
      elementRef.current.textContent = displayValue;
    }
  }, [displayValue, isEditing]);

  const handleClick = useCallback(() => {
    if (!adminMode || isEditing) return;

    // 編集開始時の値を保存
    originalValueRef.current = displayValue;
    setIsEditing(true);

    // 次のティックでフォーカス
    setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.focus();
        // カーソルを末尾に
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(elementRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, 0);
  }, [adminMode, isEditing, displayValue]);

  const handleBlur = useCallback(async () => {
    if (!isEditing) return;

    const newValue = elementRef.current?.textContent?.trim() || "";

    // 変更がなければ何もしない
    if (newValue === originalValueRef.current) {
      setIsEditing(false);
      return;
    }

    // 空の場合は元に戻す
    if (!newValue) {
      if (elementRef.current) {
        elementRef.current.textContent = originalValueRef.current;
      }
      setIsEditing(false);
      return;
    }

    setIsSaving(true);

    try {
      await updateContent(contentKey, newValue);
    } catch (error) {
      console.error("Failed to save:", error);
      // エラー時は元の値に戻す
      if (elementRef.current) {
        elementRef.current.textContent = originalValueRef.current;
      }
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  }, [isEditing, contentKey, updateContent]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // キャンセル
        if (elementRef.current) {
          elementRef.current.textContent = originalValueRef.current;
        }
        setIsEditing(false);
        elementRef.current?.blur();
      } else if (e.key === "Enter" && !multiline) {
        // シングルラインの場合はEnterで確定
        e.preventDefault();
        elementRef.current?.blur();
      }
    },
    [multiline]
  );

  // 編集モード時のスタイル
  const editModeStyles = adminMode
    ? isEditing
      ? "outline outline-2 outline-[var(--color-accent)] outline-offset-2 bg-white/50 cursor-text"
      : "hover:outline hover:outline-1 hover:outline-[var(--color-accent)]/50 hover:outline-offset-2 cursor-pointer transition-all"
    : "";

  // 保存中インジケーター
  const savingStyles = isSaving ? "opacity-70" : "";

  return createElement(
    as,
    {
      ref: elementRef,
      className: `${className} ${editModeStyles} ${savingStyles} ${
        adminMode ? "relative" : ""
      }`.trim(),
      contentEditable: isEditing,
      suppressContentEditableWarning: true,
      onClick: handleClick,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
    },
    displayValue
  );
}
