import { query } from "./query.js";


export async function getArtist() {
  try {
    const response = await query("artists");
    console.log("Response from grapes backend", response);
    return response;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
}
