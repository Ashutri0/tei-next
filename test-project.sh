#!/bin/bash

echo "=================================="
echo "TEI-NEXT PROJECT TEST SUITE"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local url=$1
    local name=$2
    local expected=$3
    
    echo -n "Testing $name... "
    response=$(curl -s "$url")
    
    if echo "$response" | grep -q "$expected"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo "  Response: $response"
        ((FAILED++))
    fi
}

echo "1. Environment Check"
echo "-------------------"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local file exists"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} .env.local file missing"
    ((FAILED++))
fi

if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Supabase URL configured"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Supabase URL not configured"
    ((FAILED++))
fi

if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Supabase Key configured"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Supabase Key not configured"
    ((FAILED++))
fi

echo ""
echo "2. Dependencies Check"
echo "--------------------"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} node_modules missing - Run: npm install"
    ((FAILED++))
fi

echo ""
echo "3. Build Check"
echo "-------------"
if [ -d ".next" ]; then
    echo -e "${GREEN}✓${NC} .next build directory exists"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} .next directory missing - Server needs to be running"
fi

echo ""
echo "4. API Endpoints Test"
echo "--------------------"
echo -e "${YELLOW}Note: Server must be running on localhost:3000${NC}"
echo ""

# Wait a moment for user to start server
sleep 2

# Test Supabase connection
test_endpoint "http://localhost:3000/api/health/supabase" "Supabase Health Check" "ok"

echo ""
echo "5. Page Routes Test"
echo "------------------"

# Test main pages
test_endpoint "http://localhost:3000/" "Homepage" "Thermal Energy"
test_endpoint "http://localhost:3000/about" "About Page" "About"
test_endpoint "http://localhost:3000/services" "Services Page" "What We Offer"
test_endpoint "http://localhost:3000/products" "Products Page" "Products"
test_endpoint "http://localhost:3000/contact" "Contact Page" "Contact"
test_endpoint "http://localhost:3000/quote" "Quote Page" "Request"
test_endpoint "http://localhost:3000/admin/login" "Admin Login" "Admin"

echo ""
echo "6. File Structure Check"
echo "----------------------"

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1 missing"
        ((FAILED++))
    fi
}

check_file "package.json"
check_file "next.config.mjs"
check_file "tsconfig.json"
check_file "README.md"
check_file "DATABASE_README.md"
check_file "lib/supabaseClient.ts"
check_file "lib/store.tsx"
check_file "lib/auth-context.tsx"

echo ""
echo "=================================="
echo "TEST SUMMARY"
echo "=================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
    echo "Your project is ready for deployment!"
    exit 0
else
    echo -e "${RED}✗ SOME TESTS FAILED${NC}"
    echo "Please fix the issues above."
    exit 1
fi
