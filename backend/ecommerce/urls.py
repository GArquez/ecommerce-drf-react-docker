from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from ecommerce import views

router = routers.DefaultRouter()
# 1. Registro normal de CRUDs
router.register(r'categories', views.CategoryView, basename='category')
router.register(r'products', views.ProductView, basename='product')
router.register(r'orders', views.OrderView, basename='order')
router.register(r'itemorders', views.ItemOrderView, basename='itemorder')

urlpatterns = [
    path('docs/', include_docs_urls(title='E-commerce API')),
    path('', include(router.urls)),
    # 2. Esta es la ruta manual para filtrar por categoría
    path('category-filter/<str:category>/', views.ProductsByCategoryView.as_view({'get': 'list'}), name='products-by-category'),
]