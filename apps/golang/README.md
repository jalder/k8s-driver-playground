This App example runs an infinite loop that performs the following tasks on a namespace called `golang.tour` in a MongoDB deployment:
1. Drop the collection
1. Insert a single document
1. Insert multiple documents (2 to be precise)
1. Run a find and iterate over the inserted docs
1. Run an aggregation pipeline
1. Sleep for 5 seconds
1. GOTO 1

To get started, follow the below steps
1. Build the image:
   ```
   docker build . -t go-demo-app
   ```
1. Set an environment variable locally for the MongoDB URI:
   ```
   export URI=<place your MongoDB URI here>
   ```
1. Run the built image passing the $URI env variable to the container:
   ```
   docker run --env URI=$URI -tih goapp go-demo-app
   ```