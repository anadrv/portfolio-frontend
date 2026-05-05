function CourseCard({ title, icons = [] }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl shadow-lg p-5 h-[80px] flex items-center gap-4">
      {" "}
      <div className="flex bg-gray-100 rounded-xl p-3 shadow-md w-14 h-14 items-center justify-center shrink-0">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={title}
            className="w-10 h-10 object-contain p-0"
          />
        ))}
      </div>
      <h2 className="text-white text-sm font-semibold">{title}</h2>
    </div>
  );
}

export default CourseCard;
