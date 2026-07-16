"use client";

import { motion, type Variants } from "framer-motion";
import { ImagePlus, Save, X } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { savePetImages } from "@/lib/supabase/pet-images";
import {
  createPet,
  type CreatePetInput,
  type Pet,
  type PetCategory,
  type PetStatus,
  updatePet,
} from "@/lib/supabase/pets";
import { uploadPetImages } from "@/lib/supabase/storage";

type PetFormProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  pet?: Pet | null;
};

type FormErrors = {
  petName?: string;
  category?: string;
  breed?: string;
  images?: string;
  form?: string;
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.34,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function createSlug(value: string) {
  const baseSlug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Unique suffix based on current timestamp
  const unique = Date.now().toString();

  return `${baseSlug}-${unique}`;
}

function mapStatus(value: string): PetStatus {
  if (value === "Coming Soon") return "coming_soon";
  if (value === "Sold Out") return "sold_out";
  return "available";
}

function mapStatusLabel(value?: PetStatus | null) {
  if (value === "coming_soon") return "Coming Soon";
  if (value === "sold_out") return "Sold Out";
  return "Available";
}

export default function PetForm({ open, onClose, onSuccess, pet = null }: PetFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  if (!open) return null;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(Array.from(event.target.files ?? []));
    setErrors((currentErrors) => ({
      ...currentErrors,
      images: undefined,
      form: undefined,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const petName = String(formData.get("petName") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const breed = String(formData.get("breed") ?? "").trim();
    const petType = String(formData.get("petType") ?? "").trim();
    const age = String(formData.get("age") ?? "").trim();
    const priceValue = String(formData.get("price") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const status = String(formData.get("status") ?? "Available");
    const showOnWebsite = formData.get("showOnWebsite") === "on";
    const featuredHomepage = formData.get("featuredHomepage") === "on";

    const validationErrors: FormErrors = {};

    if (!petName) {
      validationErrors.petName = "Pet name is required.";
    }

    if (!category) {
      validationErrors.category = "Category is required.";
    }

    if (!breed) {
      validationErrors.breed = "Breed is required.";
    }

    if (selectedFiles.length === 0 && (!pet?.images || pet.images.length === 0)) {
      validationErrors.images = "Please select at least one image.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      const uploadedImageUrls =
        selectedFiles.length > 0 ? await uploadPetImages(selectedFiles) : [];
      const imageUrls =
        pet && uploadedImageUrls.length === 0 ? pet.images ?? [] : uploadedImageUrls;

      const petData: CreatePetInput = {
        name: petName,
        slug: createSlug(petName),
        category: category as PetCategory,
        breed,
        pet_type: petType,
        age: age || null,
        price: priceValue ? Number(priceValue) : null,
        description: description || null,
        status: mapStatus(status),
        show_on_website: showOnWebsite,
        featured_homepage: featuredHomepage,
        images: imageUrls,
      };

      const savedPet = pet ? await updatePet(pet.id, petData) : await createPet(petData);

      if (uploadedImageUrls.length > 0 || !pet) {
        await savePetImages(savedPet.id, imageUrls);
      }

      formRef.current?.reset();
      setSelectedFiles([]);
      setErrors({});
      onClose();
      onSuccess?.();
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Something went wrong while saving the pet.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-form-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/18 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.form
        key={pet?.id ?? "new-pet"}
        ref={formRef}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#ECECEC] bg-[#FFF8F0]/92 shadow-[0_28px_90px_rgba(47,32,23,0.18)] backdrop-blur-2xl"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#D59A3A]/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-orange-200/38 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#ECECEC] bg-white/44 px-5 py-5 backdrop-blur-xl sm:px-7">
          <div>
            <p className="text-sm font-bold text-[#D59A3A]">Pet Listing</p>
            <h2
              id="pet-form-title"
              className="mt-1 font-[Poppins] text-2xl font-bold tracking-tight text-[#2F2017]"
            >
              {pet ? "Edit Pet" : "Add New Pet"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close pet form"
            disabled={isSaving}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#ECECEC] bg-white/70 text-[#2F2017] shadow-sm outline-none transition duration-300 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] disabled:pointer-events-none disabled:opacity-60"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <div className="relative z-10 max-h-[calc(92vh-9rem)] overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label
                htmlFor="pet-name"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Pet Name *
              </label>
              <input
                id="pet-name"
                name="petName"
                type="text"
                required
                defaultValue={pet?.name ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Enter pet name"
                aria-invalid={Boolean(errors.petName)}
                aria-describedby={errors.petName ? "pet-name-error" : undefined}
              />
              {errors.petName ? (
                <p
                  id="pet-name-error"
                  className="mt-2 text-sm font-semibold text-red-600"
                >
                  {errors.petName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={pet?.category ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                aria-invalid={Boolean(errors.category)}
                aria-describedby={errors.category ? "category-error" : undefined}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Hamster">Hamster</option>
              </select>
              {errors.category ? (
                <p
                  id="category-error"
                  className="mt-2 text-sm font-semibold text-red-600"
                >
                  {errors.category}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={mapStatusLabel(pet?.status)}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
              >
                <option value="Available">Available</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Sold Out">Sold Out</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="breed"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Breed *
              </label>
              <input
                id="breed"
                name="breed"
                type="text"
                required
                defaultValue={pet?.breed ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Enter breed"
                aria-invalid={Boolean(errors.breed)}
                aria-describedby={errors.breed ? "breed-error" : undefined}
              />
              {errors.breed ? (
                <p
                  id="breed-error"
                  className="mt-2 text-sm font-semibold text-red-600"
                >
                  {errors.breed}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="pet-type"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Pet Type *
              </label>
              <input
                id="pet-type"
                name="petType"
                type="text"
                required
                defaultValue={pet?.pet_type ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Enter type"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="text"
                defaultValue={pet?.age ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Example: 2 Months"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                inputMode="numeric"
                defaultValue={pet?.price ?? ""}
                className="h-13 w-full rounded-2xl border border-[#ECECEC] bg-white/70 px-4 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Enter price"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={pet?.description ?? ""}
                className="w-full resize-none rounded-2xl border border-[#ECECEC] bg-white/70 px-4 py-3 text-base font-semibold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none backdrop-blur-xl transition duration-300 placeholder:text-[#5B4A3F]/45 focus:border-[#D59A3A] focus:ring-2 focus:ring-[#D59A3A]/20"
                placeholder="Write a short description"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="pet-images"
                className="mb-2 block text-sm font-bold text-[#2F2017]"
              >
                Pet Images
              </label>
              <label
                htmlFor="pet-images"
                className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[#D59A3A]/45 bg-white/54 px-6 py-8 text-center shadow-lg shadow-[#2F2017]/5 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#D59A3A] hover:bg-white/70"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#D59A3A]/12 text-[#D59A3A]">
                  <ImagePlus
                    aria-hidden="true"
                    className="h-7 w-7"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="mt-4 text-base font-bold text-[#2F2017]">
                  Upload multiple images
                </span>
                <span className="mt-1 text-sm font-medium text-[#5B4A3F]">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} image${
                        selectedFiles.length === 1 ? "" : "s"
                      } selected`
                    : pet?.images?.length
                      ? `${pet.images.length} existing image${
                          pet.images.length === 1 ? "" : "s"
                        }`
                    : "Images will be connected later."}
                </span>
                <input
                  id="pet-images"
                  name="petImages"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-invalid={Boolean(errors.images)}
                  aria-describedby={errors.images ? "pet-images-error" : undefined}
                />
              </label>
              {errors.images ? (
                <p
                  id="pet-images-error"
                  className="mt-2 text-sm font-semibold text-red-600"
                >
                  {errors.images}
                </p>
              ) : null}
            </div>

            <div className="md:col-span-2 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white/62 p-4 shadow-lg shadow-[#2F2017]/5 transition duration-300 hover:border-[#D59A3A]/45">
                <input
                  type="checkbox"
                  name="showOnWebsite"
                  defaultChecked={pet?.show_on_website ?? false}
                  className="h-5 w-5 rounded border-[#ECECEC] accent-[#D59A3A]"
                />
                <span className="font-bold text-[#2F2017]">Show on Website</span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#ECECEC] bg-white/62 p-4 shadow-lg shadow-[#2F2017]/5 transition duration-300 hover:border-[#D59A3A]/45">
                <input
                  type="checkbox"
                  name="featuredHomepage"
                  defaultChecked={pet?.featured_homepage ?? false}
                  className="h-5 w-5 rounded border-[#ECECEC] accent-[#D59A3A]"
                />
                <span className="font-bold text-[#2F2017]">
                  Featured on Homepage
                </span>
              </label>
            </div>

            {errors.form ? (
              <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
                {errors.form}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative z-10 flex flex-col-reverse gap-3 border-t border-[#ECECEC] bg-white/44 px-5 py-5 backdrop-blur-xl sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#ECECEC] bg-white/70 px-6 text-sm font-bold text-[#2F2017] shadow-lg shadow-[#2F2017]/5 outline-none transition duration-300 hover:-translate-y-0.5 hover:border-[#D59A3A]/45 hover:text-[#D59A3A] focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] disabled:pointer-events-none disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D59A3A] px-6 text-sm font-bold text-white shadow-xl shadow-[#D59A3A]/20 outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-[#c68b31] hover:shadow-2xl hover:shadow-[#D59A3A]/25 focus-visible:ring-2 focus-visible:ring-[#D59A3A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FFF8F0] disabled:pointer-events-none disabled:opacity-70"
          >
            <Save aria-hidden="true" className="h-5 w-5" strokeWidth={2.1} />
            {isSaving ? "Saving..." : pet ? "Update Pet" : "Save Pet"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}