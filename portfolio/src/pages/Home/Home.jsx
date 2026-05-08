import { useState } from "react";
import Layout from "../../Layout/Layout";
import FilterSelect from "../../components/FilterSelect";
import CourseCard from "../../components/CourseCard";

import adminIcon from "../../assets/icons/courses/admin.png";
import adsIcon from "../../assets/icons/courses/ads.png";
import arqIcon from "../../assets/icons/courses/arq.png";
import dsgIcon from "../../assets/icons/courses/design.png";
import lawIcon from "../../assets/icons/courses/law.png";

import courses from "../../data/courses.json";

function Home() {
  const [matriz, setMatriz] = useState("");

  const iconMap = {
    admin: adminIcon,
    ads: adsIcon,
    arq: arqIcon,
    design: dsgIcon,
    law: lawIcon,
  };

  const filteredCourses = courses.filter((course) => {
    return matriz === "" || course.matriz === matriz;
  });

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

            <div className="bg-background-white rounded-lg p-6 grid gap-4 w-full min-h-[500px] content-start [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  icons={[iconMap[course.icon]]}
                />
              ))}
            </div>
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
