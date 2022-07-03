# POC 1: "Data service" style

Find the other PoCs via the [parent ticket](https://dev.azure.com/RWEST-MFI-AU/UK%20Power/_workitems/edit/2985).  
Remark: place comments only in the [ticket](https://dev.azure.com/RWEST-MFI-AU/UK%20Power/_workitems/edit/2986)
rather than in the [wiki](https://dev.azure.com/RWEST-MFI-AU/Common/_wiki/wikis/Common.wiki/88/Kubernetes-PoC)  


## Test Program
A web server listens on port 80. On request it queries an oracle database and returns the result in an html page.  
The path in the REST url is processed [in the code](/poc1/docker/poc1.py)

Currently, the containers can be reached in the browser via these URLs:
- http://internal-a5e9d4ab256744c1f96dac1002d61358-1469812703.eu-central-1.elb.amazonaws.com/
- http://internal-a5e9d4ab256744c1f96dac1002d61358-1469812703.eu-central-1.elb.amazonaws.com/healthz
- http://internal-a5e9d4ab256744c1f96dac1002d61358-1469812703.eu-central-1.elb.amazonaws.com/date

But once the load balancer is recreated you need to read the DNS name from the service.    
Get the DNS address:  
```
POC1_HOSTNAME=$( k get svc poc1 -o json | jq -r .status.loadBalancer.ingress[].hostname )
```

and construct the REST paths:
- `http://${POC1_HOSTNAME}/`
- `http://${POC1_HOSTNAME}/healthz`
- `http://${POC1_HOSTNAME}/date`

## Kubernetes
A container orchestration system.  
https://kubernetes.io/docs/concepts/overview/components/

### K8s Manifests
- [deployment](/poc1/k8s/manifest/deployment.yaml)
- [service](/poc1/k8s/manifest/service.yaml)

---

## Demo 1: Zero Downtime Manual Deployment
Imagine you have a fully automatic delivery pipeline. A code change finally
leads to a roll out of a new version during business hours.  
This demo shows an upgrade without service interruption.

Window 1 - Watch the deployment serving requests continuously:
```
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
source functions.sh 
assume-cicd-role  $ENV_ACCOUNT_ID 

KUBECONFIG=$(realpath poc1/k8s/kubeconfig)
POC1_HOSTNAME=$( k get svc poc1 -o json | jq -r .status.loadBalancer.ingress[].hostname )

while true; do
  kubectl exec -ti busybox -- wget -q http://${POC1_HOSTNAME}  -O-;
  kubectl exec -ti busybox -- wget -q http://${POC1_HOSTNAME}/date  -O-;
  echo
done
```

Window 2 - Watch the pods running and restarting
```
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
source functions.sh 
assume-cicd-role  $ENV_ACCOUNT_ID 

KUBECONFIG=$(realpath poc1/k8s/kubeconfig)
watch kubectl get po -l app=poc1
```

Window 3 - Run a deployment restarting all the pods:  
```
unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
./poc1/10-deploy.sh $ENV_ACCOUNT_ID
```

---

## Terraform Code
- [Cluster](/aws-terraform-eks/30-main/main.tf)
- [Load Balancer](/aws-terraform-eks/30-main/tag.tf)
- [Registry (ECR)](/poc1/30-main/main.tf)

### Alive Resources in AWS
Currently, resources run in the non-prod account, only. Use the *prod account id* to deploy to prod, too.  

- cluster https://eu-central-1.console.aws.amazon.com/eks/home?region=eu-central-1#/clusters  
- EC2 https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#Instances:instanceState=running  
- ELB
- Registry https://eu-central-1.console.aws.amazon.com/ecr/repositories?region=eu-central-1
- S3  https://s3.console.aws.amazon.com/s3/home?region=eu-central-1#
- DynamoDB https://eu-central-1.console.aws.amazon.com/dynamodbv2/home?region=eu-central-1#tables

## Pipeline
- [code for the EKS cluster](/aws-terraform-eks/pipeline.yaml)
- [code k8s deployment](/poc1/pipeline.yaml)
- [in Azure DevOps](https://dev.azure.com/RWEST-MFI-AG/DevOps%20Transition/_build?definitionId=350)

---

## Demo 2: Zero Downtime Deployment using Pipelines

Unlike in the previous demo let's modify the code, push it to the git server.

Modify [the python code](/poc1/docker/poc1.py) to print `PPPPP` instead of `PoC 1` and push the changes to
the git server. Watch the output change over time in 'Window 1'.  

```
sed -i 's/PoC 1/PPPPP/' poc1/docker/poc1.py
git commit -m"modifies output: 'PoC 1' -> PPPPP" ./poc1/docker/poc1.py 
git push origin
```
This pipeline takes considerably more time than the CLI procedure.  
Also, on the command line we might only run the necessary steps which would make it even faster.

Check out and deploy the previous commit to revert the change quickly:

```
git checkout HEAD^

unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN
./poc1/10-deploy.sh $ENV_ACCOUNT_ID
```

Of course, our local git is not in sync with the server anymore.

---

## A few commands
See the cluster nodes:  
```
lprager@l02:~/work/rwe/dot/git/dot/poc1$ k get nodes
NAME                                             STATUS   ROLES    AGE     VERSION
ip-10-44-161-162.eu-central-1.compute.internal   Ready    <none>   5d18h   v1.21.4-eks-033ce7e
```

Run the test script:
```
lprager@l02:~/work/rwe/dot/git/dot$ ./poc1/40-test.sh $ENV_ACCOUNT_ID 
<html> <head><title>PoC 1</title> </head> <body><p>10/25/2021, 08:48:18</p></body></html>
```

Create or update the EKS cluster:
```
lprager@l02:~/work/rwe/dot/git/dot$ ./aws-terraform-eks/10-deploy.sh $ENV_ACCOUNT_ID 
```

Create or update only the PoC1 resources:
```
lprager@l02:~/work/rwe/dot/git/dot$ ./poc1/10-deploy.sh $ENV_ACCOUNT_ID 
```

