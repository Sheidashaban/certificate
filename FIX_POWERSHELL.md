# Fix PowerShell Execution Policy Issue

## Problem
PowerShell is blocking npm because script execution is disabled.

## Solution Options

### Option 1: Change Execution Policy (Recommended)

Run PowerShell as Administrator and execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then type `Y` when prompted.

**What this does:**
- Allows locally created scripts to run
- Requires downloaded scripts to be signed
- Only affects your user account (safe)

### Option 2: Use Command Prompt (CMD) Instead

Instead of PowerShell, use Command Prompt:
1. Press `Win + R`
2. Type `cmd` and press Enter
3. Navigate to your project:
   ```cmd
   cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
   ```
4. Run npm commands:
   ```cmd
   npm install
   ```

### Option 3: Bypass for Single Command

Run this in PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm --version"
```

But you'll need to do this for every command, so Option 1 is better.

## After Fixing

Once fixed, verify:
```powershell
npm --version
node --version
```

Then proceed with installation:
```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
npm install
```

