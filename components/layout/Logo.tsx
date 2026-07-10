import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logos/bunny-pets-zone-logo.png"
        alt="Bunny Pets Zone"
        width={56}
        height={56}
        className="rounded-full"
        priority
      />

      <div className="leading-tight">
        <h2 className="text-lg font-bold text-[#2F2017]">
          Bunny Pets Zone
        </h2>

        <p className="text-sm text-[#7B6A58]">
          Kondapur, Hyderabad
        </p>
      </div>
    </Link>
  );
}