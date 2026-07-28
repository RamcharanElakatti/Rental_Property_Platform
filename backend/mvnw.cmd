@echo off
setlocal

set "BASE_DIR=%~dp0"
set "WRAPPER_DIR=%BASE_DIR%.mvn\wrapper"
set "MAVEN_VERSION=3.9.9"
set "MAVEN_HOME=%WRAPPER_DIR%\apache-maven-%MAVEN_VERSION%"
set "MAVEN_BIN=%MAVEN_HOME%\bin\mvn.cmd"
set "MAVEN_ZIP=%WRAPPER_DIR%\apache-maven-%MAVEN_VERSION%-bin.zip"
set "MAVEN_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/%MAVEN_VERSION%/apache-maven-%MAVEN_VERSION%-bin.zip"

where java >nul 2>nul
if errorlevel 1 (
  echo Java 21 is required but java was not found on PATH.
  echo Install JDK 21, reopen PowerShell, then run: .\mvnw.cmd test
  exit /b 1
)

if not exist "%MAVEN_BIN%" (
  echo Downloading Apache Maven %MAVEN_VERSION%...
  if not exist "%WRAPPER_DIR%" mkdir "%WRAPPER_DIR%"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference = 'Stop'; $url = '%MAVEN_URL%'; $zip = '%MAVEN_ZIP%'; Invoke-WebRequest -Uri $url -OutFile $zip; Expand-Archive -Path $zip -DestinationPath '%WRAPPER_DIR%' -Force"
  if errorlevel 1 exit /b 1
)

call "%MAVEN_BIN%" %*
exit /b %ERRORLEVEL%
