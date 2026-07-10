
"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

import { deletePetCompletely, getAllPets, type Pet } from "@/lib/pets";

type PetsTableProps = {
  onEdit: (pet: Pet) => void;
};

export default function PetsTable({ onEdit }: PetsTableProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await getAllPets();

        console.log("========== PETS DATA ==========");
        console.log(data);
        console.log("===============================");

        setPets(data ?? []);
      } catch (err) {
        console.error("Error loading pets:", err);
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

  const handleDeletePet = async (pet: Pet) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this pet?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingPetId(pet.id);

    try {
      await deletePetCompletely(
        pet.id,
        pet.images ?? []
      );

      window.location.reload();
    } catch (err) {
      console.error("Error deleting pet:", err);
      setDeletingPetId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow">
        <p className="text-center text-gray-500">
          Loading pets...
        </p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow text-center">
        <PawPrint className="mx-auto h-12 w-12 text-[#D59A3A]" />

        <h2 className="mt-4 text-xl font-bold">
          No pets found
        </h2>

        <p className="mt-2 text-gray-500">
          There are no pets in the database.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow"
        >
          {pet.images?.length > 0 && (
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
          )}

          <div>
            <h3 className="text-xl font-bold">
              {pet.name}
            </h3>

            <p>Breed: {pet.breed}</p>

            <p>Category: {pet.category}</p>

            <p>Status: {pet.status}</p>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => onEdit(pet)}
                className="rounded-full bg-[#D59A3A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c68b31]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDeletePet(pet)}
                disabled={deletingPetId === pet.id}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deletingPetId === pet.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}