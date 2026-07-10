
import { supabase } from "@/lib/supabase/client";

export type PetStatus =
  | "available"
  | "coming_soon"
  | "sold_out";

export type PetCategory =
  | "Dog"
  | "Cat"
  | "Bird"
  | "Hamster";

export type Pet = {
  id: string;
  name: string;
  slug: string;
  category: PetCategory;
  breed: string;
  pet_type: string;
  age: string | null;
  price: number | null;
  description: string | null;
  status: PetStatus;
  show_on_website: boolean;
  featured_homepage: boolean;
  images: string[];
  created_at: string;
  updated_at: string | null;
};

export async function getAllPets() {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data as Pet[];
}

export async function deletePet(id: string) {
  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

function getGalleryFilePath(imageUrl: string) {
  try {
    const url = new URL(imageUrl);
    const publicPath = "/storage/v1/object/public/gallery/";
    const signedPath = "/storage/v1/object/sign/gallery/";

    if (url.pathname.includes(publicPath)) {
      return decodeURIComponent(url.pathname.split(publicPath)[1] ?? "");
    }

    if (url.pathname.includes(signedPath)) {
      return decodeURIComponent(url.pathname.split(signedPath)[1] ?? "");
    }

    return decodeURIComponent(url.pathname.split("/gallery/")[1] ?? "");
  } catch {
    return imageUrl;
  }
}

export async function deletePetCompletely(id: string, images: string[]) {
  const filePaths = images
    .map(getGalleryFilePath)
    .filter(Boolean);

  for (const filePath of filePaths) {
    const { error } = await supabase
      .storage
      .from("gallery")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting pet image:", error);
    }
  }

  const { error: petImagesError } = await supabase
    .from("pet_images")
    .delete()
    .eq("pet_id", id);

  if (petImagesError) {
    console.error("Error deleting pet_images rows:", petImagesError);
  }

  const { error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updatePet(
  id: string,
  values: Partial<Pet>
) {
  const { error } = await supabase
    .from("pets")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}

export async function createPet(
  values: Omit<
    Pet,
    "id" | "created_at" | "updated_at"
  >
) {
  const { error } = await supabase
    .from("pets")
    .insert(values);

  if (error) throw error;
}