
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Verificação do Webhook (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "meu_token_meta";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFICADO");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recebimento de mensagens (POST)
app.post("/webhook", (req, res) => {
  console.log("Mensagem recebida:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
