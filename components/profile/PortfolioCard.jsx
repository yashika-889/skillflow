import Image from "next/image";

export default function PortfolioCard({ item }) {
  return (
    <div className="card-glass !p-0 overflow-hidden group">
      <div className="relative h-48">
        <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <p className="text-xs text-secondary font-medium">{item.category}</p>
        <h3 className="text-md font-semibold text-white truncate">{item.title}</h3>
      </div>
    </div>
  );
}