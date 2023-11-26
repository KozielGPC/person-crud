import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "User API Documentation",
			version: "1.0.0",
			description: "User API Documentation and Examples",
		},
	},
	apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export { specs };
