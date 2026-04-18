import Stripe from "stripe";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
});

Deno.serve(async (req) => {
  const { userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_xxxxx", // från Stripe dashboard
        quantity: 1,
      },
    ],
    success_url: "https://din-app.vercel.app/settings",
    cancel_url: "https://din-app.vercel.app/pricing",
    metadata: { userId },
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
});
