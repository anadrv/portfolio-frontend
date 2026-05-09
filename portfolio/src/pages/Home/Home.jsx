import { useState } from "react";
import Layout from "../../Layout/Layout";
import FilterSelect from "../../components/FilterSelect";
import CourseCard from "../../components/CourseCard";
import CreateCourse from "../../components/CreateCourse";

import adminIcon from "../../assets/icons/courses/admin.png";
import adsIcon from "../../assets/icons/courses/ads.png";
import arqIcon from "../../assets/icons/courses/arq.png";
import dsgIcon from "../../assets/icons/courses/design.png";
import lawIcon from "../../assets/icons/courses/law.png";
import peIcon from "../../assets/icons/courses/physical-education.png";

import courses from "../../data/courses.json";

function Home() {
  const [matriz, setMatriz] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const iconMap = {
    admin: adminIcon,
    ads: adsIcon,
    arq: arqIcon,
    design: dsgIcon,
    law: lawIcon,
    "physical-education": peIcon,
  };

  const filteredCourses = courses.filter((course) => {
    return matriz === "" || course.matriz.includes(matriz);
  });

  return (
    <Layout>
      <div className="px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <header className="py-6 text-text font-semibold flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-semibold">Cursos</h1>

              <div className="flex flex-wrap md:flex-nowrap text-sm gap-3 md:gap-10 items-center">
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-white py-2 px-4 text-background font-semibold text-sm rounded whitespace-nowrap"
                >
                  Adicionar novo curso
                </button>

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

            <div
              className="bg-background-white rounded-lg p-6 grid gap-6 w-full min-h-[500px] items-start content-start"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  icons={[iconMap[course.icon]]}
                />
              ))}
            </div>
          </div>

          <aside className="lg:w-64 py-6 lg:mt-13">
            <h2 className="text-text font-semibold text-lg">Notificações</h2>
          </aside>
        </div>
      </div>

      {showCreate && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowCreate(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreateCourse
              onCancel={() => setShowCreate(false)}
              onSave={(data) => {
                console.log("novo curso:", data);
                setShowCreate(false);
              }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;
