import { useState } from "react";
import Layout from "../../Layout/Layout";
import FilterSelect from "../../components/FilterSelect";

function Home() {
  const [matriz, setMatriz] = useState("");

  return (
    <Layout>
      <div className="px-6">
        <div className="flex gap-16">
          <div className="flex-1">
            <header className="py-6 text-text font-semibold flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Cursos</h1>

              <div className="flex text-sm gap-10 items-center mt-4">
                <h4 className="whitespace-nowrap font-normal text-md">
                  Filtrar por:
                </h4>

                <FilterSelect
                  label="Matriz"
                  options={["62", "63"]}
                  value={matriz}
                  onChange={setMatriz}
                />
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
