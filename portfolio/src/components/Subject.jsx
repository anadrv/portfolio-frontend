import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";

import DocumentCard from "./DocumentCard";
import CompetencyModal from "./CompetencyModal";

import plannerIcon from "../assets/icons/planner-icon.png";
import plannerWhiteIcon from "../assets/icons/planner-white-icon.png";

import teachingPlanIcon from "../assets/icons/planner-icon.png";
import teachingWhitePlanIcon from "../assets/icons/planner-white-icon.png";

function Subject({ title, code, documents, reload, onRefresh }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);

  function getDocumentIcon(type) {
    if (type === "PLANNER") {
      return {
        icon: plannerIcon,
        whiteIcon: plannerWhiteIcon,
      };
    }

    return {
      icon: teachingPlanIcon,
      whiteIcon: teachingWhitePlanIcon,
    };
  }

  function getPriority(type) {
    const t = type?.toUpperCase().trim();

    if (t === "PLANNER") return 0;
    if (t === "PLANO") return 1;
    return 2;
  }

  return (
    <article className="flex flex-col gap-4">
      <div
        onClick={() => setOpen(!open)}
        className="bg-primary text-white rounded-lg px-6 py-4 flex items-center justify-between gap-2 shadow-[0_4px_0_#d1d5db] cursor-pointer"
      >
        <h2 className="text-sm md:text-base font-semibold">
          {code} - {title}
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Botão editar */}
            <button
              aria-label={`Editar ${title}`}
              onClick={() => {
                setEditingDoc(documents?.[0]); 
                setOpenEdit(true);
              }}
              className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition"
            >
              <Pencil size={18} />
            </button>

            {/* Botão expandir */}
            <button
              aria-label={`Expandir ${title}`}
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full cursor-pointer hover:bg-white/20 transition"
            >
              <ChevronDown
                size={20}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-4 md:flex-row">
          {[...(documents || [])]
            .sort((a, b) => {
              return (
                getPriority(a.name_documentType) -
                getPriority(b.name_documentType)
              );
            })
            .map((doc) => {
              const { icon, whiteIcon } = getDocumentIcon(
                doc.name_documentType,
              );

              return (
                <DocumentCard
                  key={doc.id_academicD}
                  reload={onRefresh}
                  id_academicD={doc.id_academicD}
                  title={doc.name_documentType}
                  icon={icon}
                  whiteIcon={whiteIcon}
                  matriz={doc.matriz_competency}
                  trimestre={doc.trimestre}
                  accessLink={doc.drive_link}
                  flag_validacao_coordenacao={doc.flag_validacao_coordenacao}
                  flag_liberado_customizar={doc.flag_liberado_customizar}
                  flag_disponivel_canva={doc.flag_disponivel_canva}
                  flag_integrado_rm={doc.flag_integrado_rm}
                />
              );
            })}
        </div>
      )}

      {openEdit && (
        <CompetencyModal
          mode="edit"
          existingData={editingDoc}
          onClose={() => {
            setOpenEdit(false);
            setEditingDoc(null);
          }}
          onSuccess={onRefresh}
        />
      )}
    </article>
  );
}

export default Subject;
