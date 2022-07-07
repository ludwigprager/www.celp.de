# The Terraform Statefile in Public Clouds
    
## TL;DR

You have
1. a git repo with your IaC code
2. credentials that permit for using an account in GCP, Azure or AWS  

With those two assets perform two steps:

```
git clone <some git URL>
<the git repo name>/deploy.sh <some credentials>
```

This installs the infrastructure, builds and tests your app, promoting
through stages and eventually deploys to 'prod'.  
Perform these two steps in your team and in the CI/CD, in parallel, over and over and expect it to work.


## Now in more detail

It is best practise to use terraform in combination with a statefile.
The statefile holds references to all resources that are defined in the .tf files.
Terraform needs the list of resources and the references to decide what must to be
deleted or created or modified.  
The statefile should be in a remote place and prevent concurrent invocations.
Here, we assume an S3 bucket to be used as container that holds the statefile.

## How to create the remote statefile
Some people suggest to create the bucket also with the use of terraform.
But this leads to a hen-and-egg problem since you would need another statefile from this step.  
A better way is to use cloud-cli commands to test if the bucket already exists and create it if it doesn't.
This approach works in all the public clouds. I will show you in detail the commands and code for GCP, AWS, Azure.

## Scenarios
When running `terraform apply` exactly one of these three situations applies:
1. terraform was never run before. There is no remote statefile and no live resources.
2. terraform has run before but not in the environment where you are now. So there is a statefile in a remote place but not locally, in your directory. Hence, some initialisation is necessary.
3. terraform was run before in the same environment. The statefile exists remote and locally.

Now, regardless of which case applies we just want to run a command like
```
./deploy.sh <some credentials>
```
and expect the result the be the same, i.e. the resources created according to the .tf files and the statefile to
mirror the infrastructure.

# GCP
[How to use the terraform statefile: GCP](/terraform-statefile-gcp)  
[How to use the terraform statefile: AWS](/terraform-statefile-aws)  
[How to use the terraform statefile: Azure](/terraform-statefile-azure)  
