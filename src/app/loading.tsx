import BrandedLoader from "@/components/ui/BrandedLoader";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-[#f7f5f8]">
      <BrandedLoader />
    </div>
  );
}
