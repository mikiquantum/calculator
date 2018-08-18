#!/usr/bin/env bash

echo "Installing kubectl + Config - Build custom image"
apk update  && apk add --no-cache curl
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl && mv ./kubectl /usr/local/bin/kubectl
mkdir -p $HOME/.kube
echo -n $KUBE_CONFIG | base64 -d > $HOME/.kube/config

echo "Performing Deploy"
kubectl apply -f deployment/deployment.yaml