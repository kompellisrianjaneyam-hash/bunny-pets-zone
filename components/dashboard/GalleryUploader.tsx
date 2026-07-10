"use client";

import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase/client";
import { uploadGalleryImage } from "@/lib/gallery";

type GalleryUploaderProps = {
  onUpload: () => void;
};

export default function GalleryUploader({
  onUpload,
}: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      await uploadGalleryImage(publicUrl, true);

      onUpload();

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <input
        id="gallery-upload-input"
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
      />

      {uploading && (
        <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow">
          <Loader2 className="h-5 w-5 animate-spin text-[#D59A3A]" />
          <span className="font-medium text-[#2F2017]">
            Uploading image...
          </span>
        </div>
      )}
    </>
  );
}