import { readRecipes } from "../model/recipeModel.js";
const data = readRecipes();

const controlId = (req, res, next) => {
  const found = data.find((i) => i.id === req.params.id);

  if (!found) {
    return res
      .status(400)
      .json({ message: "aradıgınız idli eleman bulunamadı" });
  }

  req.foundRecipe = found;
  next();
};
export default controlId;
