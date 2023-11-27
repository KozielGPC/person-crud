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
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
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
 *                     zipCode: 99999-999
 *                 dateOfBirth: "1990-01-01T00:00:00.000Z"
 *                 email: john.doe@example.com
 *                 documentNumber: 999.999.999-99
 *                 phoneNumbers:
 *                   - number: (11) 99999-9999
 *                     type: Home
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
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
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
 *                   zipCode: 99999-999
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: 999.999.999-99
 *               phoneNumbers:
 *                 - number: (11) 99999-9999
 *                   type: Home
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
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             documentNumber: 999.999.999-99
 *             addresses:
 *               - street: 123 Main St
 *                 city: Cityville
 *                 state: CA
 *                 zipCode: 99999-999
 *             phoneNumbers:
 *               - number: (11) 99999-9999
 *                 type: Home
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
 *               documentNumber: 999.999.999-99
 *               addresses:
 *                 - street: 123 Main St
 *                   city: Cityville
 *                   state: CA
 *                   zipCode: 99999-999
 *               phoneNumbers:
 *                 - number: (11) 99999-9999
 *                   type: Home
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
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             email: john.doe@example.com
 *             documentNumber: 999.999.999-99
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
 *                   zipCode: 99999-999
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: 999.999.999-99
 *               phoneNumbers:
 *                 - number: (11) 99999-9999
 *                   type: Home
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
 *   delete:
 *     tags: [User]
 *     summary: Delete a user by ID
 *     description: Delete a user by ID.
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
userRoutes.delete("/users/:id", authenticateKey, userController.delete);

/**
 * @swagger
 * /users/{id}/phoneNumbers:
 *   put:
 *     tags: [User]
 *     summary: Update user phone numbers by ID
 *     description: Update the phone numbers of a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update phone numbers
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             phoneNumbers:
 *               - number: (11) 99999-9999
 *                 type: Home
 *     responses:
 *       200:
 *         description: User phone numbers updated successfully.
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
 *                   zipCode: 99999-999
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: 999.999.999-99
 *               phoneNumbers:
 *                 - number: (11) 99999-9999
 *                   type: Home
 *       404:
 *         description: User not found.
 */
userRoutes.put(
	"/users/:id/phoneNumbers",
	authenticateKey,
	userController.updatePhoneNumbers
);

/**
 * @swagger
 * /users/{id}/addresses:
 *   put:
 *     tags: [User]
 *     summary: Update user addresses by ID
 *     description: Update the addresses of a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update addresses
 *         schema:
 *           type: string
 *       - in: header
 *         name: token
 *         required: true
 *         description: An authentication token.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             addresses:
 *               - street: 123 Main St
 *                 city: Cityville
 *                 state: CA
 *                 zipCode: 99999-999
 *     responses:
 *       200:
 *         description: User addresses updated successfully.
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
 *                   zipCode: 99999-999
 *               dateOfBirth: "1990-01-01T00:00:00.000Z"
 *               email: john.doe@example.com
 *               documentNumber: 999.999.999-99
 *               phoneNumbers:
 *                 - number: (11) 99999-9999
 *                   type: Home
 *       404:
 *         description: User not found.
 */
userRoutes.put(
	"/users/:id/addresses",
	authenticateKey,
	userController.updateAddresses
);

export { userRoutes };
''