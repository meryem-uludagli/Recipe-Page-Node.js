import { readRecipes, writeRecipes } from "../model/recipeModel.js";
import isInValid from "../utils/isInValid.js";
import crypto from "crypto";

const data = readRecipes();

export const getAllRecipes = (req, res) => {
  let recipes = [...data];
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }
  res.status(200).json({
    status: "success",
    results: recipes.length,
    recipes: recipes,
  });
};

export const createRecipe = (req, res) => {
  let newRecipe = req.body;
  if (isInValid(newRecipe)) {
    return res
      .status(404)
      .json({ message: "Lütfen bütün değerleri tanimlayin" });
  }
  newRecipe = {
    ...newRecipe,
    id: crypto.randomUUID(),
    image: `https://picsum.photos/seed/${crypto.randomUUID()}/500/500`,
  };
  data.push(newRecipe);
  writeRecipes(data);
  res
    .status(201)
    .json({ message: "Yeni tarif oluşturuldu", recipe: newRecipe });
};

export const getRecipe = (req, res) => {
  res
    .status(200)
    .json({ message: "Aradiginiz tarif bulundu", found: req.foundRecipe });
};

export const deleteRecipe = (req, res) => {
  const index = data.findIndex((i) => i.id === req.params.id);
  data.splice(index, 1);
  writeRecipes(data);
  res.status(204).json({});
};

export const updateRecipe = (req, res) => {
  const updated = { ...req.foundRecipe, ...req.body };
  const index = data.findIndex((i) => i.id === req.params.id);
  data.splice(index, 1, updated);

  writeRecipes(data);
  res.status(200).json({
    message: "Tarif başariyla güncellendi",
    recipe: updated,
  });
};
