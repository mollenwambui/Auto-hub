export async function POST(req) {

 // Get user message from frontend
  const body = await req.json();

  // Convert message to lowercase for easier matching
  const message = body.message.toLowerCase();
  let reply = "Sorry, I didn't understand that. Try asking about prices, location, or contact information";

  if ( message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    reply = "Hello 👋 Welcome to AutoHub! How can I help you today?";
  }

  else if (message.includes("price") || message.includes("cost")) {
    reply = "Our cars range from KSh 500,000 to KSh 3,000,000 depending on the model.";
  }

  else if (message.includes("location") || message.includes("where")) {
    reply = "We are located in Nairobi, Kenya.";
  }

  else if (message.includes("contact") || message.includes("whatsapp")) {
    reply = "You can contact us via WhatsApp or through the contact page.";
  }

  return Response.json({
    reply,
  });
}