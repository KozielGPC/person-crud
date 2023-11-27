import { setup } from "./setup";
import { app } from "../app";
import supertest from "supertest";
import { config } from "../config/config";
import { IUser } from "../models/userModel";

describe("AuthController E2E Tests", () => {
	it("should validate API key and return success", async () => {
		const apiKey = config.API_KEY;
		const response = await supertest(app)
			.post("/auth/validate")
			.send({ apiKey });

		expect(response.status).toEqual(200);
		expect(response.body.message).toEqual("API KEY validation successful");
		expect(response.body.data.isValid).toEqual(true);
		expect(response.body.data.token).toBeDefined();
	});

	it("should handle invalid API key and return failure", async () => {
		const invalidApiKey = "invalid_api_key";
		const response = await supertest(app)
			.post("/auth/validate")
			.send({ apiKey: invalidApiKey });

		expect(response.status).toEqual(200);
		expect(response.body.message).toEqual("API KEY validation failed");
		expect(response.body.data.isValid).toEqual(false);
		expect(response.body.data.token).toEqual("");
	});
});

describe("UserController E2E Tests", () => {
	let authToken: string;
	let testUserId: string;
	let usersArray: IUser[] = [];

	setup();

	beforeAll(async () => {
		const authResponse = await supertest(app)
			.post("/auth/validate")
			.send({ apiKey: config.API_KEY });

		authToken = authResponse.body.data.token;
	});

	it("/POST - should create a new user", async () => {
		const createUserRequest = {
			firstName: "Jhon",
			lastName: "Doe",
			addresses: [
				{
					street: "123 Main St",
					city: "Cityville",
					state: "CA",
					zipCode: "87310060",
				},
			],
			dateOfBirth: "2023-11-22T00:31:30Z",
			email: "test@example.com",
			documentNumber: "366.262.370-63",
			phoneNumbers: [
				{
					number: "(44) 1234-2222",
					type: "home",
				},
				{
					number: "(44) 1234-1234",
					type: "work",
				},
			],
		};

		const response = await supertest(app)
			.post("/users")
			.set("token", authToken)
			.send(createUserRequest);

		expect(response.status).toEqual(201);
		expect(response.body.message).toEqual("User created successfully");
		expect(response.body.data).toBeDefined();
		expect(response.body.data._id).toBeDefined();

		testUserId = response.body.data._id;
		usersArray.push(response.body.data);
	});

	it("/POST - should fail to create a new user due to incorrect field format", async () => {
		const createUserRequest = {
			firstName: "1231",
			lastName: "Doe",
			addresses: [
				{
					street: "123 Main St",
					city: "Cityville",
					state: "CA",
					zipCode: "87310060",
				},
			],
			dateOfBirth: "2023-11-22T00:31:30Z",
			email: "testexample.com",
			documentNumber: "366.262.370-63",
			phoneNumbers: [
				{
					number: "44 1234-2222",
					type: "home",
				},
				{
					number: "(44) 1234-1234",
					type: "work",
				},
			],
		};

		const response = await supertest(app)
			.post("/users")
			.set("token", authToken)
			.send(createUserRequest);

		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			errors: [
				{
					type: "field",
					value: "testexample.com",
					msg: "Email must be a valid email address",
					path: "email",
					location: "body",
				},
				{
					type: "field",
					value: "44 1234-2222",
					msg: "Phone number type must be a valid phone number. Correct format: (99) 99999-9999 or (99) 9999-9999",
					path: "phoneNumbers[0].number",
					location: "body",
				},
			],
		});
	});

	it("/POST - should fail to create a new user due to duplicated email", async () => {
		const createUserRequest = {
			firstName: "Jhon",
			lastName: "Doe",
			addresses: [
				{
					street: "123 Main St",
					city: "Cityville",
					state: "CA",
					zipCode: "87310060",
				},
			],
			dateOfBirth: "2023-11-22T00:31:30Z",
			email: "test@example.com",
			documentNumber: "937.655.630-56",
			phoneNumbers: [
				{
					number: "(44) 1234-2222",
					type: "home",
				},
				{
					number: "(44) 1234-1234",
					type: "work",
				},
			],
		};

		const response = await supertest(app)
			.post("/users")
			.set("token", authToken)
			.send(createUserRequest);

		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			status: 0,
			message: "Duplicated email or document number",
		});
	});

	it("/POST - should fail to create a new user due to duplicated document number", async () => {
		const createUserRequest = {
			firstName: "Jhon",
			lastName: "Doe",
			addresses: [
				{
					street: "123 Main St",
					city: "Cityville",
					state: "CA",
					zipCode: "87310060",
				},
			],
			dateOfBirth: "2023-11-22T00:31:30Z",
			email: "test2@example.com",
			documentNumber: "366.262.370-63",
			phoneNumbers: [
				{
					number: "(44) 1234-2222",
					type: "home",
				},
				{
					number: "(44) 1234-1234",
					type: "work",
				},
			],
		};

		const response = await supertest(app)
			.post("/users")
			.set("token", authToken)
			.send(createUserRequest);

		expect(response.status).toEqual(400);
		expect(response.body).toEqual({
			status: 0,
			message: "Duplicated email or document number",
		});
	});

	it("/GET - should get a list of users", async () => {
		const response = await supertest(app).get("/users").set("token", authToken);

		expect(response.status).toEqual(200);
		expect(response.body.message).toEqual("Users found");
		expect(response.body.data.length).toBeGreaterThan(0);
		expect(response.body.data).toEqual(usersArray);
	});

	it("/GET - should get a specific user", async () => {
		const response = await supertest(app)
			.get(`/users/${testUserId}`)
			.set("token", authToken);

		expect(response.status).toEqual(200);
		expect(response.body.message).toEqual("User found");
		expect(response.body.data).toEqual(usersArray[0]);
	});

	it("/PUT - should update a user FirstName", async () => {
		const updateUserRequest = {
			firstName: "Joana",
		};
		const response = await supertest(app)
			.put(`/users/${testUserId}`)
			.set("token", authToken)
			.send(updateUserRequest);
		expect(response.status).toEqual(200);

		expect(response.body.message).toEqual("User updated successfully");
		expect(response.body.data).toEqual({
			...usersArray[0],
			firstName: "Joana",
		});
	});

	it("/PUT - should fail to update a user email due to incorrect format", async () => {
		const updateUserRequest = {
			email: "incorrectemail",
		};
		const response = await supertest(app)
			.put(`/users/${testUserId}`)
			.set("token", authToken)
			.send(updateUserRequest);
		expect(response.status).toEqual(400);

		expect(response.body).toEqual({
			errors: [
				{
					type: "field",
					value: "incorrectemail",
					msg: "Email must be a valid email address",
					path: "email",
					location: "body",
				},
			],
		});
	});

	it("DELETE - should delete a user", async () => {
		const response = await supertest(app)
			.delete(`/users/${testUserId}`)
			.set("token", authToken);

		expect(response.status).toEqual(204);
		expect(response.body).toEqual({});
	});
});
