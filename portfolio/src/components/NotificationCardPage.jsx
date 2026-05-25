import { Bell, Check, Trash2 } from "lucide-react";

function NotificationCardPage({
  item,
  onDelete,
  onRead,
}) {
  return (
    <div className="bg-background-white rounded-xl p-6 flex items-center justify-between gap-2 md:gap-4">
      <div className="flex gap-2 md:gap-4 flex-1 min-w-0">
        
        <Bell
          size={16}
          className={`
            mt-1.5 shrink-0
            ${
              item.is_read
                ? "text-gray-400"
                : "text-background"
            }
          `}
        />

        <div className="flex flex-col gap-2 min-w-0 text-background">
          
          <h2 className="font-bold text-md md:text-lg flex items-center gap-4">
            {item.title}
          </h2>

          <div
            className="
              text-xs md:text-sm
              font-medium mt-0.5 md:mt-2 flex flex-col gap-1">
            <p>{item.message}</p>

            <p className="mt-2 font-normal text-gray-400">
              Competência:
              {" "}
              {item.name_competency}
            </p>

            <p className="font-normal text-gray-400">
              Curso:{" "}{item.name_courses}
            </p>

          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">

        {!item.is_read && (
          <button
            onClick={() =>
              onRead(item.id_notification)
            }
            className="
              hover:scale-110 not-first:transition cursor-pointer"
            title="Marcar como lida"
          >
            <Check
              size={17}
              className="text-green-600"
            />
          </button>
        )}

        <button
          onClick={() =>
            onDelete(item.id_notification)
          }
          className="
            hover:scale-110 transition shrink-0">
          <Trash2
            size={16}
            className=" text-background cursor-pointer"
            title="Excluir"
          />
        </button>
      </div>
    </div>
  );
}

export default NotificationCardPage;