// Simple test for Supabase connection
const { createClient } = require("@supabase/supabase-js");

// You need to manually set these values for testing
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";

console.log('=== Supabase Connection Test ===');
console.log('Please update the supabaseUrl and supabaseAnonKey in this file');

if (supabaseUrl === "YOUR_SUPABASE_URL" || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  console.log('❌ Please update the credentials in the test file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n=== Testing Database Connection ===');
    
    // Test 1: Read products
    console.log('1. Testing products table read...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (productsError) {
      console.error('❌ Products read error:', productsError.message);
      console.error('Details:', productsError.details);
    } else {
      console.log(`✅ Successfully read ${products.length} products`);
      if (products.length > 0) {
        console.log('Sample product:', products[0].name);
      }
    }

    // Test 2: Read quotes
    console.log('\n2. Testing quotes table read...');
    const { data: quotes, error: quotesError } = await supabase
      .from('quotes')
      .select('*')
      .limit(5);
    
    if (quotesError) {
      console.error('❌ Quotes read error:', quotesError.message);
      console.error('Details:', quotesError.details);
    } else {
      console.log(`✅ Successfully read ${quotes.length} quotes`);
      if (quotes.length > 0) {
        console.log('Sample quote:', quotes[0].name);
      }
    }

    console.log('\n=== Test Summary ===');
    console.log('Basic connection tests completed.');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection();
