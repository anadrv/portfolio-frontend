import { useState } from "react";
import InfoModal from "./InfoModal";

function DocumentCard({
  title,
  icon,
  whiteIcon,
  matriz,
  trimestre,
  status,
  accessLink,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusColors = {
    "Validado pela coordenação": "bg-accent",
    "Em andamento": "bg-blue-500",
    "Necessita revisão": "bg-orange-400",
    "Não avaliado": "bg-purple-500",
  };

  return (
    <>
      <article className="flex-1 bg-background rounded-lg p-4 flex flex-col gap-4">
        <header className="flex items-center justify-between bg-white p-4 py-6 rounded-lg">
          <div className="flex items-center gap-2">
            <img
              src={icon}
              alt={`Ícone do ${title}`}
              className="w-8 h-8 object-contain"
            />

            <h1 className="text-lg font-semibold text-background">{title}</h1>
          </div>

          <a
            href={accessLink}
            className="cursor-pointer bg-accent px-4 py-2 text-background font-semibold rounded-lg text-base transition-transform duration-300 hover:scale-105"
          >
            Acessar
          </a>
        </header>

        <section className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                statusColors[status] || "bg-gray-400"
              }`}
            ></span>

            <h2 className="text-xs font-medium">{status}</h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs bg-highlight py-1 px-2 rounded font-normal transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            Ver ou editar informações
          </button>
        </section>

        {isModalOpen && (
          <InfoModal
            onClose={() => setIsModalOpen(false)}
            title={title}
            icon={whiteIcon}
            matriz={matriz}
            trimestre={trimestre}
          />
        )}
      </article>
    </>
  );
}

export default DocumentCard;
