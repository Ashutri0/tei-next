// Test script to check Supabase configuration
const { createClient } = require("@supabase/supabase-js");

console.log("Checking environment variables...");
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT SET");
console.log("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? "SET" : "NOT SET");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase environment variables are not set!");
  process.exit(1);
}

console.log("✅ Environment variables found");
console.log("Creating Supabase client...");

try {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log("✅ Supabase client created successfully");
  
  // Test connection
  supabase.from("products").select("id").limit(1).then(({ data, error }) => {
    if (error) {
      console.error("❌ Supabase query failed:", error.message);
    } else {
      console.log("✅ Supabase connection successful!");
    }
  });
} catch (error) {
  console.error("❌ Error creating Supabase client:", error.message);
}
