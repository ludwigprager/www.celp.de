#!/usr/bin/env bash

set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${BASEDIR}

VUE_IMAGE=ludwigprager/vue:1
docker build -t ${VUE_IMAGE} docker/vue/

if [[ $# -lt 1 ]]; then
  docker rm -f vue

  docker run -ti --rm \
    -p 8080:8080 \
    --name vue \
    --volume $(pwd)/app/:/ludwigprager \
    ${VUE_IMAGE} \
    CMD='./start.sh'

else

  docker run -ti --rm \
    --volume $(pwd)/app/:/ludwigprager \
    ${VUE_IMAGE} \
    $*

fi
