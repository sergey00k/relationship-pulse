// functions/index.js
const functions = require("firebase-functions");
const express = require("express");
const stripe = require("stripe")(functions.config().stripe.secret);
const cors = require("cors");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const {amount, currency} = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
});

exports.api = functions.https.onRequest(app);
