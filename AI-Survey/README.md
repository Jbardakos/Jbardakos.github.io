# AI Research Study Form - GitHub Pages Setup

This form is designed to run directly on GitHub Pages and save submissions to your repository.

## 🚀 Quick Setup Steps

### 1. Create a GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "AI Survey Form"
4. Select expiration (90 days recommended)
5. Check these permissions:
   - ✅ `repo` (for private repos) OR `public_repo` (for public repos)
6. Generate and copy the token immediately

### 2. Update the Configuration

Open `index.html` and find these lines at the top of the script section:

```javascript
const GITHUB_OWNER = 'Jbardakos'; // ✅ Already set to your username
const GITHUB_REPO = 'Jbardakos.github.io'; // ✅ Already set to your repo
const GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN'; // ⚠️ REPLACE THIS!
const CSV_PATH = 'AI-Survey/submissions.csv'; // ✅ Will save in AI-Survey folder
```

Replace `YOUR_GITHUB_TOKEN` with your actual token:
```javascript
const GITHUB_TOKEN = 'ghp_xxxxxxxxxxxxxxxxxxxx'; // Your actual token
```

### 3. Upload to Your Repository

1. In your `Jbardakos.github.io` repository, navigate to the `AI-Survey` folder
2. Click "Upload files"
3. Upload the `index.html` file
4. Commit the changes

### 4. Access Your Form

Your form will be live at:
```
https://jbardakos.github.io/AI-Survey/
```

## 📁 File Structure

After setup, your repository will have:
```
Jbardakos.github.io/
├── AI-Survey/
│   ├── index.html (the form)
│   └── submissions.csv (created automatically after first submission)
└── ... (other files)
```

## ✅ How It Works

1. Users fill out the form at `https://jbardakos.github.io/AI-Survey/`
2. When they click "Verify and Save", the form:
   - Validates all fields
   - Creates/updates `submissions.csv` in the AI-Survey folder
   - Shows success or error message

## 🔒 Security Warning

⚠️ **Important**: The current setup exposes your GitHub token in the browser. This is okay for:
- Personal/research projects
- Trusted users
- Short-term data collection

For production use with public access, consider:
1. Using a backend service (Netlify Functions, Vercel, etc.)
2. Creating a separate GitHub account just for form submissions
3. Using GitHub Actions to process submissions

## 🛠️ Troubleshooting

**"Failed to save submission" error:**
- Check that your token is correct
- Verify token has `repo` or `public_repo` permission
- Make sure token hasn't expired

**Form not loading:**
- Clear browser cache
- Check browser console for errors (F12)
- Ensure JavaScript is enabled

**CSV file location:**
- The file will appear at: `AI-Survey/submissions.csv`
- First submission creates the file
- Subsequent submissions append new rows

## 📊 CSV Format

The submissions.csv file will contain:
```
Timestamp,Full Name,Profession,Email,Mobile,Preferred Day,Preferred Time,GitHub ID
2024-01-15T10:30:00.000Z,John Doe,Designer,john@email.com,+1234567890,weekdays,2-4PM IST,johndoe
```

## 🚦 Testing

1. Fill the form with test data
2. Submit and check for success message
3. Go to your repository → AI-Survey folder
4. Check that `submissions.csv` was created/updated
5. View the raw file to see submissions

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for error details
2. Verify all configuration values are correct
3. Ensure your GitHub token is valid and has correct permissions