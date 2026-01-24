# Netflix Clone on GKE – GitOps CI/CD & Disaster Recovery

## Project Overview
This project demonstrates a **production-ready CI/CD and Disaster Recovery (DR) workflow** by deploying a Netflix Clone application on **Google Kubernetes Engine (GKE)** using 
**GitOps principles**.
The solution automates infrastructure provisioning, container image delivery, application deployment, and disaster recovery. It is designed to simulate real-world DevOps challenges such as cluster failures, human error during deployments, and the need for fast, reliable recovery.

---

##  Problem Statement

Traditional manual deployments introduce several risks:

* Human error during application or infrastructure changes
* Lack of version control for Kubernetes manifests and infrastructure
* Difficult and slow recovery from namespace or cluster failures

This project addresses those problems by:

* Automating infrastructure provisioning
* Using Git as the single source of truth
* Implementing a tested disaster recovery strategy

---

## Project Goals

* Automate deployment of a containerized application
* Provision GKE infrastructure using Infrastructure as Code (IaC)
* Implement GitOps-based continuous delivery with Argo CD
* Store and version Kubernetes manifests in GitHub
* Push Docker images to Google Artifact Registry
* Back up and restore Kubernetes resources and persistent data
* Validate recovery by deleting and restoring a namespace or cluster

---

##  Architecture Overview

**Infrastructure Layer**

* GKE cluster provisioned with Terraform
* Google Artifact Registry for container images
* Google Cloud Storage (GCS) bucket for Velero backups

**CI/CD & GitOps Layer**

* GitHub Actions pipeline builds and pushes Docker images
* Kubernetes manifests stored in GitHub
* Argo CD continuously syncs manifests to GKE

**Disaster Recovery Layer**

* Velero configured with GCS
* Namespace-scoped backups
* Restore tested after deletion

---

## Technologies Used

| Category           | Tools                          |
| ------------------ | ------------------------------ |
| Cloud              | Google Cloud Platform (GCP)    |
| Kubernetes         | Google Kubernetes Engine (GKE) |
| IaC                | Terraform                      |
| CI                 | GitHub Actions                 |
| GitOps             | Argo CD                        |
| Container Registry | Google Artifact Registry       |
| Backup & DR        | Velero + GCS                   |
| Version Control    | Git & GitHub                   |
| Security           | Service Accounts & IAM         |

---

## Key Features

* **Infrastructure as Code**: GKE provisioned using Terraform
* **CI Pipeline**: Automated Docker image build and push via GitHub Actions
* **GitOps Deployment**: Argo CD synchronizes cluster state from GitHub
* **Namespace Isolation**: Application deployed in a dedicated namespace
* **Disaster Recovery**: Velero backups stored in GCS
* **Recovery Validation**: Namespace or cluster deletion followed by restore
* **Resource Optimization**: Manual CPU patching for small-node environments
* **Security**: Dedicated service accounts and least-privilege IAM roles

---

##  Workflow

1. Terraform provisions GKE infrastructure
2. Code push triggers GitHub Actions workflow
3. Docker image is built and pushed to Artifact Registry
4. Kubernetes manifests are updated in GitHub
5. Argo CD syncs manifests to GKE
6. Application runs in a dedicated namespace
7. Velero backs up namespace resources to GCS
8. Namespace or cluster is deleted (failure simulation)
9. Velero restores workloads and data successfully

---

##  Step-by-Step Implementation Guide

### Step 1: Prerequisites

Ensure you have the following installed and configured:

* Google Cloud SDK (`gcloud`)
* Terraform
* Docker
* kubectl
* Git
* GitHub account

Authenticate with GCP:

```bash
gcloud auth login
gcloud config set project <PROJECT_ID>
gcloud  auth  application-deafult login 
```

---

### Step 2: Provision GKE with Terraform

1. Navigate to the Terraform directory:

```bash
cd terraform
terraform init
terraform apply
```

Terraform provisions:

* GKE cluster
* Networking resources
* Required IAM roles and service accounts

