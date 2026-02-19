import Link from "next/link";

import { DEFAULT_BUFFER_PCT, DEFAULT_TAX_RATE } from "@/lib/calc";
import { formatPercent } from "@/lib/number";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Budget-to-Income Planner
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Enter your monthly budget and see the gross annual salary needed to
            afford it using an effective tax rate.
          </p>
        </header>

        <div>
          <Link
            href="/planner"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Start
          </Link>
        </div>

        <section className="rounded-md border border-zinc-200 p-4 dark:border-zinc-800">
          <h2 className="text-sm font-medium">Default assumptions</h2>
          <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Effective tax rate: {formatPercent(DEFAULT_TAX_RATE, 0)}</li>
            <li>Safety buffer: {formatPercent(DEFAULT_BUFFER_PCT, 0)}</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
