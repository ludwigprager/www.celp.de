# The Terraform Statefile on GCP

## File Tree
```
lprager@d01:~/work/cyagame/IaC/gke-tf$ tree
.
├── 10-apply.sh
├── 20-tf-backend
│   ├── 10-create.sh
│   ├── 90-destroy.sh
│   ├── functions.sh
│   ├── notes.md
│   ├── README.md
│   └── set-env.sh
├── 30-main
│   ├── 10-apply.sh
│   ├── 90-destroy.sh
│   ├── apis.tf.disabled
│   ├── backend.tf
│   ├── gke.tf
│   ├── gke-variables.tf
│   ├── jumphost.tf
│   ├── jumphost-variables.tf
│   ├── network.tf
│   ├── network-variables.tf
│   ├── notes
│   ├── outputs.tf
│   ├── provider.tf
│   ├── README.md
│   ├── registry.tf
│   ├── sa_cya_ci_id_rsa.pub
│   └── service-account.tf
├── 90-teardown.sh
├── notes
└── set-env.sh

```

## 20-tf-backend/10-create.sh 
```
#!/usr/bin/env bash

#set -x

set -eu
set -o pipefail


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
source ../../functions.sh
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

## The sample application: Sentiment Analysis

```
CONTAINER ID   IMAGE                  COMMAND        NAMES
2974301ffa31   kindest/node:v1.23.1   "/usr/loca…"   kind-control-plane
```

We’ll run the microservice application used in my Kubernetes introductory article . It’s complex enough to showcase Istio’s features in practice. 

