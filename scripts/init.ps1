# Website Cloner — One-Command Windows PowerShell Initializer Script
# Usage:
#   irm https://raw.githubusercontent.com/TheophilusChinomona/website-cloner-platform/master/scripts/init.ps1 | iex

param(
    [string]$ProjectName = "cloned-website",
    [string]$TargetUrl = ""
)

Write-Host "🚀 Initializing Website Cloner Workspace: $ProjectName..." -ForegroundColor Magenta

$RepoUrl = "https://github.com/TheophilusChinomona/website-cloner-platform.git"

if (-not (Test-Path $ProjectName)) {
    git clone $RepoUrl $ProjectName
}

Set-Location $ProjectName

node scripts/install-plugin.mjs --global
npm install

Write-Host "`n✓ Setup complete!" -ForegroundColor Green
Write-Host "To start cloning:"
Write-Host "  cd $ProjectName"
Write-Host "  agy"
if ($TargetUrl -ne "") {
    Write-Host "  /clone-website $TargetUrl"
} else {
    Write-Host "  /clone-website <target-url>"
}
Write-Host "  /convert-to-webapp`n"
