import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render Home Page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/faq", (req, res) => {
  res.render("faq.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
