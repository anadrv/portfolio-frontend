import { useState } from "react";
import Layout from "../../Layout/Layout";
import NotificationCardPage from "../../components/NotificationCardPage";

function Notifications() {
  const [filter, setFilter] = useState("Todas");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Validado pelo coordenador",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Validadas",
    },
    {
      id: 2,
      title: "Nova atividade disponível",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Não lidas",
    },
    {
      id: 3,
      title: "Validado pelo coordenador",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Validadas",
    },
    {
      id: 4,
      title: "Nova atividade disponível",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Não lidas",
    },
    {
      id: 5,
      title: "Validado pelo coordenador",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Validadas",
    },
    {
      id: 6,
      title: "Nova atividade disponível",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Não lidas",
    },
    {
      id: 7,
      title: "Validado pelo coordenador",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Validadas",
    },
    {
      id: 8,
      title: "Nova atividade disponível",
      course:
        "CO2 - Programar em linguagem orientada a objetos básica",
      type: "PLANNER",
      status: "Não lidas",
    },
  ]);

  const handleDelete = (id) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const filteredNotifications =
    filter === "Todas"
      ? notifications
      : notifications.filter(
          (item) => item.status === filter
        );

  return (
    <Layout>
      <div className="px-4 md:px-8 pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h1 className="text-text text-2xl md:text-3xl font-bold">
            Notificações
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-text text-sm">
              Filtrar por:
            </span>

            {["Todas", "Não lidas", "Validadas"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`
                    px-3 md:px-4
                    py-1
                    rounded-md
                    text-xs
                    font-semibold
                    transition
                    ${
                      filter === item
                        ? "bg-white text-background"
                        : "bg-gray-300 text-background"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        <div
          className="
            bg-primary
            rounded-2xl
            p-3 md:p-4
            flex
            flex-col
            gap-3
            h-[420px]
            md:h-[500px]
            overflow-y-auto
            w-full
            md:w-[85%]
            mx-auto
          "
        >
          {filteredNotifications.map((item) => (
            <NotificationCardPage
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Notifications;