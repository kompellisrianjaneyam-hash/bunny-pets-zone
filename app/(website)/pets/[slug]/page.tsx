import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getPetBySlug } from "@/lib/pets";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PetDetailsPage({ params }: Props) {
  const { slug } = await params;

  const pet = await getPetBySlug(slug);

  if (!pet) {
    notFound();
  }

  const image =
    pet.images && pet.images.length > 0
      ? pet.images[0]
      : "/images/pet-placeholder.jpg";

  return (
    <main className="min-h-screen bg-[#faf7f2]">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <Link
          href="/pets"
          className="mb-8 inline-flex items-center gap-2 text-[#8b5e3c] hover:text-[#6f4b30]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pets
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={pet.name}
                fill
                className="object-contain p-4"
                sizes="(max-width:768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">

            <div>
              <h1 className="text-4xl font-bold text-[#2b1d16]">
                {pet.name}
              </h1>

              <p className="mt-2 text-lg text-[#8b5e3c]">
                {pet.breed}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white p-5 shadow">
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold">{pet.category}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow">
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-semibold">{pet.pet_type}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow">
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{pet.age || "-"}</p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow">
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-semibold">
                  {pet.price
                    ? `₹${pet.price.toLocaleString()}`
                    : "Contact Us"}
                </p>
              </div>

            </div>

            {pet.description && (
              <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-2 text-xl font-semibold">
                  Description
                </h2>

                <p className="text-gray-700">
                  {pet.description}
                </p>
              </div>
            )}

            <a
              href={`https://wa.me/919390969818?text=Hi, I'm interested in ${pet.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl bg-[#c58b32] px-8 py-4 font-semibold text-white hover:bg-[#b07829]"
            >
              Enquire on WhatsApp
            </a>

          </div>

        </div>
      </div>
    </main>
  );
}