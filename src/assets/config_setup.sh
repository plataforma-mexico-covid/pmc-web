#!/bin/sh

echo "setup config files"

rm -rf /usr/share/nginx/html/covid19/assets/config.json

mv /usr/share/nginx/html/covid19/assets/config_${SECRET_ENVIRONMENT}.json /usr/share/nginx/html/covid19/assets/config.json

rm -rf /usr/share/nginx/html/covid19/assets/config_*.json