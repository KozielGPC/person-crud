import "dotenv/config";

const config = {
	PORT: process.env.PORT,
	mongoURL: process.env.MONGO_URL,
	API_KEY: process.env.API_KEY,
};

export default config;
