import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

import { Database } from "../../domain";

dotenv.config();

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("missing envs config");

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
