import Subject from "../../components/Subject";
import Layout from "../../Layout/Layout";
import subjectsData from "../../data/subjects.json";

function Subjects() {
  return (
    <Layout>
      <header className="p-6 flex flex-col gap-6 text-text font-semibold">
        <h1 className="text-2xl font-semibold">
          Sistemas de Informações
        </h1>
      </header>

      <main className="px-6 flex gap-30 text-text text-lg font-semibold">
        
        <section aria-labelledby="competencias-title" className="flex-1">
          <h2 id="competencias-title">Competências</h2>

          <div className="bg-background-white rounded-lg mt-6 p-4 flex flex-col gap-4">
            {subjectsData.map((subject) => (
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