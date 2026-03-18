import os
import django
import sys
import cloudinary.uploader


base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(base_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'),
    secure = True
)

name = os.getenv('CLOUDINARY_NAME')
key = os.getenv('CLOUDINARY_API_KEY')

print(f"DEBUG: Name cargado: {name}")
print(f"DEBUG: Key cargada (primeros 4): {key[:4] if key else 'VACIO'}")

from django.conf import settings
from ecommerce.models import Product, Category

def upload_image_to_cloudinary(local_path):
    if not os.path.exists(local_path):
        print(f"⚠️ Archive not found: {local_path}")
        return None
    try:
        response = cloudinary.uploader.upload(local_path, folder="products/")
        return response['public_id']
    except Exception as e:
        print(f"❌ Error uploading to Cloudinary: {e}")
        return None

def run_seed():
    if settings.DEBUG and os.getenv('FORCE_SEED') != 'True':
        print("⚠️ Local env. Seeder canceled.")
        return

    products_data = { 'Laptops': [ { 'name': 'Pavilion x360', 'brand': 'HP', 'price': 850.00, 'stock': 15, 'description': 'Versatile 2-in-1 laptop with a 360-degree hinge, perfect for productivity and entertainment.', 'img': 'assets/laptop-hp.jpg' }, { 'name': 'ROG Zephyrus', 'brand': 'ASUS', 'price': 1450.00, 'stock': 8, 'description': 'High-performance gaming laptop with ultra-slim design and advanced cooling technology.', 'img': 'assets/laptop-asus.jpg' } ], 'Monitors': [ { 'name': 'Odyssey G5', 'brand': 'Samsung', 'price': 320.00, 'stock': 12, 'description': 'Curved gaming monitor with 144Hz refresh rate and HDR10 for immersive visuals.', 'img': 'assets/monitor-samsung.jpg' } ], 'Keyboards': [ { 'name': 'Magic Keyboard', 'brand': 'Apple', 'price': 99.00, 'stock': 25, 'description': 'Precise and comfortable typing experience with a sleek, wireless design.', 'img': 'assets/keyboard-apple.jpg' } ], 'Mouses': [ { 'name': 'Precision Wireless Mouse', 'brand': 'Generic Tech', 'price': 45.00, 'stock': 40, 'description': 'Ergonomic optical mouse with customizable buttons and long-lasting battery life.', 'img': 'assets/mouse.jpg' } ], 'Audio': [ { 'name': 'WH-1000XM4', 'brand': 'Sony', 'price': 350.00, 'stock': 10, 'description': 'Industry-leading noise canceling headphones with premium sound quality and smart features.', 'img': 'assets/headphone-sony.jpg' } ] }

    for cat_name, product_list in products_data.items():
        category_obj, _ = Category.objects.get_or_create(name=cat_name)
        
        for p_data in product_list:
            
            product_obj, created = Product.objects.get_or_create(
                name=p_data['name'],
                defaults={
                    'category': category_obj,
                    'brand': p_data['brand'],
                    'price': p_data['price'],
                    'stock': p_data['stock'],
                    'description': p_data['description'],
                    'img': '' 
                }
            )

            
            needs_image_update = created or (product_obj.img and "assets/" in str(product_obj.img))

            if needs_image_update:
                action = "Creating" if created else "Updating"
                print(f"🔄 {action} image for: {product_obj.name}")
                
                
                full_img_path = os.path.join(base_dir, p_data['img'])
                
                cloudinary_id = upload_image_to_cloudinary(full_img_path)
                
                if cloudinary_id:
                    product_obj.img = cloudinary_id
                    product_obj.save()
                    print(f"✅ Cloudinary ID saved for {product_obj.name}: {cloudinary_id}")
            else:
                print(f"ℹ️ {product_obj.name} already has a Cloudinary image.")

if __name__ == "__main__":
    run_seed()