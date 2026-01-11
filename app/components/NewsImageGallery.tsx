"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageLayout, NewsImage } from "../types/news";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsImageGalleryProps {
  images: NewsImage[];
  layout: ImageLayout;
}

export default function NewsImageGallery({ images, layout }: NewsImageGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  // スライダーの場合
  if (layout === "slider") {
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="mb-8">
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={images[currentSlide].url}
            alt={images[currentSlide].alt}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            unoptimized
          />

          {/* ナビゲーションボタン */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* インジケーター */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* キャプション */}
        {images[currentSlide].caption && (
          <p className="mt-3 text-sm text-gray-600 text-center">
            {images[currentSlide].caption}
          </p>
        )}
      </div>
    );
  }

  // 1列表示
  if (layout === "single") {
    return (
      <div className="space-y-6 mb-8">
        {images.map((image, index) => (
          <div key={index}>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                unoptimized
              />
            </div>
            {image.caption && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                {image.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  // グリッド表示（2列・3列）
  const gridCols = layout === "grid-2" ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-4 mb-8`}>
      {images.map((image, index) => (
        <div key={index} className="group">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes={`(max-width: 896px) ${layout === "grid-2" ? "50vw" : "33vw"}, ${layout === "grid-2" ? "448px" : "299px"}`}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          </div>
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600">{image.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
