import { useState } from "react";
import Layout from "../../Layout/Layout";
import NotificationCardPage from "../../components/NotificationCardPage";

import notificationsData from "../../data/notifications.json";

function Notifications() {
  const [filter, setFilter] = useState("Todas");

  const [notifications, setNotifications] =
    useState(notificationsData);

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
      <div className="mt-12">
        
        <header className="mb-8">
          <h1 className="text-text text-2xl font-semibold">
            Notificações
          </h1>
        </header>

        <main
          className="
            flex
            gap-8
            items-start
            max-w-6xl
          "
        >
     
          <section className="flex-1 max-w-4xl">

           
            <div className="md:hidden flex flex-wrap items-center gap-2 mb-6">
              <span className="text-text md:text-sm font-medium">
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

            <div
              className="
                bg-primary
                rounded-2xl
                p-4 md:p-5
                flex
                flex-col
                gap-3
                overflow-y-auto
                w-full
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
          </section>

      
          <aside
            aria-labelledby="filtro-title"
            className="
              hidden lg:flex flex-col gap-3 w-56 shrink-0 mt-2"
          >
            <h2
              id="filtro-title"
              className="text-text text-md"
            >
              Filtrar por:
            </h2>

            {["Todas", "Não lidas", "Validadas"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`
                    w-full
                    text-left
                    px-4 py-2
                    rounded-md text-sm font-semibold
                    transition cursor-pointer
                    ${
                      filter === item
                        ? "bg-white text-background"
                        : "bg-gray-300 text-background hover:bg-gray-200"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}
          </aside>
        </main>
      </div>
    </Layout>
  );
}

export default Notifications;