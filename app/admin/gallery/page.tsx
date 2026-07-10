"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import GalleryUploader from "@/components/dashboard/GalleryUploader";
import GalleryGrid from "@/components/dashboard/GalleryGrid";

export default function GalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex justify-end">
        <button
          onClick={() =>
            document.getElementById("gallery-upload-input")?.click()
          }
          className="inline-flex items-center gap-2 rounded-full bg-[#D59A3A] px-6 py-3 font-semibold text-white transition hover:bg-[#C48628]"
        >
          <Plus className="h-5 w-5" />
          Add Images
        </button>
      </div>

      {/* Hidden uploader */}
      <GalleryUploader
        onUpload={() => setRefreshKey((prev) => prev + 1)}
      />

      {/* Gallery */}
      <GalleryGrid key={refreshKey} />
    </div>
  );
}