import { Plus, ChevronDown } from "lucide-react";

function Subject({ title }) {
  return (
    <article className="bg-primary text-white rounded-lg px-6 py-4 flex items-center justify-between shadow-md gap-2">
      
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        <button
          aria-label={`Adicionar planner ou plano de ensino em ${title}`}
          className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition"
        >
          <Plus size={20} />
        </button>

        <button
          aria-label={`Expandir ${title}`}
          className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </article>
  );
}

export default Subject;