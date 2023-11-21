import "dotenv/config";

const config = {
	PORT: process.env.PORT,
	mongoURL: process.env.MONGO_URL,
};

export default config;
console.log(config);
