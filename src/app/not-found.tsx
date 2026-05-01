import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-red-400">404</p>
      <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Страница не найдена</h1>
      <p className="mt-5 max-w-2xl text-zinc-400">
        Раздел мог быть переименован или ещё не добавлен в базу. Вернись на главную страницу и выбери актуальный раздел SCUM DB PRO.
      </p>
      <Link href="/" className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-black text-red-200 transition hover:bg-red-500/20">
        На главную
      </Link>
    </main>
  );
}
