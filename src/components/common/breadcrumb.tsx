import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: {
    path: string;
    name: string;
  }[];
}) {
  return (
    <div className="flex items-center gap-3">
      {items.map((item, index) => (
        <div className="flex items-center gap-3" key={item.path}>
          <Link
            href={item.path}
            className="font-semibold text-sky-600 transition hover:text-amber-500"
          >
            {item.name}
          </Link>

          {index < items.length - 1 && (
            <span className="text-xs text-gray-400">»</span>
          )}
        </div>
      ))}
    </div>
  );
}
