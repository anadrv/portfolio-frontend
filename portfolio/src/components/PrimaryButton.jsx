function PrimaryButton({ children, onClick, textSize = "text-base" }) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-accent text-background font-semibold p-3 px-8 not-only:rounded-lg hover:scale-105 transition-transform cursor-pointer
        ${textSize}
      `}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
