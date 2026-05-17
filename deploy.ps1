#requires -Version 5.1
[CmdletBinding()]
param(
    [string]$SiteName = 'tcg-handyman-websites',
    [switch]$Prod
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$netlify = Get-Command netlify -ErrorAction SilentlyContinue
if (-not $netlify) {
    Write-Host "Netlify CLI not found on PATH. Install with: npm i -g netlify-cli" -ForegroundColor Yellow
    exit 1
}

$stateFile = Join-Path $PSScriptRoot '.netlify\state.json'
if (-not (Test-Path $stateFile)) {
    Write-Host "Site not linked yet. Creating new site '$SiteName'..." -ForegroundColor Cyan
    & netlify sites:create --name $SiteName --account-slug gary-amick0614-earfstq
    if ($LASTEXITCODE -ne 0) {
        Write-Host "sites:create failed; site name may already be taken. Trying link by name..." -ForegroundColor Yellow
    }
    & netlify link --name $SiteName
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Could not link site '$SiteName'. Run 'netlify link' manually." -ForegroundColor Red
        exit $LASTEXITCODE
    }
}

$deployArgs = @('deploy', '--dir', '.', '--message', "Handyman landing $(Get-Date -Format 'yyyy-MM-dd HH:mm')")
if ($Prod) { $deployArgs += '--prod' }

Write-Host ("Deploying ({0})..." -f ($(if ($Prod) { 'PRODUCTION' } else { 'preview' }))) -ForegroundColor Cyan
& netlify @deployArgs

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deploy failed (exit $LASTEXITCODE)." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Done." -ForegroundColor Green
