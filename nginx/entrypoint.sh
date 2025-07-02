#!/bin/sh
envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
sed -e "s/_host/\$host/g" -e "s/_remote_addr/\$remote_addr/g" -e "s/_proxy_add_x_forwarded_for/\$proxy_add_x_forwarded_for/g" -e "s/_schema/\$schema/g" /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'