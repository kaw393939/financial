import PlannerClient from "./planner-client";

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight">Planner</h1>
        <PlannerClient />
      </div>
    </main>
  );
}

