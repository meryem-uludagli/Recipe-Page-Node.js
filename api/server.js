import express, { json } from "express";
import cors from 'cors';
import recipeRouter from "./routes/recipeRoutes.js";

const app = express();
const port = 4004

app.use(cors());
app.use(express.json());

app.use(recipeRouter);

app.listen(port, () => {
    console.log(`Server ${port} portta calısmaya basladı`)
});