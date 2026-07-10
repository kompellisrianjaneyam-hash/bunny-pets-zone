
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import PetForm from "@/components/dashboard/PetForm";
import PetsTable from "@/components/dashboard/PetsTable";
import type { Pet } from "@/lib/supabase/pets";

export default function AdminPetsPage() {
  const [openPetForm, setOpenPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  const handleAddNewPet = () => {
    setEditingPet(null);
    setOpenPetForm(true);
  };

  const handleClosePetForm = () => {
    setOpenPetForm(false);
    setEditingPet(null);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setOpenPetForm(true);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={handleAddNewPet}
            className="inline-flex items-center gap-2 rounded-full bg-[#D59A3A] px-6 py-3 font-semibold text-white transition hover:bg-[#c68b31]"
          >
            <Plus className="h-5 w-5" />
            Add New Pet
          </button>
        </div>

        <PetsTable onEdit={handleEditPet} />
      </div>

      <PetForm
        open={openPetForm}
        pet={editingPet}
        onClose={handleClosePetForm}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}