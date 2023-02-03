// code is requireing config from openai
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
	// setting config with the organization
	organization: "org-6WwaBhOX1G4NPsOUy4LPfXuE",
	apiKey: "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", //TODO: do this with .env key
});
const openai = new OpenAIApi(configuration);

// express api that calls the function above
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3080;

app.post("/", async (req, res) => {
	const { message } = req.body;
	console.log(message, "message");
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${message}`,
		max_tokens: 100,
		temperature: 0.5,
	});

	// response data will be the the data from openai
	res.json({ message: response.data.choices[0].text });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
