import Select from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

const Create = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),

    onSuccess: () => {
      toast.success("Yeni tarif oluşturuldu.");
      navigate("/");
    },

    onError: () => {
      toast.error("Bir sorun oluştu");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let newRecipe = Object.fromEntries(formData.entries());
    newRecipe.instructions = newRecipe.instructions.split(",");

    newRecipe.ingredients = ingredients;
    mutate(newRecipe);
  };

  return (
    <div>
      <h1 className="text-red-400 text-3xl font-bold">Yeni Tarif Oluştur</h1>

      <form
        onSubmit={handleSubmit}
        className="my-10 flex flex-col gap-10 max-w-2xl mx-auto"
      >
        <Field label="Başlık">
          <input
            required
            className="rounded-md p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400"
            type="text"
            name="recipeName"
          />
        </Field>

        <Field label="Kategori">
          <input
            required
            className="rounded-md p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400"
            type="text"
            name="category"
          />
        </Field>

        <Field label="Süre">
          <input
            required
            className="rounded-md p-2 shadow focus:outline-none focus:ring-2 focus:ring-red-400"
            type="text"
            name="recipeTime"
          />
        </Field>

        <Field label="Malzemeler">
          <Select
            isMulti
            onChange={(options) =>
              setIngredients(options.map((opt) => opt.value))
            }
            required
          />
        </Field>

        <Field label="Tarif Adımları (, ile ayırın)">
          <textarea
            className="rounded-md p-2 shadow focus:outline-red-400 min-h-[80px] max-h-[400px]"
            name="instructions"
            required
          ></textarea>
        </Field>

        <Field label="Sunum Önerisi">
          <textarea
            className="rounded-md p-2 shadow focus:outline-red-400 min-h-[80px] max-h-[400px] "
            name="servingSuggestion"
          ></textarea>
        </Field>

        <div className="flex flex-end gap-6">
          <Link
            to="/"
            className="bg-gray-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500"
          >
            Geri
          </Link>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-red-400 py-2 px-4 rounded-md text-white font-semibold text-lg hover:bg-gray-500"
          >
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ children, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>
      {children}
    </div>
  );
};

export default Create;
