# Using the Rclone Command with the Ionos Cloud

Here is a working rclone.conf for S3 in the ionos cloud (former: profitbricks).

It took me some time to find these settings since
the howto page https://www.ionos.de/digitalguide/server/knowhow/datenmigration-mit-rclone/ didn't
not help much.

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

Obviously, you need replace the asterisks by your credentials.  

As an example where the config is used
see the following script to
backup the bucket the whole bucket to a directory `g1-fileshare`.
```
#!/bin/bash

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $DIR

rclone \
  --config $(realpath rclone.conf ) \
  sync ionos:g1-fileshare/ g1-fileshare/
```
