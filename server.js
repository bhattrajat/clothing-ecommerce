const express = require("express");
const app = express();
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// This is your real test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

app.use(express.static("."));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "inr",
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        images: [item.imageUrl],
      },
    },
  }));
  console.log(transformedItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_rates: ["shr_1JQCAFSGZ43n5aWdIkUBxJi2"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `http://localhost:3000?success=true`,
    cancel_url: `http://localhost:3000?canceled=true`,
  });
  res.status(200).json({ id: session.id });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
