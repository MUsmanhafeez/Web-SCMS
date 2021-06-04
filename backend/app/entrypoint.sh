#!/bin/sh
umask 000

if test ! -d ./node_modules; then
    echo "Installing node modules"
    if test ! -f ./package-lock.json; then
        npm i;
    else
        npm ci; 
    fi;
else
    echo "Node modules directory already exsist, skipping 'npm i'"
fi;

# Waiting for DB
echo "Waiting for postgres (${ASP_POSTGRES_HOST}:${ASP_POSTGRES_PORT:-5432})..."
while ! nc -z ${ASP_POSTGRES_HOST} ${ASP_POSTGRES_PORT:-5432}; do sleep 1; done;


echo "Waiting for redis (${ASP_REDIS_HOST}:${ASP_REDIS_PORT:-6379})..."
while ! nc -z ${ASP_REDIS_HOST} ${ASP_REDIS_PORT:-6379}; do sleep 1; done;


npm run $@
