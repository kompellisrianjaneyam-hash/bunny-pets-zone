import { supabase } from "@/lib/supabase/client";

export type GalleryImage = {
  id: string;
  image_url: string;
  show_on_homepage: boolean;
  created_at: string;
};

function handleSupabaseError(
  error: { message: string } | null,
  action: string
) {
  if (error) {
    throw new Error(`${action}: ${error.message}`);
  }
}

export async function getGalleryImages() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  handleSupabaseError(error, "Failed to fetch gallery images");

  return data as GalleryImage[];
}

export async function uploadGalleryImage(
  imageUrl: string,
  showOnHomepage = true
) {
  const { data, error } = await supabase
    .from("gallery")
    .insert({
      image_url: imageUrl,
      show_on_homepage: showOnHomepage,
    })
    .select()
    .single();

  handleSupabaseError(error, "Failed to upload gallery image");

  return data as GalleryImage;
}

export async function deleteGalleryImage(id: string) {
  const { error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id);

  handleSupabaseError(error, "Failed to delete gallery image");
}