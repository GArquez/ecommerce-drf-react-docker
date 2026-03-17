from django.db import models

# Create your models here.

class Category (models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Product (models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    brand = models.CharField(max_length=200)
    price = models.FloatField()
    stock = models.IntegerField()
    description = models.TextField(blank=False)
    img = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering =  ('-created_at',)

    def __str__(self):
        return self.name + ' - Category: ' + self.category.name
    
class Order (models.Model):
    name = models.CharField(max_length=300)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering =  ('-created_at',)

    def __str__(self):
        return 'Order by ' + self.name
    
class ItemOrder (models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT) 
    quantity = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"


