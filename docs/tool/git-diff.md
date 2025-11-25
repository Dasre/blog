---
id: Git diff file
---

```shell
#!/bin/bash

TARGET_BRANCH="master"
FILE_EXTENSIONS="yaml|yml"

FILES=$(git diff --name-only --diff-filter=AM ${TARGET_BRANCH}...HEAD | grep -E "\.(${FILE_EXTENSIONS})$")

if [ -n "$FILES" ]; then
  echo "變更的檔案:"
  echo "$FILES"
else
  echo "無 ${FILE_EXTENSIONS} 檔案變更"
fi
```