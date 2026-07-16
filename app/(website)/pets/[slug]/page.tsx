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
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">

        <Link
          href="/pets"
          className="mb-8 inline-flex items-center gap-2 text-[#B77932] transition hover:text-[#8F612A]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Pets</span>
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-2">

          {/* Image */}
          <div className="overflow-hidden rounded-[32px] border border-[#EADFCF] bg-white shadow-xl">
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={pet.name}
                fill
                priority
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-contain p-6"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#2A1B14] md:text-5xl">
                {pet.name}
              </h1>

              <p className="mt-3 text-lg text-[#8B6D54]">
                {pet.breed}
              </p>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-2 gap-5">

              <div className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl border border-[#EADFCF] bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-[#9A8C7B]">
                  Category
                </p>

                <p className="mt-2 text-xl font-bold text-[#2A1B14]">
                  {pet.category}
                </p>
              </div>

              <div className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl border border-[#EADFCF] bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-[#9A8C7B]">
                  Type
                </p>

                <p className="mt-2 text-xl font-bold text-[#2A1B14]">
                  {pet.pet_type}
                </p>
              </div>

              <div className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl border border-[#EADFCF] bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-[#9A8C7B]">
                  Age
                </p>

                <p className="mt-2 text-xl font-bold text-[#2A1B14]">
                  {pet.age || "-"}
                </p>
              </div>

              <div className="flex min-h-[110px] flex-col items-center justify-center rounded-3xl border border-[#EADFCF] bg-white p-6 text-center shadow-sm">
                <p className="text-sm font-medium text-[#9A8C7B]">
                  Price
                </p>

                <p className="mt-2 text-xl font-bold text-[#2A1B14]">
                  {pet.price
                    ? `₹${pet.price.toLocaleString()}`
                    : "Contact Us"}
                </p>
              </div>

            </div>

            {/* Description */}
            {pet.description && (
              <div className="rounded-3xl border border-[#EADFCF] bg-white p-7 shadow-sm">
                <h2 className="mb-3 text-2xl font-bold text-[#2A1B14]">
                  Description
                </h2>

                <p className="leading-8 text-[#5D5147]">
                  {pet.description}
                </p>
              </div>
            )}

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/919390969818?text=${encodeURIComponent(
                `Hi, I'm interested in ${pet.name}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[60px] w-full items-center justify-center rounded-full bg-[#C58B32] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#AF7422]"
            >
              Enquire on WhatsApp
            </a>

          </div>

        </div>
      </div>
    </main>
  );
}