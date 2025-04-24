import { PrismaClient as LocalhostPrisma } from '../prisma/generated/localhost-client/index.js';
import { PrismaClient as SupabasePrisma } from '../prisma/generated/supabase-client/index.js';

const SupabasePrismaClient = new SupabasePrisma();
const LocalhostClient = new LocalhostPrisma();

export { SupabasePrismaClient, LocalhostClient };