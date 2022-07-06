
# GCP

This is the GCP part of 
[this post](/terraform-statefile)  


## gke-tf/20-tf-backend/set-env.sh 
```
#!/usr/bin/env bash

# choose arbitrary but unique prefix (since it's used for the bucket name, too):
MY_PREFIX=gtb-20211221-lp

export BUCKET_NAME="${MY_PREFIX}-bucket"
export TF_VAR_backend_region="eu-central-1"
export TF_VAR_prefix=${MY_PREFIX}
```

## gke-tf/20-tf-backend/functions.sh 
```
#!/usr/bin/env bash

function bucket-exists() {
  local bucket_name=$1

  result=$(gsutil  ls | grep -Fx gs://${bucket_name}/)
  if [[ "$result" == "gs://${bucket_name}/" ]]; then
    # 0 = true
    return 0 
  else
    # 1 = false
    return 1
  fi

}

export -f bucket-exists
```
## 20-tf-backend/10-create.sh 
```
#!/usr/bin/env bash

#set -x

set -eu
set -o pipefail


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
source ../../set-env.sh
source ../set-env.sh
source ./set-env.sh
source ./functions.sh

export CLOUDSDK_CORE_PROJECT=${TF_VAR_project_id}

#result=$(bucket-exists "${BUCKET_NAME}")
if bucket-exists "${BUCKET_NAME}"  ; then 
  echo bucket ${BUCKET_NAME} already exists
else
  echo creating bucket ${BUCKET_NAME}
  gsutil mb gs://${BUCKET_NAME}
fi
```

## File Tree
This is the file tree for the whole scenario.
```
lprager@d01:~/work/cyagame/IaC/gke-tf$ tree
.
├── 10-apply.sh
├── 20-tf-backend
│   ├── 10-create.sh
│   ├── 90-destroy.sh
│   ├── functions.sh
│   └── set-env.sh
├── 30-main
│   ├── 10-apply.sh
│   ├── 90-destroy.sh
│   ├── backend.tf
│   ├── gke.tf
│   ├── gke-variables.tf
│   ├── jumphost.tf
│   ├── jumphost-variables.tf
│   ├── network.tf
│   ├── network-variables.tf
│   ├── outputs.tf
│   ├── provider.tf
│   ├── registry.tf
│   ├── sa_cya_ci_id_rsa.pub
│   └── service-account.tf
├── 90-teardown.sh
└── set-env.sh

```


