import { Router } from "express";
import { LogController } from "../controllers/logController";

const logRoutes = Router();

const logController = new LogController();

logRoutes.get("/", logController.findMany);

export default logRoutes;
