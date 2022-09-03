import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();
const port = 3000;
app.use(
	cors({
		origin: "http://localhost:3001",
		optionsSuccessStatus: 200,
	})
);

app.use(express.json());

app.use(router);

app.use("*", (req, res, next) => {
	res.status(404);
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
