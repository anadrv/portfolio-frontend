import { useState } from "react";
import Subject from "../../components/Subject";
import Layout from "../../Layout/Layout";
import subjectsData from "../../data/subjects.json";
import FilterSelect from "../../components/FilterSelect";

function Subjects() {
  const [matriz, setMatriz] = useState("");
  const [trimestre, setTrimestre] = useState("");
  const [status, setStatus] = useState("");

  const filteredSubjects = subjectsData.filter((subject) => {
    return (
      (matriz === "" || subject.matriz === matriz) &&
      (trimestre === "" || subject.trimestre === trimestre) &&
      (status === "" || subject.status === status)
    );
  });

  return (
    <Layout>
      <header className="md:p-6 flex flex-col text-text font-semibold">
        <h1 className="text-xl md:text-2xl font-semibold py-6">
          Sistemas de Informações
        </h1>
      </header>

      <main className="md:px-6 flex gap-30 text-text text-lg font-semibold">
        <section aria-labelledby="competencias-title" className="flex-1">
          <div className="flex justify-between mb-8">
            <h2 id="competencias-title">Competências</h2>
            <button className="bg-white p-2 px-4 text-background font-semibold text-sm rounded hover:bg-accent cursor-pointer">
              Adicionar nova competência
            </button>
          </div>

          <div className="flex flex-col md:flex-row text-sm gap-4 md:gap-10 md:items-center mt-4">
            <h4 className="whitespace-nowrap font-normal text-md">
              Filtrar por:
            </h4>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <FilterSelect
                label="Matriz"
                options={["62", "63"]}
                value={matriz}
                onChange={setMatriz}
              />

              <FilterSelect
                label="Trimestre"
                options={["1º", "2º", "3º", "4º"]}
                value={trimestre}
                onChange={setTrimestre}
              />

              <FilterSelect
                label="Status"
                options={[
                  "Em andamento",
                  "Validado pela coordenação",
                  "Não avaliado",
                  "Liberado para customizar",
                  "Disponível no Canvas",
                  "Integrado ao RM-Canvas",
                ]}
                value={status}
                onChange={setStatus}
              />
            </div>
          </div>

          <div className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4">
            {filteredSubjects.map((subject) => (
              <Subject key={subject.id} title={subject.title} />
            ))}
          </div>
        </section>

        <aside
          aria-labelledby="notificacoes-title"
          className="hidden md:mr-40 md:block"
        >
          <h2 id="notificacoes-title">Notificações</h2>
        </aside>
      </main>
    </Layout>
  );
}

export default Subjects;
