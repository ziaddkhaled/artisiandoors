import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant:
    | "product-card"
    | "product-detail"
    | "cart-item"
    | "text-line"
    | "image";
  count?: number;
}

export function LoadingSkeleton({ variant, count = 1 }: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      aria-busy="true"
      aria-label="Loading content"
      className="animate-pulse"
    >
      {items.map((i) => (
        <div key={i} className={cn(i > 0 && "mt-4")}>
          {variant === "product-card" && <ProductCardSkeleton />}
          {variant === "product-detail" && <ProductDetailSkeleton />}
          {variant === "cart-item" && <CartItemSkeleton />}
          {variant === "text-line" && <TextLineSkeleton />}
          {variant === "image" && <ImageSkeleton />}
        </div>
      ))}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[3/4] bg-background-accent rounded-t-[11px]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-background-accent rounded w-20" />
        <div className="h-5 bg-background-accent rounded w-3/4" />
        <div className="h-4 bg-background-accent rounded w-full" />
        <div className="h-5 bg-background-accent rounded w-24" />
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-[3/4] bg-background-accent rounded-[12px]" />
      <div className="space-y-4">
        <div className="h-6 bg-background-accent rounded w-24" />
        <div className="h-8 bg-background-accent rounded w-3/4" />
        <div className="h-4 bg-background-accent rounded w-full" />
        <div className="h-4 bg-background-accent rounded w-5/6" />
        <div className="h-10 bg-background-accent rounded w-32 mt-4" />
      </div>
    </div>
  );
}

function CartItemSkeleton() {
  return (
    <div className="card p-4 flex gap-4">
      <div className="w-24 h-24 bg-background-accent rounded-[8px]" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-background-accent rounded w-3/4" />
        <div className="h-4 bg-background-accent rounded w-1/2" />
        <div className="h-4 bg-background-accent rounded w-20" />
      </div>
    </div>
  );
}

function TextLineSkeleton() {
  return <div className="h-4 bg-background-accent rounded w-full" />;
}

function ImageSkeleton() {
  return (
    <div className="aspect-video bg-background-accent rounded-[12px]" />
  );
}
