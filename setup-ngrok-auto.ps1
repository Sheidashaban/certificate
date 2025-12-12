# Automatic ngrok setup script
Write-Host "🚀 Setting up ngrok automatically..." -ForegroundColor Green
Write-Host ""

# Check if server is running
$portCheck = netstat -ano | findstr :3000
if (-not $portCheck) {
    Write-Host "❌ Server is not running on port 3000!" -ForegroundColor Red
    Write-Host "Please start your server first: npm run dev" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Server is running on port 3000" -ForegroundColor Green

# Kill any existing ngrok processes
Get-Process -Name ngrok -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

Write-Host "Starting ngrok..." -ForegroundColor Cyan

# Start ngrok in background
$ngrokProcess = Start-Process -FilePath "ngrok" -ArgumentList "http","3000" -PassThru -WindowStyle Hidden

# Wait for ngrok to start
Start-Sleep -Seconds 5

# Try to get the URL from ngrok API
$publicUrl = $null
$maxRetries = 15

for ($i = 1; $i -le $maxRetries; $i++) {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -TimeoutSec 2 -ErrorAction Stop
        if ($response.tunnels -and $response.tunnels.Count -gt 0) {
            $publicUrl = $response.tunnels[0].public_url
            Write-Host "✅ Found ngrok URL: $publicUrl" -ForegroundColor Green
            break
        }
    } catch {
        Write-Host "Waiting for ngrok... ($i/$maxRetries)" -ForegroundColor Yellow
        Start-Sleep -Seconds 2
    }
}

if (-not $publicUrl) {
    Write-Host ""
    Write-Host "⚠️  Could not automatically get ngrok URL." -ForegroundColor Yellow
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Open a browser and go to: http://localhost:4040" -ForegroundColor Cyan
    Write-Host "2. Look for the 'Forwarding' URL (like https://abc123.ngrok.io)" -ForegroundColor Cyan
    Write-Host "3. Copy that URL" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or check the ngrok window that should have opened." -ForegroundColor Yellow
    exit 1
}

# Update .env file
Write-Host ""
Write-Host "📝 Updating .env file..." -ForegroundColor Cyan

$envFile = ".env"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    exit 1
}

# Read .env file
$envContent = Get-Content $envFile -Raw

# Update NEXT_PUBLIC_APP_URL
if ($envContent -match "NEXT_PUBLIC_APP_URL=(.+)") {
    $envContent = $envContent -replace "NEXT_PUBLIC_APP_URL=.+", "NEXT_PUBLIC_APP_URL=$publicUrl"
    Write-Host "✅ Updated NEXT_PUBLIC_APP_URL to: $publicUrl" -ForegroundColor Green
} else {
    # Add it if it doesn't exist
    $envContent += "`nNEXT_PUBLIC_APP_URL=$publicUrl`n"
    Write-Host "✅ Added NEXT_PUBLIC_APP_URL: $publicUrl" -ForegroundColor Green
}

# Write back to file
Set-Content -Path $envFile -Value $envContent -NoNewline

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart your server (Ctrl+C, then npm run dev)" -ForegroundColor White
Write-Host "2. Use this URL: $publicUrl/admin" -ForegroundColor White
Write-Host "3. Generate a certificate" -ForegroundColor White
Write-Host "4. Share on LinkedIn - image will appear automatically! 🎉" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Keep ngrok running! Close this window to stop it." -ForegroundColor Yellow

