// code is requireing config from openai
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const configuration = new Configuration({
	// setting config with the organization
	organization: "org-6WwaBhOX1G4NPsOUy4LPfXuE",
	apiKey: "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", //TODO: do this with .env key
});
const openai = new OpenAIApi(configuration);

// express api that calls the function above

const app = express();
const port = 3000;

app.post("/", async (req, res) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "Say this is a test",
		max_tokens: 7,
		temperature: 0,
	});
	console.log(response.data.choices[0].text);
	// response data will be the the data from openai
	res.json({ data: resppnse.data });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
