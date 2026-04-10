@echo off
set "CURRENT_DIR=%~dp0"
set "EXPO_HOME=%CURRENT_DIR%.expo_home"

if not exist "%EXPO_HOME%" mkdir "%EXPO_HOME%"

:: Override USERPROFILE and HOME to point to our local writable directory
set "USERPROFILE=%EXPO_HOME%"
set "HOME=%EXPO_HOME%"
for %%i in ("%EXPO_HOME%") do set "HOMEDRIVE=%%~di"
for %%i in ("%EXPO_HOME%") do set "HOMEPATH=%%~pi"

:: Fix for fetch failed errors in Node.js 18+ (especially on Windows)
set "NODE_OPTIONS=--dns-result-order=ipv4first"

:: Ensure environment variables are loaded for the monorepo root
set "EXPO_PUBLIC_SUPABASE_URL=https://s1.mantrapuja.com"
set "EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc3MDkxNDk0MCwiZXhwIjo0OTI2NTg4NTQwLCJyb2xlIjoiYW5vbiJ9.8wPYbdpzTQ-caeOvS3nRH11ivAdTETmjmAoTivV2T80"
set "EXPO_PUBLIC_BACKEND_URL=http://lk8ogw0kkok0sso484swc0wc.34.93.68.183.sslip.io"
set "EXPO_PUBLIC_ADMIN_URL=http://localhost:3001"
set "EXPO_PUBLIC_SESSION_SALT=sg6XisTlL2QcXSuE"
set "EXPO_PUBLIC_EXPO_ROUTER_APP_ROOT=app"

echo Starting Expo with USERPROFILE redirect to %USERPROFILE%...
call npx expo start %*

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] First attempt failed. Trying fallback offline mode...
    echo Starting Expo with DNS fix, Offline mode, USERPROFILE redirect to %USERPROFILE% and IP %EXPO_PACKAGER_HOSTNAME%...
    call npx expo start --offline %*
)
