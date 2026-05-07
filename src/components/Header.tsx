"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Skull, X } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/lib/useFavorites";

const navItems = [
  { title: "Главная", href: "/" }, { title: "Поиск", href: "/search" }, { title: "Оружие", href: "/weapons" },
  { title: "Обвесы", href: "/weapons/attachments" }, { title: "Лут", href: "/loot" }, { title: "Бункеры", href: "/bunkers" },
  { title: "Карта", href: "/map" }, { title: "Базы", href: "/bases" }, { title: "Транспорт", href: "/vehicles" },
  { title: "Подготовка", href: "/preparation" }, { title: "Гайды", href: "/guides" },
];
function isActiveLink(pathname: string, href: string) { if (href === "/") return pathname === "/"; return pathname === href || pathname.startsWith(`${href}/`); }
function navLinkClass(active: boolean) { return active ? "shrink-0 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm font-black text-red-200" : "shrink-0 rounded-xl px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white"; }

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { count } = useFavorites();
  const mobileItems = [...navItems, { title: "Избранное", href: "/favorites" }, { title: "Admin", href: "/admin" }, { title: "PRO roadmap", href: "/pro-roadmap" }];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] items-center gap-3 px-3 py-3 sm:px-4">
        <Link href="/" className="flex min-w-fit items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-red-500/40 bg-red-600/15 text-red-400 shadow-danger"><Skull size={22} /></div>
          <div className="hidden min-w-0 sm:block"><div className="truncate text-lg font-black tracking-wide text-white">SCUM DB PRO</div><div className="text-xs text-zinc-500">Knowledge Base v4.24</div></div>
        </Link>
        <nav className="scrollbar-hide hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto px-2 lg:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={navLinkClass(isActiveLink(pathname, item.href))}>{item.title}</Link>)}
        </nav>
        <div className="ml-auto hidden min-w-fit items-center gap-2 md:flex">
          <Link href="/favorites" className="relative rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white" aria-label="Избранное"><Heart className="inline h-4 w-4" />{count > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">{count > 9 ? "9+" : count}</span>}</Link>
          <Link href="/admin" className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-bold text-zinc-300 transition hover:border-red-500/50 hover:text-white">Admin</Link>
          <Link href="/pro-roadmap" className="hidden rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-200 transition hover:bg-red-500/20 xl:inline-flex">PRO roadmap</Link>
        </div>
        <button type="button" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-200 transition hover:border-red-500/50 hover:text-white lg:hidden" aria-label={isOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>{isOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {isOpen ? <div className="border-t border-zinc-800 bg-black/95 px-4 pb-5 pt-3 shadow-2xl lg:hidden"><nav className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">{mobileItems.map((item) => { const active = isActiveLink(pathname, item.href); return <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${active ? "border-red-500/40 bg-red-500/15 text-red-100" : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-600 hover:text-white"}`}>{item.title}</Link>; })}</nav></div> : null}
    </header>
  );
}
