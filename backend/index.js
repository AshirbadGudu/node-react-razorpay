require("dotenv").config();
const cors = require("cors"),
  port = process.env.PORT || 5337,
  express = require("express"),
  Razorpay = require("razorpay"),
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

express()
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .get("/", (req, res) => res.send({ data: "Node Express Razorpay API" }))
  .post("/generate-razorpay-id", async (req, res) => {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `INR_RECEIPT_${Date.now()}`,
      payment_capture: 1,
    };
    try {
      const response = await razorpay.orders.create(options);
      res.json(response);
    } catch (error) {
      console.log(error);
    }
  })
  .listen(port, () => console.log(`Running at http://localhost:${port}`));
