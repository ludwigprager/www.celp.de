# The Terraform Statefile when deploying Infrastructure for Public Clouds

It is best practise to use terraform in combination with a statefile.
The statefile should be in a remote place and prevent concurrent invocations.
Here, we assume an S3 bucket to be used as container.

## How to create the remote statefile
Some suggest to create the bucket with terraform, too. But this is a hen-and-egg problem.
A better way is to use cloud-cli commands to test if the bucket already exists and create it if it doesn't.
This approach works in all of the public clouds an we'll see in detail how for AWS, Azure and GCP.

When running `terraform apply` one of these three situations applies:
1. terraform was never run before. There is no remote statefile and of course no resources.
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
