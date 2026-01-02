const cors = require ("cors");

const express = require("express");
const authRoutes = require("./routes/authRoutes")
const companyDocument = require("./routes/companyDocumentRoutes")
const superAdminRoute = require("./routes/superAdminRoute")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("test");
});


app.use(cors({
  origin: "http://localhost:5173",
}));

app.use("/api/auth", authRoutes)
app.use("/auth/admin", superAdminRoute)
app.use("/admin-aum", companyDocument)

module.exports = app;
