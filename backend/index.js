require("dotenv").config();
const cors = require("cors"),
  port = process.env.PORT || 5337,
  express = require("express"),
  Razorpay = require("razorpay"),
  razorpay = new Razorpay({
    key_id: "rzp_test_VULKZYu2VDqjkD",
    key_secret: "zrHvkJf4PdOSe1NiT5aygC0x",
  });

express()
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .get("/", (req, res) => res.send({ data: "Node Express Razorpay API" }))
  .post("/razorpay", async (req, res) => {
    const payment_capture = 1;
    const amount = 499;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: `${currency}_${payment_capture}_${Date.now()}`,
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  })
  .listen(port, () =>
    console.log(`Listening on port http://localhost:${port}`)
  );
