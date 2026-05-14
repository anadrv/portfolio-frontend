import { Bell, Trash2 } from "lucide-react";

function NotificationCardPage({ item, onDelete }) {
  return (
    <div
      className="
        bg-background-white
        rounded-xl
        px-4 md:px-5
        py-4
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
        <input
          type="checkbox"
          className="
            w-4
            h-4
            accent-blue-700
            cursor-pointer
            flex-shrink-0
          "
        />

        <div
          className="
            w-9
            h-9
            md:w-10
            md:h-10
            rounded-full
            bg-gray-300
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <Bell
            size={16}
            className="text-background"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span
            className="
              text-primary
              text-[10px]
              md:text-[11px]
              font-semibold
              mb-1
            "
          >
            {item.type}
          </span>

          <h2
            className="
              text-primary
              font-bold
              text-sm
              md:text-lg
              leading-tight
            "
          >
            {item.title}
          </h2>

          <p
            className="
              text-primary
              text-xs
              md:text-sm
              font-medium
              mt-2
              break-words
            "
          >
            {item.course}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(item.id)}
        className="
          hover:scale-110
          transition
          flex-shrink-0
        "
      >
        <Trash2
          size={20}
          className="text-background"
        />
      </button>
    </div>
  );
}

export default NotificationCardPage;