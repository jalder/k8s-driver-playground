FROM golang:latest
WORKDIR /
COPY go.mod ./
RUN go mod download
COPY main.go ./
RUN go build -o demo-app .
ENTRYPOINT ./demo-app