function ConfirmDeleteModal({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="bg-background w-md rounded-lg p-12 text-white shadow-2xl"
      >
        <header className="mb-8">
          <h2 className="text-xl font-bold">
            {title}
          </h2>
        </header>

        <section className="mb-8">
          <p className="text-sm text-white/90">
            {message}
          </p>
        </section>

        <footer className="flex items-center justify-between gap-4">
          <button
            onClick={onCancel}
            className="text-sm hover:underline cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="
              bg-accent font-semibold px-4 py-2 rounded-lg text-sm ont-semibold cursor-pointer text-background hover:scale-105 transition-transform">
            Excluir
          </button>
        </footer>
      </article>
    </div>
  );
}

export default ConfirmDeleteModal;