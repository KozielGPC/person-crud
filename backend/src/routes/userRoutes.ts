import { Router } from "express";
import { UserController } from "../controllers/userController";
import { CreateUserValidator } from "../tools/apiInputValidators";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.findMany);
userRoutes.get("/:id", userController.findOne);
userRoutes.post("/", CreateUserValidator(), userController.create);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export default userRoutes;
