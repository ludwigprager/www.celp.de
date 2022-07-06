#!/bin/bash

set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${BASEDIR}

./develop.sh ./install_modules.sh
./develop.sh npm run lint
./develop.sh npm run build

rsync  -av --delete app/dist/ root@ionos1.celp.de:/var/www/celp.de/
rsync  -av --delete ./htaccess root@ionos1.celp.de:/var/www/celp.de/.htaccess
rsync  -av --delete ./sitemap.xml ./robots.txt root@ionos1.celp.de:/var/www/celp.de/

