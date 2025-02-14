import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50">
      <LoadingSpinner />
    </div>
  );
}
