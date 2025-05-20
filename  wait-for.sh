#!/bin/sh
# wait-for.sh

host="$1"
shift
until nc -z db 5432; do
  echo "Waiting for $host:5432..."
  sleep 2
done

exec "$@"