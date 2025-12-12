# PowerShell script to set up ngrok for public URL access

Write-Host "🚀 Setting up ngrok for public URL access..." -ForegroundColor Green
Write-Host ""

# Check if ngrok is installed
$ngrokInstalled = Get-Command ngrok -ErrorAction SilentlyContinue

if (-not $ngrokInstalled) {
    Write-Host "❌ ngrok is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install ngrok first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://ngrok.com/download" -ForegroundColor Cyan
    Write-Host "2. Or use: choco install ngrok" -ForegroundColor Cyan
    Write-Host "3. Or use: npm install -g ngrok" -ForegroundColor Cyan
    Write-Host ""
    exit 1
}

Write-Host "✅ ngrok is installed" -ForegroundColor Green
Write-Host ""

# Check if server is running on port 3000
$portCheck = netstat -ano | findstr :3000
if (-not $portCheck) {
    Write-Host "⚠️  Server is not running on port 3000!" -ForegroundColor Yellow
    Write-Host "Please start your server first:" -ForegroundColor Yellow
    Write-Host "  npm run dev" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then run this script again in a NEW terminal window." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "✅ Server is running on port 3000" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Starting ngrok tunnel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT:" -ForegroundColor Yellow
Write-Host "1. ngrok will give you a public URL (like https://abc123.ngrok.io)" -ForegroundColor White
Write-Host "2. Copy that URL" -ForegroundColor White
Write-Host "3. Update your .env file:" -ForegroundColor White
Write-Host "   NEXT_PUBLIC_APP_URL=https://abc123.ngrok.io" -ForegroundColor Cyan
Write-Host "4. Restart your server (Ctrl+C, then npm run dev)" -ForegroundColor White
Write-Host "5. Use the ngrok URL to access your app" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop ngrok when done." -ForegroundColor Yellow
Write-Host ""

# Start ngrok
ngrok http 3000

