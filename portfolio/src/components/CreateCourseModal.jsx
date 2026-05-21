import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FilterSelect from "./FilterSelect";
import pencilIcon from "../assets/images/pencil.png";

import validateCourse from "../validations/validateCourse";

import { createCourse } from "../services/courseService";

function CreateCourse({ onCancel, onSave }) {
  const [curso, setCurso] = useState("");
  const [matriz, setMatriz] = useState("");
  const [image, setImage] = useState(null);

  const [errors, setErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  function clearFieldError(field) {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setErrorMessage("");
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
      });

      clearFieldError("image");
    }
  };

  const handleSave = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    const validationErrors = validateCourse({
      curso,
      matriz,
      image,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      const newCourse = await createCourse({
        curso,
        matriz,
        image,
      });

      console.log("Curso criado:", newCourse);

      setSuccessMessage("Curso criado com sucesso!");

      setTimeout(() => {
        onSave?.(newCourse);
        onCancel?.();
      }, 1000);
    } catch (error) {
      console.error("Erro ao criar curso:", error);

      setErrorMessage(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        bg-background
        rounded-2xl
        p-5 sm:p-8
        w-[100%]
        max-w-[370px]
        sm:w-[400px]
        overflow-hidden
        flex
        flex-col
        gap-4
      "
    >
      <div className="flex items-center gap-4">
        <img src={pencilIcon} alt="pencil" className="w-5 h-5" />

        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-white font-bold text-xl"
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
            clearFieldError("curso");
          }}
          className="
            rounded
            px-3
            py-2
            bg-white
            text-sm
            text-gray-700
            border-none
            outline-none
            w-full
          "
        />

        <span className="text-red-300 text-xs min-h-[16px]">
          {errors.curso}
        </span>
      </div>

      <div className="flex gap-3 items-start">
        <div className="flex-1 flex flex-col gap-1">
          <label className="text-white text-sm">Ícone do curso</label>

          <div
            onClick={() => fileInputRef.current.click()}
            className="
              cursor-pointer
              rounded
              px-3
              py-2
              bg-white
              flex
              items-center
              justify-between
              w-full
              h-10
            "
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

          <span className="text-red-300 text-xs min-h-[16px]">
            {errors.image}
          </span>
        </div>

        <div className="flex-1 mt-6">
          <FilterSelect
            label="Matriz"
            options={["62", "63"]}
            value={matriz}
            className="h-10"
            onChange={(value) => {
              setMatriz(value);
              clearFieldError("matriz");
            }}
          />

          <span className="text-red-300 text-xs block mt-1 min-h-[16px]">
            {errors.matriz}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <button
          onClick={onCancel}
          className="
            text-white
            text-sm
            hover:underline
            cursor-pointer
          "
        >
          Cancelar
        </button>

        <button
          onClick={handleSave}
          className="
            bg-accent
            text-blue-900
            font-medium
            text-sm
            px-5
            py-2
            rounded
            transition-colors
            hover:opacity-90
            cursor-pointer
          "
        >
          Salvar alterações
        </button>
      </div>

      {successMessage && (
        <p className="text-green-400 text-sm mt-2 text-center">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="text-red-400 text-sm mt-2 text-center">{errorMessage}</p>
      )}
    </motion.div>
  );
}

export default CreateCourse;
