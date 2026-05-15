import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { getCompetenciesByCourse } from "../../services/competencyService";

import Subject from "../../components/Subject";
import Layout from "../../Layout/Layout";
import FilterSelect from "../../components/FilterSelect";
import CreateSubjectModal from "../../components/CreateSubjectModal";

function Subjects() {
  const { id } = useParams(); 

  const [matriz, setMatriz] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [subjects, setSubjects] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadCompetencies() {
      const data = await getCompetenciesByCourse(id); 

      console.log(data);

      setSubjects(data);
    }

    if (id) {
      loadCompetencies();
    }
  }, [id]);

  const filteredSubjects = subjects.filter((subject) => {
    return (
      (matriz === "" || subject.matriz === matriz) &&
      (trimestre === "" || subject.trimestre === trimestre) &&
      (status === "" || subject.status === status)
    );
  });

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentSubjects = filteredSubjects.slice(startIndex, endIndex);

  return (
    <Layout>
      <header className="flex flex-col text-text font-semibold">
        <h1 className="text-xl md:text-2xl font-semibold py-6">
          Sistemas de Informações
        </h1>
      </header>

      <main className="flex gap-30 text-text text-lg font-semibold">
        <section aria-labelledby="competencias-title" className="flex-1">
          <div className="flex justify-between mb-8">
            <h2 id="competencias-title">Competências</h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white p-2 px-4 text-background font-semibold text-sm rounded hover:bg-accent cursor-pointer"
            >
              Adicionar nova competência
            </button>
          </div>

          <div className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4">
            {currentSubjects.map((subject) => (
              <Subject
                key={subject.id_competency}
                title={subject.name_competency}
                matriz={subject.matriz}
                trimestre={subject.trimestre}
                status={subject.status}
              />
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 text-white">
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-primary disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm font-medium">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-primary disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
        <aside
          aria-labelledby="notificacoes-title"
          className="hidden lg:block lg:mr-40"
        >
          <h2 id="notificacoes-title">Notificações</h2>
        </aside>
      </main>

      {isModalOpen && (
        <CreateSubjectModal onClose={() => setIsModalOpen(false)} />
      )}
    </Layout>
  );
}

export default Subjects;