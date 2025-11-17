const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
      console.log("Received form data:", req.body);
  const { full_name, email, phone_number, preferred_location, interest } = req.body;

  if (!full_name || !email || !phone_number || !preferred_location || !interest) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = `
    INSERT INTO franchise_applications
    (full_name, email, phone_number, preferred_location, interest)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [full_name, email, phone_number, preferred_location, interest], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error." });
    }
    res.json({ message: "Application submitted successfully!" });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));
