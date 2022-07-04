# Using the Rclone Command with the Ionos Cloud
It may sound simple but it took me some time to find a working
`rclone.conf` for the ionos cloud.

The howto page https://www.ionos.de/digitalguide/server/knowhow/datenmigration-mit-rclone/ didn't
not help much.

So here is the rclone.conf file that works for me:
```
[ionos]
type = s3
provider = Other
env_auth = true
access_key_id = ********************
secret_access_key = ****************************************
endpoint = https://s3-de-central.profitbricks.com:443
acl = private
```

The script I where it is used looks as follows:
```
#!/bin/bash

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR


rclone \
  --config $(realpath rclone.conf ) \
  sync ionos:cya-fileshare/ cya-fileshare/
```
