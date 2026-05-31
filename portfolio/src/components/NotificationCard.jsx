import { X, Bell } from "lucide-react";

function NotificationCard({ item, onDelete }) {
  return (
    <div
      className="
        bg-white rounded-xl p-4 flex items-start justify-between gap-3 text-background shadow-md">
      <div className="flex gap-3 flex-1 min-w-0">
        <Bell
          size={16}
          className="
            mt-1 shrink-0 text-background"/>

        <div className="min-w-0">
          <h3 className="font-semibold text-sm">{item.message}</h3>

          {item.name_competency && (
            <p className="text-xs font-normal text-background mt-4">
              {item.code_competency} -{item.name_competency}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(item.id_notification)}
        className="
          hover:bg-white/10 p-1 rounded-md transition shrink-0 cursor-pointer">
        <X size={16} />
      </button>
    </div>
  );
}

export default NotificationCard;
