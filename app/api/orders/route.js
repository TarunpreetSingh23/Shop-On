import { connects } from "@/dbconfig/dbconfig";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connects();

    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: "Email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({ success: true, orders }), 
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(" Error fetching orders:", error);

    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
