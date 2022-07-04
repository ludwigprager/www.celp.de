#!/usr/bin/env bash

set -eu
set -o pipefail

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${BASEDIR}

TARGET_DIR=src/assets/generated/

mkdir -p ${TARGET_DIR}
for name in p1 presentation gdpr imprint ref blog terraform-statefile rclone-ionos; do
  page=${TARGET_DIR}/${name}.html

  echo '<div id="markdown">' > $page
  echo '  <section class="markdown">' >> $page

  #cat ./md/${name}.md | marked --mangle --gfm >> $page
  cat ./md/${name}.md | marked >> $page

  echo '  </section>' >> $page
  echo '</div>' >> $page

done


