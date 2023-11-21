import { Router } from "express";
import { PersonController } from "../controllers/personController";
import userModel from "../models/userModel";

const personRoutes = Router();

const personController = new PersonController(userModel);

personRoutes.get("/", personController.findMany);
personRoutes.post("/", personController.create);
personRoutes.put("/:id", personController.update);
personRoutes.delete("/:id", personController.delete);

export default personRoutes;
