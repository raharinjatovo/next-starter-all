const clientId = process.env.GITHUB_ID; // Your GitHub OAuth client ID
const redirectUri = encodeURIComponent('localhost:3000/auth/callback'); // Redirect URI after successful authentication
const state = Math.random().toString(36).substring(7); // A random state parameter to protect against CSRF

// GitHub OAuth URL for authorization
const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=user:email`;

console.log(githubAuthUrl); // This is the URL you will redirect the user to
