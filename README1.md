🛠 Dev Log: Git & Configuration Issues

This section walks through the issues encountered during setup and how they were resolved.

🚫 Issue: Git Push Rejected & Large Files
What happened?
The first push to GitHub failed.
The node_modules folder was accidentally included, which added thousands of unnecessary files.
While trying to fix it, the local Git history ended up out of sync with the remote repository.
How it was fixed
Cleaned up the repository
Removed node_modules from tracking and made sure .gitignore was properly set up.
Reset the project history
Created a fresh “Initial commit” that only includes the actual source code. This completely removed the large files from the history.
Forced a clean sync
Used a force push to overwrite the messy version on GitHub with the cleaned one.
Then reconnected the local branch to the remote repository.
🔐 Issue: Hidden .env File
What happened?
The .env file wasn’t showing up on GitHub.
This is actually normal—.gitignore hides it by default to protect sensitive data.
How it was fixed

Force-added the file using:

git add -f server/.env
Then committed and pushed it.

⚠️ Important:
This makes your .env file visible to anyone. Avoid doing this in public repositories if it contains real credentials.

✅ Current Status
The repository is now clean and properly synced with GitHub.
node_modules is correctly ignored.
.env is being tracked (as requested).
Backend and frontend error handling have been improved for better stability.
