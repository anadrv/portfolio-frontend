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
    user?.role === "ADMIN" || user?.role === "COORDINATOR" || user?.role === "NITE";

  async function loadCompetencies(courseId = id) {
    try {
      const data = await getCompetenciesByCourse(courseId);
      setCompetencies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar competências:", error);
    }
  }

  useEffect(() => {
    if (id) {
      loadCompetencies(id);
    }
  }, [id]);

  async function loadNotifications() {
    try {
      const data = await getNotificationsByCourse(id);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
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
          (course) => String(course.id_courses) === String(id)
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
    if (!competencies || !Array.isArray(competencies)) return [];

    const grouped = competencies.reduce((acc, item) => {
      const compId = item.id_competency;
      if (!compId) return acc;

      if (!acc[compId]) {
        acc[compId] = {
          id_competency: compId,
          name_competency: item.name_competency || "Sem nome",
          code_competency: item.code_competency || "S/C",
          matriz_competency: String(item.matriz_competency || ""),
          documents: [],
        };
      }

      if (item.id_academicD) {
        acc[compId].documents.push({
          ...item,
          matriz_competency: String(item.doc_matriz || item.matriz || item.matriz_competency || ""),
        });
      }

      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => {
      return String(a.code_competency).localeCompare(String(b.code_competency));
    });
  }, [competencies]);

  const statusRules = {
    "Em andamento": (doc) => doc.flag_em_preenchimento,
    "Preenchido": (doc) => doc.flag_preenchido,
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
    return rule ? rule(doc) : true;
  }

  const filteredCompetencies = groupedCompetencies.filter((competency) => {
    const matchesMatriz =
      matriz === "" ||
      competency.matriz_competency === matriz ||
      competency.documents.some((doc) => doc.matriz_competency === matriz);

    if (competency.documents.length === 0) {
      return matchesMatriz && trimestre === "" && status === "";
    }

    return (
      matchesMatriz &&
      (trimestre === "" ||
        competency.documents.some((doc) => doc.trimestre === trimestre)) &&
      (status === "" ||
        competency.documents.some((doc) => matchStatus(doc, status)))
    );
  });

  const totalPages = Math.ceil(filteredCompetencies.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCompetencies = filteredCompetencies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  function clearFilters() {
    setMatriz("");
    setTrimestre("");
    setStatus("");
    setCurrentPage(1);
  }

  async function handleDeleteNotification(notifId) {
    try {
      await deleteNotification(notifId);
      setNotifications((prev) =>
        prev.filter((n) => n.id_notification !== notifId)
      );
    } catch (error) {
      alert("Erro ao deletar notificação");
    }
  }

  function openDeleteModal(compId) {
    setCompetencyToDelete(compId);
    setShowDeleteModal(true);
  }

  async function handleDeleteCompetency() {
    try {
      await deleteCompetency(competencyToDelete);
      setCompetencies((prev) =>
        prev.filter((c) => c.id_competency !== competencyToDelete)
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
        (n) =>
          n.title === "Documento necessita revisão" ||
          n.title === "Documento validado pela coordenação"
      )
    : notifications;

  const displayedNotifications = (
    selectedCompetencyId
      ? filteredNotifications.filter((n) => n.id_competency === selectedCompetencyId)
      : filteredNotifications
  )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5);

  return (
    <Layout>
      <header className="flex flex-col text-text font-semibold">
        <h1 className="text-xl md:text-2xl font-semibold py-6">{courseName || "Carregando..."}</h1>
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
              options={["62", "63"]}
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
                "1ª Semestre",
                "2ª Semestre",
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
            {currentCompetencies.length === 0 ? (
              <p className="text-sm text-background">
                Nenhuma competência encontrada para os filtros selecionados.
              </p>
            ) : (
              currentCompetencies.map((comp) => (
                <Subject
                  key={comp.id_competency}
                  title={comp.name_competency}
                  code={comp.code_competency}
                  documents={comp.documents}
                  onRefresh={refresh}
                  onDelete={() => openDeleteModal(comp.id_competency)}
                  onExpand={(id) => setSelectedCompetencyId(id)}
                  isOpen={openCompetencyId === comp.id_competency}
                  onToggle={() =>
                    setOpenCompetencyId(
                      openCompetencyId === comp.id_competency ? null : comp.id_competency
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
              className="p-2 rounded-full bg-primary disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-primary disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>

        <aside className="hidden lg:block w-80">
          <h2 className="mb-4">Notificações</h2>
          <div className="flex flex-col gap-3">
            {displayedNotifications.length === 0 ? (
              <p className="text-sm font-normal text-white">
                Sem notificações no momento.
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
          <div className="mt-4">
            <Link to="/notifications" className="text-sm font-normal text-white hover:underline">
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