**![Terraform  apply command](https://github.com/smogalloyubio/02-Devops-project-NetflixClone-app/blob/main/picture/Screenshot%202026-01-24%20at%2012.18.12.png):**



---

### Step 3: Build & Push Docker Image (CI Pipeline)

* GitHub Actions workflow builds the Docker image
* Image is tagged and pushed to Google Artifact Registry

Example Artifact Registry image format:

```text
REGION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE:TAG
```

**Screenshot placeholder:**

> Add screenshot of GitHub Actions successful pipeline run here

---

### Step 4: Configure Kubernetes Manifests

* Define Kubernetes YAML manifests:

  * Namespace
  * Deployment
  * Service
 

Apply namespace locally (optional validation):

```bash
kubectl apply -f k8s-manifests/namespace.yaml
```
**Screenshot placeholder:**

> Add screenshot of Kubernetes resources created here

---

### Step 5: Install and Configure Argo CD

Install Argo CD on GKE:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

* Create Argo CD Application pointing to GitHub repo
* Enable auto-sync

**Screenshot placeholder:**

> Add screenshot of Argo CD dashboard showing synced application

---

### Step 6: Deploy Application via GitOps

* Push Kubernetes manifest changes to GitHub
* Argo CD automatically deploys to GKE

Verify deployment:

```bash
kubectl get pods -n <APP_NAMESPACE>
```

📸 **Screenshot placeholder:**

> Add screenshot of running pods and services

---

### Step 7: Install and Configure Velero

Install Velero with GCS backend:

```bash
velero install \
  --provider gcp \
  --plugins velero/velero-plugin-for-gcp:v1.8.0 \
  --bucket <GCS_BUCKET_NAME> \
  --secret-file ./credentials-velero
```

📸 **Screenshot placeholder:**

> Add screenshot of Velero pods running

---

### Step 8: Backup Application Namespace

Create a namespace-scoped backup:

```bash
velero backup create netflix-backup --include-namespaces <APP_NAMESPACE>
```

Check backup status:

```bash
velero backup get
```

📸 **Screenshot placeholder:**

> Add screenshot of successful Velero backup

---

### Step 9: Disaster Simulation

* Delete the application namespace or entire cluster

```bash
kubectl delete namespace <APP_NAMESPACE>
```

📸 **Screenshot placeholder:**

> Add screenshot showing namespace deletion

---

### Step 10: Restore from Backup

Restore the backup:

```bash
velero restore create --from-backup netflix-backup
```

Verify restore:

```bash
kubectl get all -n <APP_NAMESPACE>
```

📸 **Screenshot placeholder:**

> Add screenshot showing restored application

---

## 📂 Repository Structure

```
.
├── terraform/          # GKE infrastructure provisioning
├── app/                # Netflix clone application source
├── .github/workflows/  # GitHub Actions CI pipeline
├── k8s-manifests/      # Kubernetes YAML files
├── argocd/             # Argo CD application definitions
├── velero/             # Backup and restore configs
└── README.md
```

---

## 🧪 Disaster Recovery Test

* Created a Velero backup for the application namespace
* Deleted the namespace / cluster
* Restored from backup stored in GCS
* Verified:

  * Pods recreated successfully
  * Services accessible
  * Application functional after restore

---

## 🔐 Security Considerations

* IAM roles follow least-privilege principle
* Service accounts scoped per component
* No secrets stored in Git
* GitOps provides full audit trail

---

## 📈 Future Improvements

* Automated Velero backup schedules
* Terraform remote state in GCS
* Workload Identity for GKE
* Sealed Secrets for secret management
* Canary or blue/green deployments
* Monitoring with Prometheus and Grafana

---

## skills Demonstrated

* Kubernetes operations on GKE
* Infrastructure as Code with Terraform
* CI/CD pipeline design
* GitOps with Argo CD
* Disaster recovery planning and testing
* Cloud IAM and security best practices

---

## Conclusion

This project showcases a **real-world, production-style Kubernetes platform** with automated delivery and tested disaster recovery. It reflects practical DevOps and SRE workflows used in modern cloud-native environments.

---

## 👤 Author

**Your Name**
DevOps / Cloud Engineer

