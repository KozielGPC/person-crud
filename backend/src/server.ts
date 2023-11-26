import { app } from "./app";
import { config } from "./config/config";

const port = config.PORT ?? 3001;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${+port}`);
});
