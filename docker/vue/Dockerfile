# Use Alpine Linux as our base image so that we minimize the overall size our final container, and minimize the surface area of packages that could be out of date.
#FROM alpine:3.7@sha256:5ce5f501c457015c4b91f91a15ac69157d9b06f1a75cf9107bf2b62e0843983a
#FROM node:10.19.0-alpine
#FROM node:14.0.0-alpine
#FROM node:14.18.2-alpine
FROM node:16-alpine3.14

#LABEL description="Docker container for building static sites with the Hugo static site generator."
#LABEL maintainer="Johannes Mitlmeier <dev.jojomi@yahoo.com>"
#
## config
#ENV HUGO_VERSION=0.46
## without SCSS/SASS support
#ENV HUGO_TYPE=
##ENV HUGO_TYPE=_extended
#
##COPY ./run.sh /run.sh
#ENV HUGO_ID=hugo${HUGO_TYPE}_${HUGO_VERSION}
#ADD https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_ID}_Linux-64bit.tar.gz /tmp
#RUN tar -xf /tmp/${HUGO_ID}_Linux-64bit.tar.gz -C /tmp \
#    && mkdir -p /usr/local/sbin \
#    && mv /tmp/hugo /usr/local/sbin/hugo \
#    && rm -rf /tmp/${HUGO_ID}_linux_amd64 \
#    && rm -rf /tmp/${HUGO_ID}_Linux-64bit.tar.gz \
#    && rm -rf /tmp/LICENSE.md \
#    && rm -rf /tmp/README.md
#
#RUN apk add --update git \
#    && apk upgrade \
#    && apk add --no-cache ca-certificates
#

RUN    apk upgrade \
    && apk add --no-cache vim bash

#RUN apk add --no-cache lynx
#
#VOLUME /src
#VOLUME /output

WORKDIR /ludwigprager

#EXPOSE 1313

# https://cli.vuejs.org/guide/installation.html
#RUN npm install -g @vue/cli

#RUN npm install @vue/cli   --location=global
#RUN npm install marked@2.0 --location=global
RUN npm install @vue/cli   --location=global
RUN npm install marked@2.0 --location=global

