#!/usr/bin/env bash

set -eu
set -o pipefail

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${BASEDIR}

if [[ ! -d node_modules ]]; then
  npm install
else
  echo "node_modules found -> no install"
fi

