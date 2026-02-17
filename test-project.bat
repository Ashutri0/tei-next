@echo off
setlocal enabledelayedexpansion

echo ==================================
echo TEI-NEXT PROJECT TEST SUITE
echo ==================================
echo.

set PASSED=0
set FAILED=0

echo 1. Environment Check
echo -------------------
if exist ".env.local" (
    echo [92m✓[0m .env.local file exists
    set /a PASSED+=1
) else (
    echo [91m✗[0m .env.local file missing
    set /a FAILED+=1
)

findstr /C:"NEXT_PUBLIC_SUPABASE_URL" .env.local >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Supabase URL configured
    set /a PASSED+=1
) else (
    echo [91m✗[0m Supabase URL not configured
    set /a FAILED+=1
)

findstr /C:"NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Supabase Key configured
    set /a PASSED+=1
) else (
    echo [91m✗[0m Supabase Key not configured
    set /a FAILED+=1
)

echo.
echo 2. Dependencies Check
echo --------------------
if exist "node_modules" (
    echo [92m✓[0m node_modules exists
    set /a PASSED+=1
) else (
    echo [91m✗[0m node_modules missing - Run: npm install
    set /a FAILED+=1
)

echo.
echo 3. Build Check
echo -------------
if exist ".next" (
    echo [92m✓[0m .next build directory exists
    set /a PASSED+=1
) else (
    echo [93m⚠[0m .next directory missing - Server needs to be running
)

echo.
echo 4. API Endpoints Test
echo --------------------
echo [93mNote: Server must be running on localhost:3000[0m
echo.

timeout /t 2 /nobreak >nul

curl -s http://localhost:3000/api/health/supabase | findstr /C:"ok" >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Supabase Health Check PASSED
    set /a PASSED+=1
) else (
    echo [91m✗[0m Supabase Health Check FAILED
    set /a FAILED+=1
)

echo.
echo 5. Page Routes Test
echo ------------------

curl -s http://localhost:3000/ | findstr /C:"Thermal Energy" >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Homepage PASSED
    set /a PASSED+=1
) else (
    echo [91m✗[0m Homepage FAILED
    set /a FAILED+=1
)

curl -s http://localhost:3000/about | findstr /C:"About" >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m About Page PASSED
    set /a PASSED+=1
) else (
    echo [91m✗[0m About Page FAILED
    set /a FAILED+=1
)

curl -s http://localhost:3000/products | findstr /C:"Products" >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Products Page PASSED
    set /a PASSED+=1
) else (
    echo [91m✗[0m Products Page FAILED
    set /a FAILED+=1
)

curl -s http://localhost:3000/admin/login | findstr /C:"Admin" >nul 2>&1
if !errorlevel! equ 0 (
    echo [92m✓[0m Admin Login PASSED
    set /a PASSED+=1
) else (
    echo [91m✗[0m Admin Login FAILED
    set /a FAILED+=1
)

echo.
echo 6. File Structure Check
echo ----------------------

if exist "package.json" (
    echo [92m✓[0m package.json
    set /a PASSED+=1
) else (
    echo [91m✗[0m package.json missing
    set /a FAILED+=1
)

if exist "next.config.mjs" (
    echo [92m✓[0m next.config.mjs
    set /a PASSED+=1
) else (
    echo [91m✗[0m next.config.mjs missing
    set /a FAILED+=1
)

if exist "README.md" (
    echo [92m✓[0m README.md
    set /a PASSED+=1
) else (
    echo [91m✗[0m README.md missing
    set /a FAILED+=1
)

if exist "DATABASE_README.md" (
    echo [92m✓[0m DATABASE_README.md
    set /a PASSED+=1
) else (
    echo [91m✗[0m DATABASE_README.md missing
    set /a FAILED+=1
)

if exist "lib\supabaseClient.ts" (
    echo [92m✓[0m lib\supabaseClient.ts
    set /a PASSED+=1
) else (
    echo [91m✗[0m lib\supabaseClient.ts missing
    set /a FAILED+=1
)

if exist "lib\store.tsx" (
    echo [92m✓[0m lib\store.tsx
    set /a PASSED+=1
) else (
    echo [91m✗[0m lib\store.tsx missing
    set /a FAILED+=1
)

echo.
echo ==================================
echo TEST SUMMARY
echo ==================================
echo [92mPassed: !PASSED![0m
echo [91mFailed: !FAILED![0m
echo.

if !FAILED! equ 0 (
    echo [92m✓ ALL TESTS PASSED![0m
    echo Your project is ready for deployment!
    exit /b 0
) else (
    echo [91m✗ SOME TESTS FAILED[0m
    echo Please fix the issues above.
    exit /b 1
)
