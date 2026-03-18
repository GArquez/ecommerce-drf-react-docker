#!/bin/sh


echo "Applying migrations..."
python manage.py migrate --noinput


echo "Loading data..."
python scripts/seed_products.py

# 3. Iniciar el servidor
echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:10000