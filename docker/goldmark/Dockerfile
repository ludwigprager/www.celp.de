FROM golang:1.18

#WORKDIR /usr/src/app
WORKDIR /ludwigprager/

#RUN    apk upgrade \
#    && apk add --no-cache vim bash

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
#COPY go.mod go.sum ./
#RUN go mod download && go mod verify

#COPY . .
#RUN go build -v -o /usr/local/bin/app ./...

#RUN go get github.com/yuin/goldmark

#CMD ["app"]
#CMD ["app"]

RUN go install github.com/kpym/gm@latest

