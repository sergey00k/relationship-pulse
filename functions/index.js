const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripeSecretKey = functions.config().stripe.test_secret ||
  functions.config().stripe.secret;
const stripe = require("stripe")(stripeSecretKey);

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
