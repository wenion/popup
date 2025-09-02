export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen w-xs">
      <main className="container mx-auto flex-grow">
        {children}
      </main>
    </div>
  );
}
