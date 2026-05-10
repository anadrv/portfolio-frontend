import { useState, useRef } from "react";
import FilterSelect from "./FilterSelect";
import pencilIcon from "../assets/images/pencil.png";

function CreateCourse({ onCancel, onSave }) {
  const [curso, setCurso] = useState("");
  const [matriz, setMatriz] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);

  const canvasSteps = [
    "Liberado para customizar",
    "Disponível no Canvas",
    "Integrado ao RM-Canvas",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
      });

      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!curso.trim()) {
      newErrors.curso = "Digite o nome do curso";
    }

    if (!matriz) {
      newErrors.matriz = "Selecione uma matriz";
    }

    if (!link.trim()) {
      newErrors.link = "Digite o link de acesso";
    }

    if (!image) {
      newErrors.image = "Selecione uma imagem";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    onSave?.({
      curso,
      matriz,
      link,
      image,
    });
  };

  return (
    <div className="bg-background rounded-2xl p-8 w-[400px] overflow-hidden flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img src={pencilIcon} alt="pencil" className="w-5 h-5" />

        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-white font-bold text-xl tracking-widest"
        >
          CADASTRO
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Curso</label>

        <input
          type="text"
          value={curso}
          onChange={(e) => {
            setCurso(e.target.value);

            setErrors((prev) => ({
              ...prev,
              curso: "",
            }));
          }}
          className="rounded px-3 py-2 bg-white text-sm text-gray-700 border-none outline-none w-full"
        />

        {errors.curso && (
          <span className="text-red-300 text-xs">{errors.curso}</span>
        )}
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-white text-sm">Ícone do curso</label>

          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer rounded px-3 py-2 bg-white flex items-center justify-between w-full h-10"
          >
            <span className="text-gray-400 text-xs truncate">
              {image ? image.name : "Escolher imagem"}
            </span>

            {image?.preview && (
              <img
                src={image.preview}
                alt="preview"
                className="w-5 h-5 rounded-sm object-cover"
              />
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {errors.image && (
            <span className="text-red-300 text-xs">{errors.image}</span>
          )}
        </div>

        <div className="flex-1">
          <FilterSelect
            label="Matriz"
            options={["62", "63"]}
            value={matriz}
            onChange={(value) => {
              setMatriz(value);

              setErrors((prev) => ({
                ...prev,
                matriz: "",
              }));
            }}
          />

          {errors.matriz && (
            <span className="text-red-300 text-xs block mt-1">
              {errors.matriz}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          className="text-white text-sm"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Canvas
        </label>

        <div className="bg-white rounded-md p-4 flex flex-col gap-2.5">
          {canvasSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-yellow-300 shrink-0" />

                <span
                  className="text-[#0040A8] text-sm font-normal"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {step}
                </span>
              </div>

              {index < canvasSteps.length - 1 && (
                <span className="text-[#0040A8] text-lg block leading-none py-0.5 font-bold pl-24">
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Link de acesso:</label>

        <input
          type="text"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);

            setErrors((prev) => ({
              ...prev,
              link: "",
            }));
          }}
          className="rounded px-3 py-2 bg-white text-sm text-gray-700 border-none outline-none w-full"
        />

        {errors.link && (
          <span className="text-red-300 text-xs">{errors.link}</span>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <button onClick={onCancel} className="text-white text-sm underline">
          Cancelar
        </button>

        <button
          onClick={handleSave}
          className="bg-yellow-300 text-blue-900 font-medium text-sm px-5 py-2 rounded transition-colors hover:bg-yellow-400"
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
