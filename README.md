# ResiScale-Ops: Cloud-Native CI/CD & GitOps Pipeline

Este projeto demonstra a arquitetura e implementação de um ecossistema *cloud-native* completo rodando em ambiente local (**Minikube/Kubernetes**), cobrindo desde a containerização da aplicação até a automação total de **CI/CD**, **GitOps** e **Observabilidade**.

---

## Tech Stack & Ferramentas

- **Orquestração:** Kubernetes (Minikube)
- **Containerização:** Docker
- **Registry:** GitHub Container Registry (GHCR)
- **CI/CD Automatizado:** GitHub Actions
- **GitOps & Continuous Deployment:** ArgoCD
- **Gerenciamento de Pacotes:** Helm
- **Observabilidade & Métricas:** Prometheus & Grafana
- **Linguagem/App:** Node.js (REST API com endpoints de health)

---

## Fluxo da Pipeline (CI/CD + GitOps)

1. **CI (GitHub Actions):** Cada `git push` na branch `main` dispara a pipeline que compila a aplicação Node.js, empacota a imagem Docker e faz o envio para o **GHCR**.
2. **Auto-Update de Manifestos:** A pipeline atualiza dinamicamente a tag da imagem no manifesto `gitops/deployment.yaml` com a hash do commit (`github.sha`) e envia a alteração de volta ao repositório.
3. **CD (ArgoCD):** O ArgoCD deteta a atualização no repositório Git e sincroniza o cluster Kubernetes automaticamente (*Rolling Update* sem downtime).

---

## Como Executar o Projeto Localmente

### Pré-requisitos
- Docker Desktop
- Minikube & kubectl
- Helm v3+

### 1. Iniciar o Cluster e ArgoCD
```bash
# Iniciar o cluster Kubernetes
minikube start --cpus=2 --memory=4096

# Instalar o ArgoCD e aplicar a aplicação GitOps
kubectl create namespace argocd
kubectl apply -n argocd -f [https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml](https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml)
kubectl apply -f argocd-app.yaml

# Adicionar repositório do Prometheus e instalar Grafana + Prometheus
helm repo add prometheus-community [https://prometheus-community.github.io/helm-charts](https://prometheus-community.github.io/helm-charts)
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace

2. Instalar a Stack de Observabilidade
Bash
# Adicionar repositório do Prometheus e instalar Grafana + Prometheus
helm repo add prometheus-community [https://prometheus-community.github.io/helm-charts](https://prometheus-community.github.io/helm-charts)
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
Acesso às Interfaces
Execute os comandos abaixo em terminais separados para liberar o acesso local:

ArgoCD (GitOps):

Bash
kubectl port-forward svc/argocd-server -n argocd 8090:443
Acesse em: https://localhost:8090

Grafana (Dashboards & Observabilidade):

Bash
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80
Acesse em: http://localhost:3000

