# Website terminal commands

The home page of [yasirhassan.tech](https://yasirhassan.tech) has a small terminal for exploring the portfolio.

**Open it** by pressing `` ` `` on the home page, clicking the **>_** button in the header, clicking **Terminal** in the footer, or using Ctrl K → Open terminal.

## Main commands

| Command | What it does |
|---|---|
| `help` | Lists all commands |
| `whoami` (or `about`) | Short introduction: studies, internship, focus areas and availability |
| `ls` | Lists files: `projects/  writeups/  resume.pdf  contact.txt  skills.txt` |
| `ls projects` | Lists all six projects with one-line descriptions |
| `ls writeups` | Lists the writeups |
| `cat resume.pdf` (or `resume`) | Résumé summary and a download link |
| `cat contact.txt` (or `contact`) | Email, LinkedIn and GitHub links |
| `cat skills.txt` | Skills summary by area |
| `open <project>` | Opens a project: `vigilense`, `netguard`, `milkiyat`, `dastarkhwan`, `hrms`, `enterprise-network` |
| `open <writeup>` | Opens a writeup: `tamper-evident-land-registry`, `fire-smoke-detection-yolo` |
| `open resume` | Downloads the résumé |
| `email` | Copies the email address to the clipboard |
| `theme` | Switches between light and dark mode |

## Fun ones

| Command | Response |
|---|---|
| `nmap yasirhassan.tech` | A fake port scan ending with `1337/tcp open hire-me` |
| `nmap <other host>` | Refuses: the host is out of scope, with a reminder to only scan systems you have permission to test |
| `sudo <anything>` | "visitor is not in the sudoers file. This incident will be reported." |
| `rm -rf /` | "Permission denied. Nice try though." |

## Utility

| Command | What it does |
|---|---|
| `pwd` | Shows the current directory |
| `date` | Shows the current date and time |
| `echo <text>` | Prints the text back |
| `history` | Lists previous commands |
| `clear` (or `cls`) | Clears the screen |
| `exit` | Closes the terminal |

## Keyboard shortcuts

| Key | Action |
|---|---|
| Tab | Completes commands and names (e.g. type `open net` and press Tab) |
| ↑ / ↓ | Walks through previous commands |
| Ctrl + L | Clears the screen |
| Esc | Closes the terminal |

## Quick demo

```
whoami
ls projects
nmap yasirhassan.tech
cat contact.txt
```

Commands are defined in [`js/terminal.js`](js/terminal.js).
