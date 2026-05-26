import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { getCompetenciesByCourse } from "../../services/competencyService";
import { getCourses } from "../../services/courseService";

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
  const [courseName, setCourseName] = useState("");

  const itemsPerPage = 5;

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdminOrGestao = user?.role === "ADMIN" || user?.role === "GESTAO";

  async function loadCompetencies(courseId = id) {
    const data = await getCompetenciesByCourse(courseId);
    setSubjects([...data]);
  }

  useEffect(() => {
    if (!id) return;

    async function fetchCompetencies() {
      const data = await getCompetenciesByCourse(id);
      setSubjects([...data]);
    }

    fetchCompetencies();
  }, [id]);
  useEffect(() => {
    async function loadCourseName() {
      try {
        const courses = await getCourses();

        const currentCourse = courses.find(
          (course) => String(course.id_courses) === String(id),
        );

        if (currentCourse) {
          setCourseName(currentCourse.name_courses);
        }
      } catch (error) {
        console.error("Erro ao carregar nome do curso:", error);
      }
    }

    if (id) {
      loadCourseName();
    }
  }, [id]);

  const refresh = async () => {
    setCurrentPage(1);
    await loadCompetencies(id);
  };

 const groupedSubjects = useMemo(() => {
  const grouped = Object.values(
    subjects.reduce((acc, item) => {
      if (!acc[item.id_competency]) {
        acc[item.id_competency] = {
          id_competency: item.id_competency,
          name_competency: item.name_competency,
          code_competency: item.code_competency,
          documents: [],
        };
      }

      acc[item.id_competency].documents.push(item);

      return acc;
    }, {}),
  );

  return grouped.sort((a, b) =>
    a.code_competency.localeCompare(b.code_competency)
  );
}, [subjects]);

  const statusRules = {
    "Em andamento": (doc) => doc.flag_em_preenchimento,

    Preenchido: (doc) => doc.flag_preenchido,

    "Necessita revisão": (doc) => doc.flag_necessita_revisao,

    "Validado pela coordenação": (doc) => doc.flag_validacao_coordenacao,

    "Liberado para customizar": (doc) => doc.flag_liberado_customizar,

    "Disponível no Canvas": (doc) => doc.flag_disponivel_canva,

    "Integrado ao RM-Canvas": (doc) => doc.flag_integrado_rm,

    "Não preenchido": (doc) =>
      !doc.flag_em_preenchimento &&
      !doc.flag_preenchido &&
      !doc.flag_necessita_revisao &&
      !doc.flag_validacao_coordenacao &&
      !doc.flag_liberado_customizar &&
      !doc.flag_disponivel_canva &&
      !doc.flag_integrado_rm,
  };

  function matchStatus(doc, status) {
    if (!status) return true;

    const rule = statusRules[status];
    if (!rule) return true;

    return rule(doc);
  }

  const filteredSubjects = groupedSubjects.filter((subject) => {
    if (!subject.documents?.length) return true;

    return (
      (matriz === "" ||
        subject.documents.some((doc) => doc.matriz_competency === matriz)) &&
      (trimestre === "" ||
        subject.documents.some((doc) => doc.trimestre === trimestre)) &&
      (status === "" ||
        subject.documents.some((doc) => matchStatus(doc, status)))
    );
  });
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentSubjects = filteredSubjects.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  function clearFilters() {
    setMatriz("");
    setTrimestre("");
    setStatus("");
    setCurrentPage(1);
  }

  return (
    <Layout>
      <header className="flex flex-col text-text font-semibold">
        <h1 className="text-xl md:text-2xl font-semibold py-6">{courseName}</h1>
      </header>

      <main className="flex gap-30 text-text text-lg font-semibold">
        <section className="flex-1">
          <div className="flex justify-between mb-8">
            <h2>Competências</h2>

            {isAdminOrGestao && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white p-2 px-4 text-background font-semibold text-sm rounded hover:bg-accent cursor-pointer"
              >
                Adicionar nova competência
              </button>
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <FilterSelect
              label="Matriz"
              value={matriz}
              onChange={setMatriz}
              options={["Matriz - 62", "Matriz - 63"]}
            />

            <FilterSelect
              label="Trimestre"
              value={trimestre}
              onChange={setTrimestre}
              options={[
                "1ª Trimestre",
                "2ª Trimestre",
                "3ª Trimestre",
                "4ª Trimestre",
              ]}
            />

            <FilterSelect
              label="Status"
              options={[
                "Não preenchido",
                "Em andamento",
                "Preenchido",
                "Necessita revisão",
                "Validado pela coordenação",
                "Liberado para customizar",
                "Disponível no Canvas",
                "Integrado ao RM-Canvas",
              ]}
              value={status}
              onChange={setStatus}
            />
            <button
              onClick={clearFilters}
              className="font-normal min-w-30 text-sm hover:underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>

          <div className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4">
            {currentSubjects.map((subject) => (
              <Subject
                key={subject.id_competency}
                title={subject.name_competency}
                code={subject.code_competency}
                documents={subject.documents}
                onRefresh={refresh}
              />
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 text-white">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-primary"
            >
              <ChevronLeft size={18} />
            </button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-primary"
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
        <CreateSubjectModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={refresh}
        />
      )}
    </Layout>
  );
}

export default Subjects;
