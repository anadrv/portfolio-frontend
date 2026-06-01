import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";

function CourseCard({ title, icons = [], link, onEdit }) {
  return (
    <Link to={link} className="block w-full">
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl shadow-[0_4px_0_#d1d5db] p-5 h-[80px] w-full flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
        <div className="flex bg-gray-100 rounded-xl p-3 shadow-md w-14 h-14 items-center justify-center shrink-0">
          {icons.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={title}
              className="w-10 h-10 object-contain"
            />
          ))}
        </div>

        <div className="flex items-center justify-between flex-1 min-w-0">
          <h2 className="text-white text-sm font-semibold leading-tight">
            {title}
          </h2>

          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.();
            }}
            className="p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-white/15"
          >
            <Pencil
              size={17}
              className="text-white opacity-80 hover:opacity-100 shrink-0 transition-opacity"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
