import express, { Request } from "express";
import fs from "fs/promises";
import path from "path";

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));

const defaultDelay = 3;
let delay = 0;

app.get("/", async (req, res) => {
    delay = 1000 * (req.query.speed ? parseInt(req.query.speed as string) : defaultDelay);

    const indexPath = path.join(__dirname, "public", "index_styles.html");
    const file = await fs.readFile(indexPath);

    res.setHeader("Content-Type", "text/html");
    res.send(file);
});

app.get("/styles.css", async (req, res) => {
    const stylePath = path.join(__dirname, "public", "styles.css");
    const file = await fs.readFile(stylePath);

    setTimeout(() => {
        res.setHeader("Content-Type", "text/css");
        res.send(file);
    }, delay);
});

app.get("/script.js", async (req, res) => {
    const indexPath = path.join(__dirname, "public", "script.js");
    const file = await fs.readFile(indexPath);

    res.setHeader("Content-Type", "text/javascript");
    res.send(file);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
