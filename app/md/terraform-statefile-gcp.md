
# How To Use The Terraform Statefile In The GCP Cloud.

This is the GCP part of 
[this post](/terraform-statefile)  


## 20-tf-backend/set-env.sh 
First, a file that holds settings and variables. In this case it it's just one.
But your project will grow and this is a good place.
```
#!/usr/bin/env bash

# choose arbitrary but unique prefix
# (since it's used for the bucket name, too):

MY_PREFIX=gtb-20211221-lp
export BUCKET_NAME="${MY_PREFIX}-bucket"
export TF_VAR_network_name="celp-network-01"
export TF_VAR_subnetwork_name="celp-subnetwork"
export TF_VAR_project_id="celp-test-335521"

```

## 20-tf-backend/10-create.sh 
```
#!/usr/bin/env bash

set -eu
set -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
source ./set-env.sh

export CLOUDSDK_CORE_PROJECT=${TF_VAR_project_id}

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


if bucket-exists "${BUCKET_NAME}"  ; then 
  echo bucket ${BUCKET_NAME} already exists
else
  echo creating bucket ${BUCKET_NAME}
  gsutil mb gs://${BUCKET_NAME}
fi
```

## 30-main/backend.tf 
```
terraform {
  backend "gcs" {
    prefix  = "gke-via-modules"
  }
}
```

## 30-main/provider.tf 
```
provider "google" {
  project     = var.project_id
  region      = var.region
}
```

## 30-main/network.tf 
```
module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "3.5.0"

  network_name = var.network_name
  project_id   = var.project_id

  subnets = [
    {
      subnet_name           = var.subnetwork_name
      subnet_ip             = var.cidr
      subnet_region         = var.region
      subnet_private_access = true
      description           = "This subnet is managed by Terraform"
    }
  ]

  secondary_ranges = {
    (var.subnetwork_name) = [
      {
                range_name    = "my-pods-tf"
                ip_cidr_range = "10.11.0.0/16"
      },
      {
                range_name    = "my-services-tf"
                ip_cidr_range = "10.12.0.0/16"
      },
    ]
  }
}
```
## 30-main/network-variables.tf 
```
variable "network_name" {
  type    = string
}

variable "subnetwork_name" {
  type    = string
}

variable "cidr" {
  default     = "10.16.0.0/16"
}
```

## 30-main/10-apply.sh 
```
#!/usr/bin/env bash

set -eu
set -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

source ../20-tf-backend/set-env.sh

export TF_VAR_region="eu-central-1"

terraform init \
  -input=false \
  -backend-config="bucket=${BUCKET_NAME}"

terraform apply -auto-approve
```

## 10-deploy.sh
Finally, here is the deploy script I mentioned [in the beginning.](/terraform-statefile)  

You pass it a key file to authenticate against GCP.

This script can be called over and over, from different persons and
in a CI/CD pipeline and will always create the VCP like it its defined in the git.
```
#!/usr/bin/env bash

set -eu
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

local KEY_FILE=$(realpath $1)
gcloud auth activate-service-account --key-file=${KEY_FILE}
export GOOGLE_APPLICATION_CREDENTIALS=${KEY_FILE}

./20-tf-backend/10-create.sh
./30-main/10-apply.sh $*
```

## 30-main/90-destroy.sh 
This file will destroy the vpc. Try to run this script
and then again the 30-main/10-apply.sh.
```
#!/usr/bin/env bash

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

source ../20-tf-backend/set-env.sh

terraform init \
  -input=false \
  -backend-config="bucket=${BUCKET_NAME}"

terraform destroy -auto-approve
```
## File Tree
This is the file tree for the whole scenario.
```
├── 10-apply.sh
├── 20-tf-backend
│   ├── 10-create.sh
│   └── set-env.sh
├── 30-main
│   ├── 10-apply.sh
│   ├── 90-destroy.sh
│   ├── backend.tf
│   ├── network.tf
│   ├── network-variables.tf
│   ├── provider.tf
├── 90-teardown.sh
└── set-env.sh
```


