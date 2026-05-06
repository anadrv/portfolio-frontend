import { useState } from "react";
import Subject from "../../components/Subject";
import Layout from "../../Layout/Layout";
import subjectsData from "../../data/subjects.json";
import FilterSelect from "../../components/FilterSelect";
import PlannerCard from "../../components/PlannerCard";

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
      <header className="p-6 flex flex-col gap-6 text-text font-semibold">
        <h1 className="text-2xl font-semibold">Sistemas de Informações</h1>
      </header>

      <main className="px-6 flex gap-30 text-text text-lg font-semibold">
        <section aria-labelledby="competencias-title" className="flex-1">
          <h2 id="competencias-title">Competências</h2>

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

            <FilterSelect
              label="Trimestre"
              options={["1º", "2º", "3º", "4º"]}
              value={trimestre}
              onChange={setTrimestre}
            />

            <FilterSelect
              label="Status"
              options={["Em andamento", "Validado", "Não avaliado"]}
              value={status}
              onChange={setStatus}
            />
          </div>

          <div className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4">
            {filteredSubjects.map((subject) => (
              <Subject key={subject.id} title={subject.title} />
            ))}
          </div>
        </section>

        <aside aria-labelledby="notificacoes-title" className="mr-40">
          <h2 id="notificacoes-title">Notificações</h2>
        </aside>
      </main>
    </Layout>
  );
}

export default Subjects;
