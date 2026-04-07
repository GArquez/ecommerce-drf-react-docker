#!/bin/sh


echo "Applying migrations..."
python manage.py migrate --noinput


echo "Loading data..."
python ecommerce/scripts/seed_products.py


echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application --bind 0.0.0.0:10000