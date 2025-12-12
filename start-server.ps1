# PowerShell script to start the certificate generator server

Write-Host "🚀 Starting Certificate Generator Server..." -ForegroundColor Green
Write-Host ""

# Check if port 3000 is in use
$portCheck = netstat -ano | findstr :3000
if ($portCheck) {
    Write-Host "⚠️  Port 3000 is already in use!" -ForegroundColor Yellow
    Write-Host "Attempting to free the port..." -ForegroundColor Yellow
    
    # Get PID from port
    $lines = $portCheck -split "`n"
    foreach ($line in $lines) {
        if ($line -match '\s+(\d+)$') {
            $processId = $matches[1]
            Write-Host "Killing process $processId..." -ForegroundColor Yellow
            taskkill /PID $processId /F 2>$null
        }
    }
    
    Start-Sleep -Seconds 2
    Write-Host ""
}

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "Copy env.template to .env and configure it." -ForegroundColor Yellow
    exit 1
}

# Check if node_modules exists
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
    npm install
    Write-Host ""
}

Write-Host "✅ Starting Next.js development server..." -ForegroundColor Green
Write-Host "📝 Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📝 Admin panel: http://localhost:3000/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Keep this window open while using the app!" -ForegroundColor Yellow
Write-Host "🛑 Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
npm run dev

