# Script to update .env file with ngrok URL
param(
    [Parameter(Mandatory=$true)]
    [string]$NgrokUrl
)

Write-Host "📝 Updating .env file with ngrok URL: $NgrokUrl" -ForegroundColor Cyan

$envFile = ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    exit 1
}

# Read .env file
$envContent = Get-Content $envFile -Raw

# Update NEXT_PUBLIC_APP_URL
if ($envContent -match "NEXT_PUBLIC_APP_URL=") {
    $envContent = $envContent -replace "NEXT_PUBLIC_APP_URL=[^\r\n]+", "NEXT_PUBLIC_APP_URL=$NgrokUrl"
    Write-Host "✅ Updated NEXT_PUBLIC_APP_URL" -ForegroundColor Green
} else {
    # Add it if it doesn't exist
    $envContent += "`nNEXT_PUBLIC_APP_URL=$NgrokUrl`n"
    Write-Host "✅ Added NEXT_PUBLIC_APP_URL" -ForegroundColor Green
}

# Write back to file
Set-Content -Path $envFile -Value $envContent -NoNewline

Write-Host ""
Write-Host "✅ .env file updated successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next: Restart your server (Ctrl+C, then npm run dev)" -ForegroundColor Cyan

