@echo off
set "CURRENT_DIR=%~dp0"
set "EXPO_HOME=%CURRENT_DIR%.expo_home"

if not exist "%EXPO_HOME%" mkdir "%EXPO_HOME%"

:: Override USERPROFILE and HOME to point to our local writable directory
set "USERPROFILE=%EXPO_HOME%"
set "HOME=%EXPO_HOME%"
set "HOMEDRIVE=E:"
set "HOMEPATH=\mantrapuja\app\MP_App1-main\MP_App1-main\.expo_home"

echo Running EAS command with USERPROFILE redirect to %USERPROFILE%...

if "%~1"=="" (
    echo No command provided. Usage: run-eas.bat [eas-command]
    echo Example: run-eas.bat login
    echo Example: run-eas.bat build --platform android --profile preview
    exit /b 1
)

npx -y eas-cli %*
