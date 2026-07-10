"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, ImageIcon } from "lucide-react";

import {
  getGalleryImages,
  deleteGalleryImage,
  type GalleryImage,
} from "@/lib/gallery";

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadImages() {
    try {
      setLoading(true);
      const data = await getGalleryImages();
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function handleDelete(image: GalleryImage) {
    if (!confirm("Delete this image?")) return;

    try {
      await deleteGalleryImage(image.id);
      loadImages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow">
        Loading gallery...
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-20 text-center shadow">
        <ImageIcon className="mx-auto h-14 w-14 text-[#D59A3A]" />
        <h2 className="mt-5 text-2xl font-bold">
          No Gallery Images
        </h2>
        <p className="mt-2 text-gray-500">
          Upload your first image.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="overflow-hidden rounded-3xl bg-white shadow"
        >
          <div className="relative aspect-square">
            <Image
              src={image.image_url}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex justify-end p-4">
            <button
              onClick={() => handleDelete(image)}
              className="rounded-full bg-red-500 p-3 text-white hover:bg-red-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}