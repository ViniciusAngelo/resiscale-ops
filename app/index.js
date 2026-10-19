const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: "UP",
    message: "Bem-vindo ao ResiScale-Ops API!",
    version: "1.0.0",
    timestamp: new Date()
  });
});

app.get('/health', (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});