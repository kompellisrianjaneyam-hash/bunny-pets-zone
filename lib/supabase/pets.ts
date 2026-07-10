import { supabase } from "@/lib/supabase/client";

export type PetStatus = "available" | "coming_soon" | "sold_out";
export type PetCategory = "Dog" | "Cat" | "Bird" | "Hamster";

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

export type CreatePetInput = Omit<Pet, "id" | "created_at" | "updated_at">;

export type UpdatePetInput = Partial<CreatePetInput>;

function handleSupabaseError(error: { message: string } | null, action: string) {
  if (error) {
    throw new Error(`${action}: ${error.message}`);
  }
}

export async function getPets() {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .order("created_at", { ascending: false });

  handleSupabaseError(error, "Failed to fetch pets");

  return data as Pet[];
}

export async function getVisiblePets() {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("show_on_website", true)
    .order("created_at", { ascending: false });

  handleSupabaseError(error, "Failed to fetch visible pets");

  return data as Pet[];
}

export async function getFeaturedPets() {
  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("featured_homepage", true)
    .eq("show_on_website", true)
    .eq("status", "available")
    .order("created_at", { ascending: false });

  handleSupabaseError(error, "Failed to fetch featured pets");

  return data as Pet[];
}

export async function createPet(data: CreatePetInput) {
  const { data: insertedPet, error } = await supabase
    .from("pets")
    .insert(data)
    .select("*")
    .single();

  handleSupabaseError(error, "Failed to create pet");

  return insertedPet as Pet;
}

export async function updatePet(id: string, data: UpdatePetInput) {
  if (!id.trim()) {
    throw new Error("Pet id is required.");
  }

  const { data: updatedPet, error } = await supabase
    .from("pets")
    .update(data)
    .eq("id", id)
    .select("*")
    .single();

  handleSupabaseError(error, "Failed to update pet");

  return updatedPet as Pet;
}

export async function deletePet(id: string) {
  if (!id.trim()) {
    throw new Error("Pet id is required.");
  }

  const { error } = await supabase.from("pets").delete().eq("id", id);

  handleSupabaseError(error, "Failed to delete pet");
}

export async function getPet(id: string) {
  if (!id.trim()) {
    throw new Error("Pet id is required.");
  }

  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("id", id)
    .single();

  handleSupabaseError(error, "Failed to fetch pet");

  return data as Pet;
}