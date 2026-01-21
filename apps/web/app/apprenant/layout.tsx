"use client";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <main className="flex-1 overflow-auto">
        <div className=" w-full">{children}</div>
      </main>
    </div>
  );
}
