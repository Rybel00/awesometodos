📜 Project History & Git Troubleshooting
What went wrong at the start?

When trying to push the project to GitHub, a few common issues got in the way:

node_modules was included
The project accidentally tracked the node_modules folder, which contains thousands of files. GitHub doesn’t handle this well because it’s too large and unnecessary.
Git history became messy
After removing those large files, the project history no longer matched what GitHub expected, causing conflicts.
Branch connection was lost
At some point, Git lost the link between your local main branch and the remote repository, so pushes didn’t behave as expected.
How it was fixed (step-by-step)

Here’s what we did to clean everything up:

Removed unnecessary files
We stopped tracking node_modules by adding it to .gitignore.
Reset the project history
Instead of trying to fix the messy history, we created a clean “Initial commit” with only the important project files.
Force pushed the clean version
The cleaned project replaced the old version on GitHub to remove all the clutter.

Reconnected the branch
Finally, we linked the local branch back to GitHub using:

'git push --set-upstream origin main'

This version keeps it simple, explains the why, and feels more like a real developer explaining what happened rather than a formal report.
