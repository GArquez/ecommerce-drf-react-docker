import random
from django.core.management.base import BaseCommand
from ecommerce.models import Product, Category

class Command(BaseCommand):
    help = 'Generates consistent products with local assets'

    def handle(self, *args, **kwargs):
        
        self.stdout.write("Cleaning database...")
        Product.objects.all().delete()
        Category.objects.all().delete()

        catalog_data = {
            'Laptops': [
                {
                    'name': 'Pavilion x360',
                    'brand': 'HP',
                    'price': 850.00,
                    'stock': 15,
                    'desc': 'Versatile 2-in-1 laptop with a 360-degree hinge, perfect for productivity and entertainment.',
                    'img': 'assets/laptop-hp.jpg'
                },
                {
                    'name': 'ROG Zephyrus',
                    'brand': 'ASUS',
                    'price': 1450.00,
                    'stock': 8,
                    'desc': 'High-performance gaming laptop with ultra-slim design and advanced cooling technology.',
                    'img': 'assets/laptop-asus.jpg'
                }
            ],
            'Monitors': [
                {
                    'name': 'Odyssey G5',
                    'brand': 'Samsung',
                    'price': 320.00,
                    'stock': 12,
                    'desc': 'Curved gaming monitor with 144Hz refresh rate and HDR10 for immersive visuals.',
                    'img': 'assets/monitor-samsung.jpg'
                }
            ],
            'Keyboards': [
                {
                    'name': 'Magic Keyboard',
                    'brand': 'Apple',
                    'price': 99.00,
                    'stock': 25,
                    'desc': 'Precise and comfortable typing experience with a sleek, wireless design.',
                    'img': 'assets/keyboard-apple.jpg'
                }
            ],
            'Mouses': [
                {
                    'name': 'Precision Wireless Mouse',
                    'brand': 'Generic Tech',
                    'price': 45.00,
                    'stock': 40,
                    'desc': 'Ergonomic optical mouse with customizable buttons and long-lasting battery life.',
                    'img': 'assets/mouse.jpg'
                }
            ],
            'Audio': [
                {
                    'name': 'WH-1000XM4',
                    'brand': 'Sony',
                    'price': 350.00,
                    'stock': 10,
                    'desc': 'Industry-leading noise canceling headphones with premium sound quality and smart features.',
                    'img': 'assets/headphone-sony.jpg'
                }
            ]
        }

        for cat_name, product_list in catalog_data.items():
            category_obj, _ = Category.objects.get_or_create(name=cat_name)
            self.stdout.write(f"Seeding category: {cat_name}")

            for p in product_list:
                Product.objects.create(
                    category=category_obj,
                    name=p['name'],
                    brand=p['brand'],
                    price=p['price'],
                    stock=p['stock'],
                    description=p['desc'],
                    img=p['img']
                )

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {Product.objects.count()} products.'))