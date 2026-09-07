# Chromium Default Settings

Compact default profile for Chromium based browsers (Google Chrome, Chromium, and derivatives).

The repository stores the browser defaults used when setting up a fresh machine: browser settings, the list of useful extensions, and the active theme. Only small configuration files are kept here. Caches, history, cookies, and other personal data are not stored.

The profile is applied on the target machine by the Pyntara provisioning tool.

The profile preferences file Default/Preferences is committed pretty-printed so diffs stay readable. Google Chrome always writes this file as compact single-line JSON, so before a commit the file is reformatted with a standard tool. The transformation is: python3 -c "import json; p=json.load(open('Default/Preferences',encoding='utf-8')); open('Default/Preferences','w',encoding='utf-8').write(json.dumps(p, indent=2, ensure_ascii=False)+'\n')"

The pre-commit hook in hooks/pre-commit performs this automatically whenever Default/Preferences is staged. A fresh clone enables it with: git config core.hooksPath hooks
