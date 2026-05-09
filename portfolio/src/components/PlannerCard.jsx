import plannerIcon from "../assets/icons/planner-icon.png";

function PlannerCard() {
  return (
    <article className="flex-1 bg-background rounded-lg p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between  bg-white p-4">
        <div className="flex items-center gap-2">
          <img
            src={plannerIcon}
            alt="Ícone do planner"
            className="w-8 h-8 object-contain"
          />

          <h1 className="text-lg font-semibold">Planner</h1>
        </div>

        <button className="cursor-pointer bg-accent px-4 py-2 text-background font-bold rounded-lg">
          Acessar
        </button>
      </header>

      <section className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-accent"></span>

          <h2 className="text-sm font-medium">Validado</h2>
        </div>

        <button className="text-sm bg-highlight p-1 rounded">Ver ou editar informações</button>
      </section>
    </article>
  );
}

export default PlannerCard;
