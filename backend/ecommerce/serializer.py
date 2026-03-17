from rest_framework import serializers
from .models import Category, Product, Order, ItemOrder


class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = [ 'id', 'name', 'brand', 'price', 'stock', 
        'description', 'img', 'category', 'category_name', 'created_at']

class CategorySerializer (serializers.ModelSerializer):
    products = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

class ItemOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemOrder
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = ItemOrderSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'name', 'email', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            ItemOrder.objects.create(order=order, **item_data)
            product = item_data['product']
            product.stock -= item_data['quantity']
            product.save()
        return order
