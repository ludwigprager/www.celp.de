#!/usr/bin/env bash

set -eu
set -o pipefail

BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${BASEDIR}

TARGET_DIR=src/assets/generated/

POSTS="p1 presentation gdpr imprint ref blog terraform-statefile rclone-ionos"
POSTS="${POSTS} terraform-statefile-gcp"
POSTS="${POSTS} terraform-statefile-aws"
POSTS="${POSTS} terraform-statefile-azure"

mkdir -p ${TARGET_DIR}
for post in ${POSTS}; do
  page=${TARGET_DIR}/${post}.html

  echo '<div id="markdown">' > $page
  echo '  <section class="markdown">' >> $page

  #cat ./md/${post}.md | marked --mangle --gfm >> $page
  cat ./md/${post}.md | marked >> $page

  echo '  </section>' >> $page
  echo '</div>' >> $page

done


