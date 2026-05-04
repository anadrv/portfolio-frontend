import Layout from "../../Layout/Layout";

function Home() {
  return (
    <Layout>
      <div className="px-6">
        <div className="flex gap-16">
          <div className="flex-1">
            <header className="py-6 text-text font-semibold flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Cursos</h1>
              <div className="flex items-center gap-2 text-sm font-normal">
                <span>Filtrar por:</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white text-gray-700 cursor-pointer">
                  <option>Matriz</option>
                </select>
              </div>
            </header>
            <div className="bg-background-white rounded-lg p-6 flex flex-col gap-4 w-full h-[500px]"></div>
          </div>
          <aside className="w-64 py-6 mt-13">
            <h2 className="text-text font-semibold text-lg">Notificações</h2>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
