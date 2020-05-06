# Headless Automation Basics

Simple 3 member statefulset in Kubernetes.  Using the Ops Manager k8s headless appDB images as a starting point.

## TLS Certificates

We will generate CSR with cfssl and send it to the k8s API for signing.

### 1. Download cfssl
```
curl -L https://github.com/cloudflare/cfssl/releases/download/v1.4.1/cfssl_1.4.1_linux_amd64 -o cfssl
chmod +x cfssl
curl -L https://github.com/cloudflare/cfssl/releases/download/v1.4.1/cfssljson_1.4.1_linux_amd64 -o cfssljson
chmod +x cfssljson
```

### 2. Create cfssl templates
```
./cfssl print-defaults config > ssl-config.json
./cfssl print-defaults csr > ssl-csr.json
```

Modify the ssl-csr.json to include all cluster hostnames and node hostnames (for Ingress/split-horizon)

### 3. Generate the csr and send to k8s
```
./cfssl genkey ssl-csr.json | ./cfssljson -bare server
```

```
cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1beta1
kind: CertificateSigningRequest
metadata:
  name: test-db-svc.mongodb
spec:
  request: $(cat server.csr | base64 | tr -d '\n')
  usages:
  - digital signature
  - key encipherment
  - server auth
  - client auth
EOF
```

```
kubectl get csr
kubectl certificate approve test-db-svc.mongodb
```

```
kubectl get csr test-db-svc.mongodb -o jsonpath='{.status.certificate}' \
    | base64 --decode > server.crt
```

```
cat server.crt server-key.pem > server.pem
```

### 4. Create the secret containing the pemkey

```
kubectl create secret generic server-pem --from-file=./server.pem
```

# The next sections need review and details about jq

## Edit and Deploy

```
vi cluster-config.pretty.json
jq -c '.' cluster-config.pretty.json > cluster-config.json
kubectl create configmap test-db-config --from-file=./cluster-config.json
```

```
kubectl apply -f test-db-svc.yaml
kubectl apply -f test-db.yaml
kubectl apply -f test-db-nodeports.yaml
```

## Connect

```
~/Downloads/mongodb-linux-x86_64-4.0.10/bin/mongo --host test-db/oc01.jalder.net:30017,oc02.jalder.net:30018,oc03.jalder.net:30019
```

