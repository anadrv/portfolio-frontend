import { useEffect, useState } from "react";
import FilterSelect from "./FilterSelect";
import PrimaryButton from "./PrimaryButton";

function CreateSubjectModal({ onClose }) {
  const [curso, setCurso] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [nomeCompetencia, setNomeCompetencia] = useState("");
  const [linkPlanner, setLinkPlanner] = useState("");
  const [linkPlano, setLinkPlano] = useState("");

  function handleSave() {
    console.log({
      curso,
      trimestre,
      nomeCompetencia,
      linkPlanner,
      linkPlano,
    });
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const inputClass = "w-full mt-1 p-2 rounded bg-white text-background text-sm";
  const labelClass = "block text-md font-semibold";
  const subLabelClass = "text-xs text-gray-200";
  const fieldWrapper = "mb-4";

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-background max-w-lg w-full rounded-lg p-12 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-xl font-semibold mb-6">
          CADASTRAR COMPETÊNCIA
        </h2>

        {/* selects */}
        <section className="flex gap-2 w-full mb-6 font-semibold">
          <div className="flex-2">
            <FilterSelect
              label="Selecionar curso"
              options={["Sistemas de Informação", "Arquitetura e Urbanismo"]}
              value={curso}
              onChange={setCurso}
            />
          </div>

          <div className="flex-1">
            <FilterSelect
              label="Trimestre"
              options={["1º", "2º", "3º", "4º"]}
              value={trimestre}
              onChange={setTrimestre}
            />
          </div>
        </section>

        {/* Nome da competência */}
        <div className={fieldWrapper}>
          <label htmlFor="competencia" className="block text-sm mb-2">
            Nome da competência:
          </label>

          <input
            id="competencia"
            name="competencia"
            type="text"
            value={nomeCompetencia}
            onChange={(e) => setNomeCompetencia(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Link - Planner */}
        <div className={fieldWrapper}>
          <label htmlFor="planner" className={labelClass}>
            Planner
          </label>

          <span className={subLabelClass}>Link de acesso:</span>

          <input
            id="planner"
            name="planner"
            type="url"
            value={linkPlanner}
            onChange={(e) => setLinkPlanner(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Link - Plano de ensino */}
        <div className={fieldWrapper}>
          <label htmlFor="plano" className={labelClass}>
            Plano de ensino
          </label>

          <span className={subLabelClass}>Link de acesso:</span>

          <input
            id="plano"
            name="plano"
            type="url"
            value={linkPlano}
            onChange={(e) => setLinkPlano(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* ações */}
        <div className="flex justify-between items-center mt-6">
          <button onClick={onClose} className="text-sm underline">
            Cancelar
          </button>

          <PrimaryButton textSize="text-sm" onClick={handleSave}>
            Confirmar
          </PrimaryButton>
        </div>
      </article>
    </div>
  );
}

export default CreateSubjectModal;
