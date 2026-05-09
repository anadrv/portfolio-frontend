import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";

import PlannerCard from "./PlannerCard";


function Subject({ title }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="flex flex-col gap-4">

   
      <div className="bg-primary text-white rounded-lg px-6 py-4 flex items-center justify-between gap-2 shadow-[0_4px_0_#d1d5db]">
        
        <h2 className="text-base font-semibold">
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
            onClick={() => setOpen(!open)}
            className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

        </div>
      </div>

    
      {open && (
        <div className="flex gap-4">
          <PlannerCard />
          <PlannerCard />
         
        </div>
      )}

    </article>
  );
}

export default Subject;