#!/bin/sh


echo "Applying migrations..."
python manage.py migrate --noinput


echo "Loading data from data.json..."
python manage.py loaddata data.json

# 3. Iniciar el servidor
echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:10000