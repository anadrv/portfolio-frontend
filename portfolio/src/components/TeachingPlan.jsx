import teachingPlanIcon from "../assets/icons/planner-icon.png";

function TeachingPlan() {
  return (
    <article className="flex-1 bg-background rounded-lg p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between bg-white p-4 py-6 rounded-lg">
        <div className="flex items-center gap-2">
          <img
            src={teachingPlanIcon}
            alt="Ícone do plano de ensino"
            className="w-8 h-8 object-contain"
          />

          <h1 className="text-lg font-semibold text-background">
            PLANO DE ENSINO
          </h1>
        </div>

        <button className="cursor-pointer bg-accent px-4 py-2 text-background font-semibold rounded-lg text-base transition-transform duration-300 hover:scale-105">
          Acessar
        </button>
      </header>

      <section className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent"></span>

          <h2 className="text-xs font-medium">
            Validado pela coordenação
          </h2>
        </div>

        <button className="text-xs bg-highlight py-1 px-2 rounded font-normal transition-transform duration-300 hover:scale-105 cursor-pointer">
          Ver ou editar informações
        </button>
      </section>
    </article>
  );
}

export default TeachingPlan;