import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export interface UploadedImage {
  url: string;
  alt: string;
  caption?: string;
}

/**
 * 画像をFirebase Storageにアップロード
 */
export async function uploadImage(
  file: File,
  newsId: string
): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized");
  }

  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name}`;
  const storageRef = ref(storage, `news-images/${newsId}/${filename}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}

/**
 * 画像をFirebase Storageから削除
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized");
  }

  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
}

/**
 * 複数画像を一括アップロード
 */
export async function uploadImages(
  files: File[],
  newsId: string
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, newsId));
  return Promise.all(uploadPromises);
}
