import { Router } from "express";
import { PersonController } from "../controllers/personController";
// import personModel from "../models/personModel";

const personRoutes = Router();

const personController = new PersonController();

personRoutes.get("/", personController.findMany);
// personRoutes.post("/", personController.create);

export default personRoutes;
