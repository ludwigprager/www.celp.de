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


TARGET_DIR=src/assets/generated/

mkdir -p ${TARGET_DIR}
for name in p1 presentation gdpr imprint ref terraform-statefile; do
  page=${TARGET_DIR}/${name}.html

  echo '<div id="markdown">' > $page
  echo '  <section class="markdown">' >> $page

  #cat ./md/${name}.md | marked --mangle --gfm >> $page
  cat ./md/${name}.md | marked >> $page

  echo '  </section>' >> $page
  echo '</div>' >> $page

done


