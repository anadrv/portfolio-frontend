import { Search } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({ courses: [], competencies: [] });
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();

  async function handleSearch(value) {
    setSearch(value);

    if (value.trim().length < 2) {
      setResults({ courses: [], competencies: [] });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/search?search=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setResults({
        courses: response.data?.courses || [],
        competencies: response.data?.competencies || [],
      });
    } catch (error) {
      console.error("Erro na busca:", error);
      setResults({ courses: [], competencies: [] });
    }
  }

  const hasResults =
    results.courses.length > 0 || results.competencies.length > 0;

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          placeholder="Pesquisar curso ou competência"
          className="
            w-full bg-white rounded-lg
            py-3 pl-5 pr-11
            text-base text-gray-800 outline-none
            border border-gray-200
            focus:border-primary transition
          "
        />
      </div>

      {hasResults && isFocused && (
        <div className="absolute mt-2 w-full rounded-lg shadow-xl overflow-hidden z-50">
          {results.courses.length > 0 && (
            <div>
              <div className="px-5 py-3 bg-background">
                <p className="text-xs font-bold text-white uppercase tracking-widest">
                  Cursos
                </p>
              </div>

              {results.courses.map((course) => (
                <button
                  key={course.id_courses}
                  onMouseDown={() => navigate(`/course/${course.id_courses}`)}
                  className="w-full text-left px-5 py-4 flex items-center text-background bg-white hover:bg-primary hover:text-white transition cursor-pointer group"
                >
                  <div className="group-hover:text-white">
                    <span className="text-base font-medium transition">
                      {course.name_courses}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {results.competencies.length > 0 && (
            <div>
              <div className="px-5 py-3 bg-background">
                <p className="text-xs font-bold text-white uppercase tracking-widest">
                  Competências
                </p>
              </div>

              {results.competencies.map((competency) => (
                <button
                  key={competency.id_competency}
                  onMouseDown={() =>
                    navigate(`/course/${competency.id_courses}`)
                  }
                  className="w-full text-left px-5 py-4 flex items-center text-background bg-white hover:text-white hover:bg-primary transition group cursor-pointer"
                >
                  <div className="flex flex-col w-full group-hover:text-white">
                    <span className="text-base font-medium transition">
                      {competency.name_competency}
                    </span>
                    <span className="text-sm hover:text-white">
                      {competency.name_courses}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
