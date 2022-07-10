
# The Terraform Statefile GCP

This is part 2 of 
[this post](/terraform-statefile) and covers GCP.  
You find the complete [code on github](https://github.com/ludwigprager/gcp-terraform-base).


## TL;DR
1. Set your project id
[`CLOUDSDK_CORE_PROJECT`](https://github.com/ludwigprager/gcp-terraform-base/blob/main/set-env.sh#L6)
and a globally unique
[`BUCKET_NAME`](https://github.com/ludwigprager/gcp-terraform-base/blob/main/set-env.sh#L11)
in
[`set-env.sh`](https://github.com/ludwigprager/gcp-terraform-base/blob/main/set-env.sh).
2. Run
       ./10-deploy.sh

## Overview
This is a compact project that lets you test an GCP setup with terraform.
It essentially consists of a one-button process.
Also
- the terraform state will be stored in a S3 bucket.
- all steps are idempotent
- a script to clean up is provided
- serves as an ideal starting point for a production project

## Description
The setup consists of three steps:
1. Authentication by running `gcloud auth login`
2. Creation of the backend storage: [20-backend/10-create.sh](https://github.com/ludwigprager/gcp-terraform-base/blob/main/20-tf-backend/10-create.sh)
  This step prepares the remote state. It creates a S3 bucket.
3. Application of your IaC: [30-main/10-apply.sh](https://github.com/ludwigprager/gcp-terraform-base/blob/main/30-main/10-apply.sh)



## 10-deploy.sh
Here is
<!-- the deploy script I mentioned [in the beginning](/terraform-statefile)
and
-->
the entry point of this little project.

<!--
You pass it a key file to authenticate against GCP.
-->

This script can be called over and over, from different persons and
in a CI/CD pipeline and will always create the VPC like it its defined in the git.  
```
#!/usr/bin/env bash
set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BASEDIR

./20-tf-backend/10-create.sh
./30-main/10-apply.sh
```



<!--
## 20-tf-backend/set-env.sh 
Next, a file that holds settings and variables.  
`BUCKET_NAME` needs to be worldwide unique. Hence, choose `MY_PREFIX`
accordingly.  
`TF_VAR_project_id` must contain the name of your GCP project.
`TF_VAR_network_name` and `TF_VAR_subnetwork_name` are arbitrary strings.

```
#!/usr/bin/env bash

MY_PREFIX=gtb-20211221-lp
export BUCKET_NAME="${MY_PREFIX}-bucket"
export TF_VAR_project_id="celp-test-335521"
export TF_VAR_network_name="celp-network-01"
export TF_VAR_subnetwork_name="celp-subnetwork"
```
-->

## 20-tf-backend/10-create.sh 
This script creates the container for the statefile if it doesn't already exist.
```
#!/usr/bin/env bash

set -eu
set -o pipefail

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BASEDIR
source ../set-env.sh

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

## 30-main/10-apply.sh:
This is the core script of this Part.
It assumes everything is ready to initialise and run terraform.
The `terraform init` is idempotent and won't do much a second time.
But the `apply` will modify all resources according to the .tf files.
```
#!/usr/bin/env bash

set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BASEDIR

source ../set-env.sh
source ./set-env.sh

terraform init \
  -input=false \
  -backend-config="bucket=${BUCKET_NAME}"

terraform apply -auto-approve
```


## The .tf files
These files contain the definition of resources that terraform is supposed to create.  

30-main/backend.tf:
```
terraform {
  backend "gcs" {
    # unique name to identify the file within the bucket
    prefix  = "my-tf-prefix"
  }
}
```

30-main/provider.tf:
```
provider "google" {
  project     = var.project_id
  region      = var.region
}
```

30-main/network.tf:
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
30-main/network-variables.tf:
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

<!--
## 30-main/90-destroy.sh 
For completeness, this file will destroy the all resources. Try to run this script
and then again the 30-main/10-apply.sh.
```
#!/usr/bin/env bash

set -eu

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $BASEDIR

source ../set-env.sh
source ./set-env.sh

terraform init \
  -input=false \
  -backend-config="bucket=${BUCKET_NAME}"

terraform destroy -auto-approve
```

## File Tree
This is the file tree for the whole scenario.
```
├── 10-deploy.sh
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
-->


