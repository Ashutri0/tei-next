// Test script to verify Supabase connection and functionality
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('=== Supabase Connection Test ===');
console.log('Supabase URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials not found in .env.local');
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
      console.error('❌ Products read error:', productsError);
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
      console.error('❌ Quotes read error:', quotesError);
    } else {
      console.log(`✅ Successfully read ${quotes.length} quotes`);
      if (quotes.length > 0) {
        console.log('Sample quote:', quotes[0].name);
      }
    }

    // Test 3: Read settings
    console.log('\n3. Testing settings table read...');
    const { data: settings, error: settingsError } = await supabase
      .from('settings')
      .select('*')
      .limit(1);
    
    if (settingsError) {
      console.error('❌ Settings read error:', settingsError);
    } else {
      console.log(`✅ Successfully read settings`);
      if (settings.length > 0) {
        console.log('Settings email:', settings[0].email);
      }
    }

    // Test 4: Test product insertion
    console.log('\n4. Testing product insertion...');
    const testProduct = {
      id: `test_${Date.now()}`,
      name: 'Test Product',
      category: 'Mechanical',
      subcategory: 'Pumps',
      description: 'This is a test product',
      specifications: ['Test Spec 1', 'Test Spec 2'],
      images: ['/test-image.jpg'],
      featured: false,
      created_at: new Date().toISOString().split('T')[0]
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('products')
      .insert(testProduct)
      .select();

    if (insertError) {
      console.error('❌ Product insertion error:', insertError);
    } else {
      console.log('✅ Successfully inserted test product');
      
      // Clean up - delete the test product
      await supabase
        .from('products')
        .delete()
        .eq('id', testProduct.id);
      console.log('✅ Cleaned up test product');
    }

    // Test 5: Test quote insertion
    console.log('\n5. Testing quote insertion...');
    const testQuote = {
      id: `test_${Date.now()}`,
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1 555-0123',
      company: 'Test Company',
      product_id: '1',
      product_name: 'Test Product Name',
      message: 'This is a test quote request',
      status: 'pending',
      created_at: new Date().toISOString().split('T')[0]
    };

    const { data: quoteInsertResult, error: quoteInsertError } = await supabase
      .from('quotes')
      .insert(testQuote)
      .select();

    if (quoteInsertError) {
      console.error('❌ Quote insertion error:', quoteInsertError);
    } else {
      console.log('✅ Successfully inserted test quote');
      
      // Clean up - delete the test quote
      await supabase
        .from('quotes')
        .delete()
        .eq('id', testQuote.id);
      console.log('✅ Cleaned up test quote');
    }

    console.log('\n=== Test Summary ===');
    console.log('All tests completed. Check the results above.');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testConnection();
