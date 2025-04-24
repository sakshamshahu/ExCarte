// import { PrismaClient as SupabasePrismaClientClient } from '../prisma/generated/gcp-client/index.js';
import { PrismaClient as SupabasePrismaClient } from '../prisma/generated/supabase-client/index.js';

// const SupabasePrismaClient = new SupabasePrismaClientClient();
const SupabasePrisma = new SupabasePrismaClient();

export { SupabasePrismaClient, SupabasePrisma };