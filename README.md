# Assignment 08 - Kubernetes con Minikube

## Aplicación desplegada

![App](docs/appt.png)

URL: http://app.carmen-crisostomo.com:30879

## ArgoCD

![ArgoCD](docs/argo.png)

URL: http://argo.carmen-crisostomo.com:30879

## Configuración DNS local

192.168.49.2 app.carmen-crisostomo.com
192.168.49.2 argo.carmen-crisostomo.com

## Manifiestos

- k8s/app/deployment.yaml - Deployment y Service de la app
- k8s/app/ingressroute.yaml - IngressRoute de la app
- k8s/argocd/ingressroute.yaml - IngressRoute de ArgoCD
- k8s/traefik/clusterrole.yaml - ClusterRole de Traefik

## Comandos ejecutados

minikube start --driver=docker --cpus=2 --memory=4096
kubectl create namespace traefik
helm install traefik traefik/traefik --namespace traefik
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
eval $(minikube docker-env)
docker build -t mi-app:latest .
kubectl apply -f k8s/app/deployment.yaml
kubectl apply -f k8s/app/ingressroute.yaml
kubectl apply -f k8s/argocd/ingressroute.yaml
kubectl apply -f k8s/traefik/clusterrole.yaml
echo "$(minikube ip) app.carmen-crisostomo.com" | sudo tee -a /etc/hosts
echo "$(minikube ip) argo.carmen-crisostomo.com" | sudo tee -a /etc/hosts
