from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import ItemOrder, Order, Product, Category


class ProductModelTest(TestCase):
    def setUp(self):
        
        self.category = Category.objects.create(
            name="Periféricos"
        )
     
        self.product = Product.objects.create(
            category=self.category,
            name="Teclado Mecánico RGB",
            brand="ArquezTech",
            price=150.0,
            stock=10,
            description="Teclado para Tech'store"
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name, "Teclado Mecánico RGB")
       
        self.assertEqual(self.product.category.name, "Periféricos")

    def test_stock_logic(self):
        self.assertTrue(self.product.stock > 0)

    def test_api_list_products(self):
        client = APIClient()
        response = client.get('/api/products/')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], "Teclado Mecánico RGB")

    def test_create_order_with_items_and_stock_reduction(self):
        order = Order.objects.create(
            name="Guillermo Arquez",
            email="test@arquezdev.com"
        )
             
        item = ItemOrder.objects.create(
            order=order,
            product=self.product,
            quantity=2,
            price=self.product.price
        )
        
        self.assertEqual(order.items.count(), 1)
        self.assertEqual(order.items.first().product.name, "Teclado Mecánico RGB")
        self.assertEqual(item.quantity * item.price, 300.0)

        self.product.refresh_from_db()
        
        self.assertEqual(self.product.stock, 8)
        