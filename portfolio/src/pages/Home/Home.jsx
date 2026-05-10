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

import coursesData from "../../data/courses.json";

function Home() {
  const [matriz, setMatriz] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const [courses, setCourses] = useState(coursesData);

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
      <div className="px-5 mt-5">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <header className="py-6 text-text font-semibold flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-2xl font-semibold">Cursos</h1>

              <div className="flex flex-col md:flex-row text-sm gap-3 md:gap-10 md:items-center">
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-white py-2 px-4 w-full md:w-auto text-background font-semibold text-sm rounded whitespace-nowrap hover:bg-accent cursor-pointer transition"
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
              className="bg-background-white rounded-lg p-6 grid gap-3 w-full min-h-[500px] items-start content-start"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              }}
            >
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  icons={[
                    course.image ? course.image.preview : iconMap[course.icon],
                  ]}
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
                const newCourse = {
                  id: Date.now(),
                  title: data.curso,
                  matriz: [data.matriz],
                  image: data.image,
                };

                setCourses((prev) => [...prev, newCourse]);

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
