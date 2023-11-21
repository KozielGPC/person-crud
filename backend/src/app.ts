import express from "express";
import cors from "cors";
import personRoutes from "./routes/personRoutes";
import responseHandler from "./tools/apiResponseHandler";
import { Response, Request } from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", personRoutes);
app.all("*", function (req: Request, res: Response) {
	return responseHandler.successResponseWithData(res, "Page not found", {});
});

export default app;
