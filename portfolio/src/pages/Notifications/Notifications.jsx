import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Layout from "../../Layout/Layout";
import NotificationCardPage from "../../components/NotificationCardPage";

import {
  getNotifications,
  deleteNotification,
} from "../../services/notificationService";

function Notifications() {
  const [filter, setFilter] = useState("Todas");

  const [notifications, setNotifications] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data =
          await getNotifications();

        setNotifications(data);
      } catch (error) {
        console.error(
          "Erro ao buscar notificações:",
          error
        );
      }
    }

    loadNotifications();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter(
          (item) =>
            item.id_notification !== id
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        "Erro ao deletar notificação"
      );
    }
  }

  const filteredNotifications =
    filter === "Todas"
      ? notifications
      : filter === "Não lidas"
      ? notifications.filter(
          (item) => !item.is_read
        )
      : notifications.filter(
          (item) => item.is_read
        );

  const totalPages = Math.ceil(
    filteredNotifications.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <Layout>
      <div className="mt-12">
        <header className="mb-8">
          <h1 className="text-text text-2xl font-semibold">
            Notificações
          </h1>
        </header>

        <main
          className="flex gap-8 items-start max-w-6xl">
          <section className="flex-1 max-w-4xl">
            <div className="md:hidden flex flex-wrap items-center gap-2 mb-6">
              <span className="text-text md:text-sm font-medium">
                Filtrar por:
              </span>

              {[
                "Todas",
                "Não lidas",
                "Validadas",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setFilter(item);
                    setCurrentPage(1);
                  }}
                  className={`
                    px-3 md:px-4 py-1 rounded-md font-semibold transition
                    ${
                      filter === item
                        ? "bg-white text-background"
                        : "bg-gray-300 text-background"
                    }
                  `}
                >
                  {item}
                </button>
              ))}
            </div>

            <div
              className="
                bg-primary
                rounded-2xl
                p-4 md:p-5
                flex flex-col gap-3 overflow-y-auto w-full
              "
            >
              {currentNotifications.length >
              0 ? (
                currentNotifications.map(
                  (item) => (
                    <NotificationCardPage
                      key={
                        item.id_notification
                      }
                      item={item}
                      onDelete={
                        handleDelete
                      }
                    />
                  )
                )
              ) : (
                <p className="text-white text-sm">
                  Nenhuma notificação
                  encontrada.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-4 mt-6 text-white">
              <button
                onClick={() =>
                  setCurrentPage(
                    (p) => p - 1
                  )
                }
                disabled={
                  currentPage === 1
                }
                className="p-2 rounded-full bg-primary disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <span>
                Página {currentPage} de{" "}
                {totalPages || 1}
              </span>

              <button
                onClick={() =>
                  setCurrentPage(
                    (p) => p + 1
                  )
                }
                disabled={
                  currentPage ===
                    totalPages ||
                  totalPages === 0
                }
                className="p-2 rounded-full bg-primary disabled:opacity-50 cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </section>

          <aside
            aria-labelledby="filtro-title"
            className="hidden lg:flex flex-col gap-3 w-56 shrink-0 mt-2">
            <h2
              id="filtro-title"
              className="text-text text-md"
            >
              Filtrar por:
            </h2>

            {[
              "Todas",
              "Não lidas",
              "Validadas",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setFilter(item);
                  setCurrentPage(1);
                }}
                className={`
                  w-full text-left px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer
                  ${
                    filter === item
                      ? "bg-white text-background"
                      : "bg-gray-300 text-background hover:bg-gray-200"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </aside>
        </main>
      </div>
    </Layout>
  );
}

export default Notifications;