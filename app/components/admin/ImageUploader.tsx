"use client";

import { useState, useRef } from "react";
import NextImage from "next/image";
import { NewsImage } from "../../types/news";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  images: NewsImage[];
  onChange: (images: NewsImage[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: NewsImage[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result as string;
          newImages.push({
            url,
            alt: file.name,
            caption: "",
          });

          if (newImages.length === files.length) {
            onChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], caption };
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* ドラッグ&ドロップエリア */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
          }
        `}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 mb-2">
          画像をドラッグ&ドロップ、またはクリックして選択
        </p>
        <p className="text-sm text-gray-400">
          複数の画像を選択できます（PNG, JPG, GIF）
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* 画像プレビュー */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                <NextImage
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* 削除ボタン */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>

              {/* キャプション入力 */}
              <input
                type="text"
                value={image.caption || ""}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                placeholder="キャプション（任意）"
                className="mt-2 w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      )}

      {/* 画像枚数表示 */}
      {images.length > 0 && (
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          {images.length}枚の画像
        </p>
      )}
    </div>
  );
}
