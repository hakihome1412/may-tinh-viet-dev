export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1200px] mx-auto px-1 md:px-0 ${className}`}>
      {children}
    </div>
  );
}
