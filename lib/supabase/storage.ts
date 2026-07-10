import { supabase } from "@/lib/supabase/client";

type StorageBucket = "pets" | "gallery";

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension) {
    throw new Error(`Unable to determine file extension for "${file.name}".`);
  }

  return extension;
}

function createStoragePath(file: File) {
  const extension = getFileExtension(file);
  return `${crypto.randomUUID()}.${extension}`;
}

function getPublicUrl(bucket: StorageBucket, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  if (!data.publicUrl) {
    throw new Error(`Unable to generate public URL for "${path}".`);
  }

  return data.publicUrl;
}

async function uploadImagesToBucket(bucket: StorageBucket, files: File[]) {
  if (!files.length) {
    return [];
  }

  const uploadedPaths: string[] = [];

  try {
    const publicUrls = await Promise.all(
      files.map(async (file) => {
        const path = createStoragePath(file);

        const { error } = await supabase.storage.from(bucket).upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || undefined,
        });

        if (error) {
          throw new Error(
            `Failed to upload "${file.name}" to ${bucket}: ${error.message}`,
          );
        }

        uploadedPaths.push(path);

        return getPublicUrl(bucket, path);
      }),
    );

    return publicUrls;
  } catch (error) {
    if (uploadedPaths.length > 0) {
      await supabase.storage.from(bucket).remove(uploadedPaths);
    }

    throw error instanceof Error
      ? error
      : new Error(`Failed to upload images to ${bucket}.`);
  }
}

export async function uploadPetImages(files: File[]) {
  return uploadImagesToBucket("pets", files);
}

export async function uploadGalleryImages(files: File[]) {
  return uploadImagesToBucket("gallery", files);
}

export async function deleteStorageImage(bucket: string, path: string) {
  if (!bucket.trim()) {
    throw new Error("Storage bucket is required.");
  }

  if (!path.trim()) {
    throw new Error("Storage image path is required.");
  }

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Failed to delete image from ${bucket}: ${error.message}`);
  }
}