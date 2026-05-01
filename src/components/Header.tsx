import Link from "next/link";
import { Menu, Skull } from "lucide-react";

const navItems = [
  { title: "Оружие", href: "/weapons" },
  { title: "Бункеры", href: "/bunkers" },
  { title: "Лут", href: "/loot" },
  { title: "Карта", href: "/map" },
  { title: "Гайды", href: "/guides" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-red-500/40 bg-red-600/15 text-red-400 shadow-danger">
            <Skull size={24} />
          </div>
          <div>
            <div className="text-lg font-black tracking-wide text-white">SCUM DB PRO</div>
            <div className="text-xs text-zinc-500">Knowledge Base</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-zinc-400 transition hover:text-white">
              {item.title}
            </Link>
          ))}
        </nav>

        <Link href="/pro-roadmap" className="hidden rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200 transition hover:bg-red-500/20 md:block">
          PRO roadmap
        </Link>
        <div className="text-zinc-400 lg:hidden"><Menu /></div>
      </div>
    </header>
  );
}
