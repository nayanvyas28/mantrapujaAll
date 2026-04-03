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

echo Starting Expo with USERPROFILE redirect to %USERPROFILE%...
call npx expo start %*

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] First attempt failed. Trying fallback offline mode...
    echo Starting Expo with DNS fix, Offline mode, USERPROFILE redirect to %USERPROFILE% and IP %EXPO_PACKAGER_HOSTNAME%...
    call npx expo start --offline %*
)
