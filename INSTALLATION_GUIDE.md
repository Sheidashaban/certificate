# Installation Guide for Windows

## Step 1: Install Node.js

You need to install Node.js first (which includes npm).

### Option A: Download from Official Website (Recommended)

1. **Go to Node.js website**: https://nodejs.org/
2. **Download the LTS version** (Long Term Support) - this is the recommended version
3. **Run the installer** (.msi file)
4. **Follow the installation wizard**:
   - Click "Next" through the setup
   - Accept the license agreement
   - Keep the default installation path
   - **Important**: Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install"
5. **Restart your terminal/PowerShell** after installation

### Option B: Using Chocolatey (If you have it)

```powershell
choco install nodejs
```

### Verify Installation

After installing, **close and reopen your PowerShell terminal**, then run:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., `v20.10.0` and `10.2.3`).

## Step 2: Install Project Dependencies

Once Node.js is installed, navigate to your project folder and run:

```powershell
cd "C:\Users\Sheida\Music\my_cursor_apps\Linked in generatior certificate"
npm install
```

This will install all the required packages.

## Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Edit `.env` file with your configuration (see SETUP.md for details)

## Step 4: Run the Application

```powershell
npm run dev
```

The application will start at `http://localhost:3000`

## Troubleshooting

### If `npm` is still not recognized after installation:

1. **Restart your computer** (sometimes required for PATH changes)
2. **Or restart VS Code completely**
3. **Check PATH manually**:
   - Open System Properties → Environment Variables
   - Look for Node.js path in System Variables → Path
   - Should include something like: `C:\Program Files\nodejs\`

### If you get permission errors:

Run PowerShell as Administrator:
1. Right-click PowerShell
2. Select "Run as Administrator"
3. Navigate to your project folder
4. Run `npm install` again

