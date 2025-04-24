import { LocalhostClient, SupabasePrismaClient } from "./prisma.js";

async function isLocalhostAvailable() {
  try {
    await LocalhostClient.$connect();
    return true;
  } catch (error) {
    console.error("LocalhostClient is unavailable:", error.message);
    return false;
  }
}

async function getClient(useLocalhost) {
  if (useLocalhost) {
    return LocalhostClient;
  } else {
    return SupabasePrismaClient;
  }
}
export async function getPrimaryClient() {
    const useLocalhost = await isLocalhostAvailable();
    const client = await getClient(useLocalhost);
    console.log(`Using ${useLocalhost ? "Localhost" : "Supabase"} client`);
    return {client, useLocalhost};
}