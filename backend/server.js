// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "const-tags",
  password: "Sophia246",
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

app.post("/api/countTags", async (req, res) => {
  const { tagsCount } = req.body;

  try {
    for (const [tag, count] of tagsCount) {
      const query = "INSERT INTO tags_count (tag, count) VALUES ($1, $2)";
      await pool.query(query, [tag, count]);
    }

    res.status(200).json({ message: "Contagens de tags salvas com sucesso." });
  } catch (error) {
    console.error("Erro ao salvar as contagens de tags:", error);
    res.status(500).json({ message: "Erro ao salvar as contagens de tags." });
  }
});

app.get("/api/countTags", async (req, res) => {
  try {
    const query = "SELECT * FROM tags_count";
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao obter as contagens de tags:", error);
    res.status(500).json({ message: "Erro ao obter as contagens de tags." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
