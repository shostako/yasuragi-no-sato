"use client";

import { ImageLayout } from "../../types/news";
import { LayoutGrid, Image as ImageIcon, Grid2X2, Grid3X3, Play } from "lucide-react";

interface ImageLayoutSelectorProps {
  value: ImageLayout;
  onChange: (layout: ImageLayout) => void;
  imageCount: number;
}

const layoutOptions = [
  {
    value: "single" as ImageLayout,
    label: "1列表示",
    icon: ImageIcon,
    description: "画像を1枚ずつ大きく表示",
    minImages: 1,
  },
  {
    value: "grid-2" as ImageLayout,
    label: "2列グリッド",
    icon: Grid2X2,
    description: "画像を2列に並べて表示",
    minImages: 2,
  },
  {
    value: "grid-3" as ImageLayout,
    label: "3列グリッド",
    icon: Grid3X3,
    description: "画像を3列に並べて表示",
    minImages: 3,
  },
  {
    value: "slider" as ImageLayout,
    label: "スライダー",
    icon: Play,
    description: "スライドショー形式で表示",
    minImages: 2,
  },
];

export default function ImageLayoutSelector({
  value,
  onChange,
  imageCount,
}: ImageLayoutSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        画像レイアウト
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {layoutOptions.map((option) => {
          const Icon = option.icon;
          const isDisabled = imageCount < option.minImages;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => !isDisabled && onChange(option.value)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-lg border-2 text-left transition-all
                ${isSelected
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/30"
                }
                ${isDisabled
                  ? "opacity-40 cursor-not-allowed"
                  : "cursor-pointer"
                }
              `}
            >
              <Icon className={`w-8 h-8 mb-2 ${isSelected ? "text-primary" : "text-gray-400"}`} />
              <p className={`font-medium text-sm mb-1 ${isSelected ? "text-primary" : "text-gray-700"}`}>
                {option.label}
              </p>
              <p className="text-xs text-gray-500">{option.description}</p>

              {isDisabled && (
                <p className="text-xs text-red-500 mt-2">
                  最低{option.minImages}枚必要
                </p>
              )}

              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {imageCount === 0 && (
        <p className="text-sm text-amber-600 mt-3 flex items-center gap-2">
          <LayoutGrid className="w-4 h-4" />
          画像をアップロードするとレイアウトを選択できます
        </p>
      )}
    </div>
  );
}
