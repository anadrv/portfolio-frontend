function PrimaryButton({
  children,
  onClick,
  textSize = "text-base",
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-accent
        text-background
        font-semibold
        p-3
        px-8
        rounded-lg
        hover:scale-105
        transition-transform
        cursor-pointer
        ${textSize}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
