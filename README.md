# 📝 SynchNotes – Real-time Collaboration App

SynchNotes is a secure, cloud-native online collaboration tool developed as part of a DevSecOps internship project. It enables real-time document editing and workspace collaboration, built and deployed using modern cloud-native tools and DevSecOps practices.

---

## 🚀 Features

- Real-time collaborative document editing with live cursors
- Workspace and user management (Free & Pro plans)
- Secure authentication and secrets management
- Role-based access control
- Integrated CI/CD pipeline (Jenkins + ArgoCD)
- Deployed on AWS EKS with GitOps and DevSecOps principles
- Full monitoring stack (Grafana, Prometheus, Datadog)

---

## 🧰 Tech Stack

| Layer            | Technologies Used |
|------------------|-------------------|
| **Frontend**     | Next.js 13, Tailwind CSS |
| **Realtime**     | WebSockets, Supabase Realtime, Cursor Sync |
| **Backend**      | Supabase (PostgreSQL + Auth), Drizzle ORM |
| **Payments**     | Stripe |
| **CI/CD**        | GitHub → Jenkins (CI) → ArgoCD (CD) |
| **Security**     | SonarQube, Trivy, OWASP DC, AWS Secrets Manager |
| **Monitoring**   | Prometheus, Grafana, Datadog |
| **Infrastructure** | AWS EKS (via Terraform) |

---

## 🔐 DevSecOps Integration

- Static & dynamic security scans (SonarQube, OWASP, Trivy)
- CI/CD pipeline with vulnerability checks and secure image builds
- Secrets injected at runtime using AWS Secrets Manager
- GitOps-powered deployments with ArgoCD

---

## 📦 CI/CD Pipeline Flow

1. Code push triggers Jenkins pipeline via GitHub webhook
2. Static code analysis and security scans run
3. Docker image is built and pushed to Amazon ECR
4. ArgoCD syncs latest manifest and deploys to AWS EKS
5. Secrets are fetched and injected via ArgoCD Vault Plugin
6. Metrics and logs collected via Prometheus & Datadog

---

## 📸 Dashboards

- Jenkins CI status
- ArgoCD sync health
- SynchNotes usage and error metrics
- EKS cluster node, service, and pod monitoring

---

## 📄 License

This project was developed for academic and demonstration purposes.

