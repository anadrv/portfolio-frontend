import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

import {
  getCompetenciesByCourse,
  deleteCompetency,
} from "../../services/competencyService";
import { getCourses } from "../../services/courseService";
import {
  getNotificationsByCourse,
  deleteNotification,
} from "../../services/notificationService";

import Subject from "../../components/Subject";
import Layout from "../../Layout/Layout";
import FilterSelect from "../../components/FilterSelect";
import CreateCompetencyModal from "../../components/CreateCompetencyModal";
import NotificationCard from "../../components/NotificationCard";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

function Competency() {
  const { id } = useParams();

  const [matriz, setMatriz] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [status, setStatus] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [competencies, setCompetencies] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [competencyToDelete, setCompetencyToDelete] = useState(null);
  const [selectedCompetencyId, setSelectedCompetencyId] = useState(null);
  const [openCompetencyId, setOpenCompetencyId] = useState(null);

  const itemsPerPage = 6;

  const user = JSON.parse(localStorage.getItem("user"));

  const isAdminOrGestao =
    user?.role === "ADMIN" || user?.role === "GESTAO" || user?.role == "NITE";

  async function loadCompetencies(courseId = id) {
    const data = await getCompetenciesByCourse(courseId);
    setCompetencies([...data]);
  }

  useEffect(() => {
    if (!id) return;

    async function fetchCompetencies() {
      const data = await getCompetenciesByCourse(id);
      setCompetencies([...data]);
    }

    fetchCompetencies();
  }, [id]);

  async function loadNotifications() {
    try {
      const data = await getNotificationsByCourse(id);

      setNotifications(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      loadNotifications();
    }
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
    await loadNotifications();
  };

  const groupedCompetencies = useMemo(() => {
    const grouped = Object.values(
      competencies.reduce((acc, item) => {
        if (!acc[item.id_competency]) {
          acc[item.id_competency] = {
            id_competency: item.id_competency,
            name_competency: item.name_competency,
            code_competency: item.code_competency,
            matriz_competency: item.matriz_competency,
            documents: [],
          };
        }

        acc[item.id_competency].documents.push(item);

        return acc;
      }, {}),
    );

    return grouped.sort((a, b) =>
      a.code_competency.localeCompare(b.code_competency),
    );
  }, [competencies]);

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

  const filteredCompetencies = groupedCompetencies.filter((competency) => {
    if (!competency.documents?.length) return true;

    return (
      (matriz === "" ||
        String(competency.matriz_competency) === String(matriz)) &&
      (trimestre === "" ||
        competency.documents.some((doc) => doc.trimestre === trimestre)) &&
      (status === "" ||
        competency.documents.some((doc) => matchStatus(doc, status)))
    );
  });

  const totalPages = Math.ceil(filteredCompetencies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCompetencies = filteredCompetencies.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  function clearFilters() {
    setMatriz("");
    setTrimestre("");
    setStatus("");
    setCurrentPage(1);
  }

  async function handleDeleteNotification(id) {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id_notification !== id),
      );
    } catch (error) {
      console.log(error);

      alert("Erro ao deletar notificação");
    }
  }

  function openDeleteModal(id) {
    setCompetencyToDelete(id);
    setShowDeleteModal(true);
  }

  async function handleDeleteCompetency() {
    try {
      await deleteCompetency(competencyToDelete);

      setCompetencies((prev) =>
        prev.filter(
          (competency) => competency.id_competency !== competencyToDelete,
        ),
      );

      setShowDeleteModal(false);
      setCompetencyToDelete(null);
    } catch (error) {
      console.error(error);
    }
  }

  const isProfessor = user?.role === "TEACHER";

  const filteredNotifications = isProfessor
    ? notifications.filter(
        (notification) =>
          notification.title === "Documento necessita revisão" ||
          notification.title === "Documento validado pela coordenação",
      )
    : notifications;

  const displayedNotifications = (
    selectedCompetencyId
      ? filteredNotifications.filter(
          (notification) => notification.id_competency === selectedCompetencyId,
        )
      : filteredNotifications
  )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <Layout>
      <header className="flex flex-col text-text font-semibold">
        <h1 className="text-xl md:text-2xl font-semibold py-6">{courseName}</h1>
      </header>

      <main
        className="flex gap-30 text-text text-lg font-semibold"
        aria-label="Lista de competências do curso"
      >
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
              options={[
                {
                  label: "Matriz 62",
                  value: "62",
                },
                {
                  label: "Matriz 63",
                  value: "63",
                },
              ]}
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
                "1º Semestre",
                "2º Semestre",
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
              aria-label="Limpar todos os filtros"
              className="font-normal min-w-30 text-sm hover:underline cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>

          <div
            className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4"
            aria-live="polite"
          >
            {currentCompetencies.length === 0 ? (
              <p className="text-sm text-background">
                Nenhuma competência encontrada.
              </p>
            ) : (
              currentCompetencies.map((competency) => (
                <Subject
                  key={competency.id_competency}
                  title={competency.name_competency}
                  code={competency.code_competency}
                  documents={competency.documents}
                  onRefresh={refresh}
                  onDelete={() => openDeleteModal(competency.id_competency)}
                  onExpand={(id) => setSelectedCompetencyId(id)}
                  isOpen={openCompetencyId === competency.id_competency}
                  onToggle={() =>
                    setOpenCompetencyId(
                      openCompetencyId === competency.id_competency
                        ? null
                        : competency.id_competency,
                    )
                  }
                />
              ))
            )}
          </div>

          <div className="flex items-center justify-end gap-4 mt-6 text-white">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
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
              aria-label="Próxima página"
              className="p-2 rounded-full bg-primary"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <aside
          aria-labelledby="notificacoes-title"
          aria-live="polite"
          className="hidden lg:block w-80"
        >
          <h2 id="notificacoes-title" className="mb-4">
            Notificações
          </h2>

          <div className="flex flex-col gap-3">
            {displayedNotifications.length === 0 ? (
              <p className="text-sm font-normal text-white">
                Sem notificações no momento para essa competênciancia ou curso!
              </p>
            ) : (
              displayedNotifications.map((item) => (
                <NotificationCard
                  key={item.id_notification}
                  item={item}
                  onDelete={handleDeleteNotification}
                />
              ))
            )}
          </div>

          <div className="mt-4 ">
            <Link
              to="/notifications"
              className="text-sm font-normal text-white hover:underline"
            >
              Ver todas as notificações
            </Link>
          </div>
        </aside>
      </main>

      {isModalOpen && (
        <CreateCompetencyModal
          courseId={id}
          onClose={() => setIsModalOpen(false)}
          onSuccess={refresh}
        />
      )}
      {showDeleteModal && (
        <ConfirmDeleteModal
          title="Excluir competência"
          message="Tem certeza que deseja excluir esta competência? Esta ação não poderá ser desfeita."
          onConfirm={handleDeleteCompetency}
          onCancel={() => {
            setShowDeleteModal(false);
            setCompetencyToDelete(null);
          }}
        />
      )}
    </Layout>
  );
}

export default Competency;
