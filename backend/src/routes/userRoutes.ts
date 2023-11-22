import { Router } from "express";
import { UserController } from "../controllers/userController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.findMany);
userRoutes.get("/:id", userController.findOne);
userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;
