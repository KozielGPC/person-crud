import { Router } from "express";
import { UserController } from "../controllers/userController";
import {
	CreateUserValidator,
	UpdateUserValidator,
} from "../tools/apiInputValidators";
import { authenticateKey } from "../middlewares/authentication";

const userRoutes = Router();
const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 firstName: John
 *                 lastName: Doe
 *                 addresses:
 *                   - street: 123 Main St
 *                     city: Cityville
 *                     state: CA
 *                     zipCode: 12345
 *                 dateOfBirth: "1990-01-01T00:00:00.000Z"
 *                 email: john.doe@example.com
 *                 documentNumber: ABC123
 *                 phoneNumbers:
 *                   - number: 555-1234
 *                     type: mobile
 */
userRoutes.get("/users", authenticateKey, userController.findMany);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get a user by ID
 *     description: Retrieve a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string  # Assuming your user IDs are strings; adjust if necessary
 *     responses:
 *       200:
 *         description: The user with the specified ID.
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: John
 *               lastName: Doe
 *               addresses:
 *                 - street: 123 Main St
 *                   city: Cityville
 *                   state: CA
 *                   zipCode: 12345
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: ABC123
 *               phoneNumbers:
 *                 - number: 555-1234
 *                   type: mobile
 *       404:
 *         description: User not found.
 */
userRoutes.get("/users/:id", authenticateKey, userController.findOne);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             documentNumber: ABC123
 *             addresses:
 *               - street: 123 Main St
 *                 city: Cityville
 *                 state: CA
 *                 zipCode: 12345
 *             phoneNumbers:
 *               - number: 555-1234
 *                 type: mobile
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: John
 *               lastName: Doe
 *               email: john.doe@example.com
 *               documentNumber: ABC123
 *               addresses:
 *                 - street: 123 Main St
 *                   city: Cityville
 *                   state: CA
 *                   zipCode: 12345
 *               phoneNumbers:
 *                 - number: 555-1234
 *                   type: mobile
 *       400:
 *         description: Invalid input.
 */
userRoutes.post(
	"/users",
	CreateUserValidator(),
	authenticateKey,
	userController.create
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update a user by ID
 *     description: Update a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: John
 *               lastName: Doe
 *               addresses:
 *                 - street: 123 Main St
 *                   city: Cityville
 *                   state: CA
 *                   zipCode: 12345
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: ABC123
 *               phoneNumbers:
 *                 - number: 555-1234
 *                   type: mobile
 *       404:
 *         description: User not found.
 */
userRoutes.put(
	"/users/:id",
	UpdateUserValidator(),
	authenticateKey,
	userController.update
);

/**
 * @swagger
 * /users/{id}:
 *
 *   delete:
 *     tags: [User]
 *     summary: Delete a user by ID
 *     description: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               firstName: John
 *               lastName: Doe
 *               addresses:
 *                 - street: 123 Main St
 *                   city: Cityville
 *                   state: CA
 *                   zipCode: 12345
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: ABC123
 *               phoneNumbers:
 *                 - number: 555-1234
 *                   type: mobile
 *       404:
 *         description: User not found.
 */
userRoutes.delete("/users/:id", authenticateKey, userController.delete);

userRoutes.put(
	"/users/:id/phoneNumbers",
	authenticateKey,
	userController.updatePhoneNumbers
);

userRoutes.put(
	"/users/:id/addresses",
	authenticateKey,
	userController.updateAddresses
);

export { userRoutes };
