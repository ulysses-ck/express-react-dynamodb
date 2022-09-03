import express from "express";

import { ddbClient } from "../libs/ddbClient.js";
import { ddbDocClient } from "../libs/ddbDocClient.js";
import {
	DeleteItemCommand,
	GetItemCommand,
	PutItemCommand,
	ScanCommand,
} from "@aws-sdk/client-dynamodb";

const router = express.Router();

let counter = 0;

router.get("/getLanguageByName", async (req, res) => {
	if (
		req.query.ProgrammingLanguage === undefined ||
		req.query.ProgrammingLanguage === ""
	) {
		counter++;
		res.send({ message: "Error, please provide a value", counter });
	} else {
		counter++;
		const params = {
			TableName: process.env.AWS_DATABASE_NAME,
			FilterExpression: "ProgrammingLanguage = :p",
			ExpressionAttributeValues: {
				":p": { S: req.query.ProgrammingLanguage },
			},
			ProjectionExpression: "Id, ProgrammingLanguage, Info, IsActive",
			ReturnConsumedCapacity: "TOTAL",
		};

		console.log(`Respuesta N:${counter}: ` + req.query.ProgrammingLanguage);
		try {
			const data = await ddbDocClient.send(new ScanCommand(params));
			console.log(data);
			res.send(data);
		} catch (err) {
			console.log("Error", err);
		}
	}
});

router.post("/addLanguage", async (req, res) => {
	counter++;
	const params = {
		TableName: process.env.AWS_DATABASE_NAME,
		Item: req.body,
		ConditionExpression: "attribute_not_exists(Id)",
		ReturnConsumedCapacity: "TOTAL",
	};
	console.log(req.body);
	try {
		const data = await ddbClient.send(new PutItemCommand(params));
		console.log(`N: ${counter}`, data);
		res.send(data);
	} catch (err) {
		console.log("Error", err);
		res.send(err);
	}
});

router.delete("/deleteLanguage", async (req, res) => {
	const params = {
		TableName: process.env.AWS_DATABASE_NAME,
		Key: {
			Id: { N: `${req.body.Id}` },
			ProgrammingLanguage: { S: req.body.ProgrammingLanguage },
		},
		ReturnConsumedCapacity: "TOTAL",
	};

	try {
		const data = await ddbClient.send(new DeleteItemCommand(params));
		res.send(data);
	} catch (err) {
		console.log("Error", err);
	}
});

router.put("/updateLanguage", async (req, res) => {
	const paramsDelete = {
		TableName: process.env.AWS_DATABASE_NAME,
		Key: {
			Id: { N: req.body.Id },
			ProgrammingLanguage: { S: req.body.ProgrammingLanguage },
		},
		ReturnConsumedCapacity: "TOTAL",
	};

	const paramsNew = {
		TableName: process.env.AWS_DATABASE_NAME,
		Item: {
			Id: { N: `${req.body.Id}` },
			ProgrammingLanguage: { S: req.body.NewProgrammingLanguage },
		},
		ReturnConsumedCapacity: "TOTAL",
	};

	try {
		const oldData = await ddbClient.send(new DeleteItemCommand(paramsDelete));

		const newData = await ddbClient.send(new PutItemCommand(paramsNew));
		res.send({ oldData, newData });
	} catch (err) {
		console.log("Error", err);
	}
});
export default router;
