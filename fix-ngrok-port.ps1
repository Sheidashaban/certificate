# Fix ngrok to forward to port 3004
Write-Host "Stopping old ngrok..." -ForegroundColor Yellow
Get-Process -Name ngrok -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

Write-Host "Starting ngrok on port 3004..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate'; ngrok http 3004"

Start-Sleep -Seconds 6

try {
    $response = Invoke-RestMethod -Uri "http://localhost:4040/api/tunnels" -TimeoutSec 5
    if ($response.tunnels -and $response.tunnels.Count -gt 0) {
        $newUrl = $response.tunnels[0].public_url
        Write-Host "New ngrok URL: $newUrl" -ForegroundColor Green
        
        # Update .env
        $content = Get-Content ".env"
        $newContent = @()
        foreach ($line in $content) {
            if ($line.StartsWith("NEXT_PUBLIC_APP_URL=")) {
                $newContent += "NEXT_PUBLIC_APP_URL=$newUrl"
            } else {
                $newContent += $line
            }
        }
        $newContent | Set-Content ".env"
        Write-Host ".env file updated!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Please restart your server (Ctrl+C, then npm run dev)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Check ngrok window for the URL" -ForegroundColor Yellow
}

