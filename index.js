require("dotenv").config();
const express = require("express");
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");
const winston = require("winston");

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Initialize Better Stack logger
const logtail = new Logtail(process.env.BETTERSTACK_TOKEN, {
  endpoint: "https://s2618611.eu-central-1a.betterstackdata.com"
});
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new LogtailTransport(logtail),
  ],
});

// Mock banking endpoints
app.get("/health", (req, res) => {
  logger.info("Health check", { endpoint: "/health" });
  res.json({ status: "ok" });
});

app.get("/accounts", (req, res) => {
  logger.info("Accounts list requested", { endpoint: "/accounts", user_id: "usr_123" });
  res.json({ accounts: [{ id: "acc_001", balance: 4250.00, currency: "EUR" }] });
});

app.post("/transfer", (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    logger.error("Transfer failed: invalid amount", { endpoint: "/transfer", amount });
    return res.status(400).json({ error: "Invalid amount" });
  }
  if (amount > 10000) {
    logger.warn("Large transfer flagged", { endpoint: "/transfer", amount });
  }
  logger.info("Transfer successful", { endpoint: "/transfer", amount });
  res.json({ status: "success", transaction_id: "txn_" + Date.now() });
});

app.get("/loan/apply", (req, res) => {
  logger.info("Loan application started", { endpoint: "/loan/apply", step: "form_start" });
  res.json({ status: "application_started", loan_id: "loan_" + Date.now() });
});

// Intentional error endpoint for testing
app.get("/crash", (req, res) => {
  logger.error("Simulated server error", { endpoint: "/crash", error: "Unhandled exception" });
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Banking app started`, { port: PORT, environment: "demo" });
});