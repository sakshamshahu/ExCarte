import { PrismaClient as GCPPrismaClient } from '../prisma/generated/gcp-client/index.js';
import { PrismaClient as SupabasePrismaClient } from '../prisma/generated/supabase-client/index.js';

const GCPprisma = new GCPPrismaClient();
const SupabasePrisma = new SupabasePrismaClient();

export { GCPprisma, SupabasePrisma };