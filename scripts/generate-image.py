#!/usr/bin/env python3
"""
Nano Banana Pro (Gemini 3 Pro Image) を使った画像生成スクリプト
Usage: python generate-image.py "プロンプト" "出力ファイル名"
"""

import sys
import os
import base64
import requests
from pathlib import Path

def generate_image(prompt: str, output_path: str):
    """Nano Banana Pro で画像を生成"""

    # API Key取得
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY or GOOGLE_API_KEY environment variable not set")
        sys.exit(1)

    # モデルとエンドポイント (Nano Banana Pro)
    model = "gemini-3-pro-image-preview"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

    # リクエストヘッダー
    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": api_key
    }

    # リクエストボディ
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "temperature": 1.0,
            "topP": 0.95,
            "topK": 40,
            "responseModalities": ["image", "text"]
        }
    }

    print(f"Generating: {prompt[:50]}...")

    # API呼び出し
    response = requests.post(url, headers=headers, json=payload, timeout=120)

    if response.status_code != 200:
        print(f"Error: API returned {response.status_code}")
        print(response.text)
        sys.exit(1)

    # レスポンス解析
    data = response.json()

    # 画像データを抽出
    try:
        candidates = data.get("candidates", [])
        if not candidates:
            print("Error: No candidates in response")
            print(data)
            sys.exit(1)

        parts = candidates[0].get("content", {}).get("parts", [])

        for part in parts:
            if "inlineData" in part:
                image_data = part["inlineData"]["data"]
                mime_type = part["inlineData"].get("mimeType", "image/png")

                # Base64デコードして保存
                image_bytes = base64.b64decode(image_data)

                # 出力パス作成
                output = Path(output_path)
                output.parent.mkdir(parents=True, exist_ok=True)

                with open(output, "wb") as f:
                    f.write(image_bytes)

                print(f"Saved: {output} ({len(image_bytes):,} bytes)")
                return True

        print("Error: No image data in response")
        print(data)
        return False

    except Exception as e:
        print(f"Error parsing response: {e}")
        print(data)
        return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate-image.py 'prompt' 'output_path'")
        sys.exit(1)

    prompt = sys.argv[1]
    output = sys.argv[2]

    generate_image(prompt, output)
