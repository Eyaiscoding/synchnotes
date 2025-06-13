# SynchNotes 📝

SynchNotes is a secure, cloud-native online collaboration tool developed during a DevSecOps internship project at RFC. It allows users to collaborate in real time on shared documents with built-in role management and secure access. This app was developed using a CI/CD pipeline integrated with robust security and monitoring tools on AWS.

## 🚀 Features

- Real-time document collaboration
- Signup/Login with role-based access
- Workspace and team management
- CI pipeline with Jenkins, SonarQube, OWASP DC, Trivy
- CD pipeline with ArgoCD (GitOps)
- Runtime secrets injection with AWS Secrets Manager
- Monitoring with Grafana, Prometheus, and Datadog
- Resilient deployment on AWS EKS

## 🧰 Tech Stack

- **Frontend:** HTML/CSS/JS 
- **Backend:** Node.js / Express 
- **Containerization:** Docker
- **CI/CD:** Jenkins, ArgoCD
- **Security:** SonarQube, Trivy, OWASP Dependency-Check
- **Secrets Management:** AWS Secrets Manager + ArgoCD Vault Plugin
- **Infrastructure:** Amazon EKS
- **Monitoring:** Prometheus, Grafana, Datadog

## 📦 CI/CD Pipeline Overview

1. Code pushed to GitHub
2. Jenkins triggers pipeline
3. Static & dependency scans (SonarQube, OWASP DC, Trivy)
4. Docker image build + push to ECR
5. ArgoCD syncs deployment on EKS
6. Secrets injected into pods securely

## 📸 Dashboards

- Jenkins Build Status
- ArgoCD Deployment Health
- SynchNotes Usage Stats
- Kubernetes Cluster Monitoring (Datadog, Grafana)

## 🔒 DevSecOps Focus

Security is integrated throughout the development lifecycle using:
- Code quality and vulnerability scans
- Secure image scanning
- Secrets management and injection
- Shift-left security testing

## 📄 License

This project is for educational and demonstration purposes only.

