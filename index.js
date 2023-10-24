//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";

import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let isPassEntered = false;

app.use(bodyParser.urlencoded({ extended: true }));

function extractPassword(req, res, next) {
  const passFromInput = req.body["password"];
  if(passFromInput === "ILoveProgramming")  {
    isPassEntered = true;
  }
  next();

}

app.use(extractPassword);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if(isPassEntered){
    res.sendFile(__dirname + "/public/secret.html");
  }else{
    isPassEntered = false;
    res.redirect("/")
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
