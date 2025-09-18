import axios from "axios";

export async function GET() {
  try {
    const resp = await axios.get("https://BrsApi.ir/Api/Market/Gold_Currency.php", {
      params: { key: process.env.BRS_API_KEY }
    });

    const usdItem = resp.data.currency.find((item) => item.symbol === "USD");

    if (!usdItem) {
      return new Response(JSON.stringify({ error: "USD not found" }), { status: 404 });
    }

    const usdToToman = Number(usdItem.price); // قیمت دلار به تومان

    return new Response(JSON.stringify({ usdToToman }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch USD rate" }), { status: 500 });
  }
}
