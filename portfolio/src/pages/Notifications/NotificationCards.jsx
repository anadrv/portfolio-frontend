import { useState } from "react";
import Layout from "../../Layout/Layout";
import { Bell, Trash2 } from "lucide-react";

function NotificationCards() {
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
      <div className="px-10 pt-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-white text-4xl font-bold">
            Notificações
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-white text-sm">
              Filtrar por:
            </span>

            {["Todas", "Não lidas", "Validadas"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`
                    text-xs
                    px-4
                    py-1
                    rounded-md
                    font-semibold
                    transition
                    ${
                      filter === item
                        ? "bg-white text-[#253FBE]"
                        : "bg-[#d9d9d9] text-[#253FBE]"
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
            bg-[#42A5F5]
            rounded-xl
            p-6
            flex
            flex-col
            gap-5
            max-h-[600px]
            overflow-y-auto
          "
        >
          {filteredNotifications.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#F3F3F3]
                rounded-xl
                px-6
                py-6
                flex
                items-center
                justify-between
              "
            >
              <div className="flex items-center gap-5">
                <input
                  type="checkbox"
                  className="
                    w-5
                    h-5
                    accent-[#253FBE]
                    cursor-pointer
                  "
                />

                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#D9D9D9]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Bell
                    size={18}
                    className="text-[#253FBE]"
                  />
                </div>

                <div className="flex flex-col">
                  <span
                    className="
                      text-[#42A5F5]
                      text-xs
                      font-semibold
                      mb-1
                    "
                  >
                    {item.type}
                  </span>

                  <h2
                    className="
                      text-[#42A5F5]
                      font-bold
                      text-2xl
                    "
                  >
                    {item.title}
                  </h2>

                  <p
                    className="
                      text-[#42A5F5]
                      text-base
                      font-medium
                      mt-3
                    "
                  >
                    {item.course}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="hover:scale-110 transition"
              >
                <Trash2
                  size={22}
                  className="text-[#0057A3]"
                />
              </button>
            </div>
          ))}

          <div
            className="
              w-full
              h-5
              bg-white
              rounded-full
              flex-shrink-0
            "
          />
        </div>
      </div>
    </Layout>
  );
}

export default NotificationCards;