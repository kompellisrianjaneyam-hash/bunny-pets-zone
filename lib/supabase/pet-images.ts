import { supabase } from "@/lib/supabase/client";

export type PetImage = {
  id: string;
  pet_id: string;
  image_url: string;
  created_at: string;
};

export type CreatePetImageInput = {
  pet_id: string;
  image_url: string;
};

function handleSupabaseError(error: { message: string } | null, action: string) {
  if (error) {
    throw new Error(`${action}: ${error.message}`);
  }
}

export async function savePetImages(petId: string, imageUrls: string[]) {
  if (!petId.trim()) {
    throw new Error("Pet id is required.");
  }

  if (!imageUrls.length) {
    return [];
  }

  const rows: CreatePetImageInput[] = imageUrls.map((imageUrl) => {
    if (!imageUrl.trim()) {
      throw new Error("Image URL cannot be empty.");
    }

    return {
      pet_id: petId,
      image_url: imageUrl,
    };
  });

  const { data, error } = await supabase
    .from("pet_images")
    .insert(rows)
    .select("*");

  handleSupabaseError(error, "Failed to save pet images");

  return data as PetImage[];
}

export async function getPetImages(petId: string) {
  if (!petId.trim()) {
    throw new Error("Pet id is required.");
  }

  const { data, error } = await supabase
    .from("pet_images")
    .select("*")
    .eq("pet_id", petId)
    .order("created_at", { ascending: true });

  handleSupabaseError(error, "Failed to fetch pet images");

  return data as PetImage[];
}

export async function deletePetImages(petId: string) {
  if (!petId.trim()) {
    throw new Error("Pet id is required.");
  }

  const { error } = await supabase
    .from("pet_images")
    .delete()
    .eq("pet_id", petId);

  handleSupabaseError(error, "Failed to delete pet images");
}