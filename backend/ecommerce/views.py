from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import CategorySerializer, ProductSerializer, OrderSerializer, ItemOrderSerializer
from .models import Category, Product, ItemOrder, Order
from rest_framework.permissions import AllowAny

# Create your views here.
class ApiRootView(APIView):
    def get(self, request):
        return Response({
            "message": "Welcome to the E-commerce API",
            "endpoints": {
                "products": "/api/products/",
                "categories": "/api/categories/",
                "orders": "/api/orders/",
                "itemorders": "/api/itemorders/"
            }
        })

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ProductsByCategoryView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        category_param = self.kwargs['category']
        return Product.objects.filter(category__name=category_param)

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    permission_classes = [AllowAny] 
    authentication_classes = []

class ItemOrderView(viewsets.ModelViewSet):
    serializer_class = ItemOrderSerializer
    queryset = ItemOrder.objects.all()
