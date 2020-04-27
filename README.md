# k8s-driver-playground
Grouping of different scenarios/use-cases for MongoDB Drivers to interact with MongoDB processes within, inside or outside K8s.

Use-cases:
* App running in ECS interacting with a MongoDB Atlas deployment.
* App running in a pod + mongos sidecar contacting a Sharded Cluster deployed in EC2.
* App runing in a EC2 instance or locally without containers with MongoDB deployment running in a Kubernetes Cluster - k3d on a EC2 instance for simplification.
* App running in a pod without sidecar interacting to MongoDB deployment in Kubernetes all in the same place.
