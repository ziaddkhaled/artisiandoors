"use client";

import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/utils";

interface AvatarGroupProps {
  avatars: Array<{ src: string; alt: string }>;
  text: string;
}

const defaultAvatars = [
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80",
    alt: "Homeowner testimonial",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&q=80",
    alt: "Homeowner testimonial",
  },
  {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&q=80",
    alt: "Homeowner testimonial",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&q=80",
    alt: "Homeowner testimonial",
  },
  {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&q=80",
    alt: "Homeowner testimonial",
  },
];

export function AvatarGroup({
  avatars = defaultAvatars,
  text,
}: AvatarGroupProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {avatars.map((avatar, i) => (
          <div
            key={i}
            className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-[12px] overflow-hidden border-2 border-background"
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={48}
              height={48}
              className="object-cover w-full h-full"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        ))}
      </div>
      <p className="text-[length:var(--text-sm)] text-muted">{text}</p>
    </div>
  );
}
