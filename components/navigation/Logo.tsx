import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="text-[length:var(--text-base)] font-bold text-foreground hover:opacity-80 transition-opacity duration-150"
    >
      ArtisanDoors
    </Link>
  );
}
