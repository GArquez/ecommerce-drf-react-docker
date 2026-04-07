from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ItemOrder

@receiver(post_save, sender=ItemOrder)
def reduce_stock_on_order(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        product.stock -= instance.quantity
        product.save()
        print(f"📉 Stock Updated: {product.name} now have {product.stock} units.")