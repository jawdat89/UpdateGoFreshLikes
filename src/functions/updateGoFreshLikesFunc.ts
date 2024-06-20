import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { createClient } from "@sanity/client";

// Initialize the Sanity client
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2024-04-09",
  token: process.env.SANITY_WRITE_TOKEN, // Use a token with write permissions
  useCdn: false,
});

interface UpdateLikesRequest {
  itemId: string;
}

export async function updateGoFreshLikesFunc(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  if (request.method === "OPTIONS") {
    return {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this as needed
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  const body = (await request.json()) as UpdateLikesRequest;

  if (!body || !body.itemId) {
    return {
      status: 400,
      jsonBody: { error: "Item ID is required" },
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this as needed
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  const { itemId } = body;

  try {
    await sanityClient
      .transaction()
      .patch(itemId, {
        inc: { likes: 1 },
      })
      .commit();

    return {
      status: 200,
      jsonBody: { message: "Likes updated successfully" },
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this as needed
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    context.log("Error incrementing likes:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to increment likes" },
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust this as needed
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
}

app.http("updateGoFreshLikesFunc", {
  methods: ["POST", "OPTIONS"],
  authLevel: "function",
  handler: updateGoFreshLikesFunc,
});
