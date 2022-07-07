# Using the Rclone Command with the Ionos Cloud

Here is a working rclone.conf for S3 in the ionos cloud (former: profitbricks).

It took me some time to find these settings since
the howto page https://www.ionos.de/digitalguide/server/knowhow/datenmigration-mit-rclone/ didn't
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

(Obviously, you need to add you credentials)  

I the following script to
backup the bucket to a directory `cya-fileshare`.
```
#!/bin/bash

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR


rclone \
  --config $(realpath rclone.conf ) \
  sync ionos:cya-fileshare/ cya-fileshare/
```
