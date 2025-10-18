// pages/category/category.js
const app = getApp();

Page({
  data: {
    currentCategory: 1,
    categoryList: [
      { id: 1, name: '新鲜水果' },
      { id: 2, name: '有机蔬菜' },
      { id: 3, name: '肉禽蛋类' },
      { id: 4, name: '海鲜水产' },
      { id: 5, name: '粮油调料' },
      { id: 6, name: '乳制品' },
      { id: 7, name: '休闲零食' },
      { id: 8, name: '生活用品' }
    ],
    productSections: [
      {
        id: 1,
        title: '热销商品',
        products: [
          {
            id: 1,
            title: '新鲜草莓 500g装',
            image: '/images/strawberry1.jpg',
            price: 29.9,
            originalPrice: 39.9,
            captainName: '张团长',
            countdown: '2小时30分'
          },
          {
            id: 2,
            title: '有机苹果 2kg装',
            image: '/images/apple.jpg',
            price: 35.9,
            originalPrice: 45.9,
            captainName: '李团长',
            countdown: '5小时15分'
          },
          {
            id: 3,
            title: '新鲜橙子 3kg装',
            image: '/images/orange.jpg',
            price: 42.0,
            originalPrice: 55.0,
            captainName: '王团长',
            countdown: '1天2小时'
          },
          {
            id: 4,
            title: '进口香蕉 1kg装',
            image: '/images/banana.jpg',
            price: 18.8,
            originalPrice: 25.8,
            captainName: '刘团长',
            countdown: '3小时45分'
          }
        ]
      }
    ]
  },

  onLoad() {
    this.loadCategoryData();
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshData();
  },

  onPullDownRefresh() {
    // 下拉刷新
    this.refreshData();
    wx.stopPullDownRefresh();
  },

  // 加载分类数据
  loadCategoryData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API获取分类数据
      console.log('加载分类数据');
      wx.hideLoading();
    }, 500);
  },

  // 刷新数据
  refreshData() {
    this.loadCategoryData();
  },

  // 分类切换
  onCategoryChange(e) {
    const { id } = e.currentTarget.dataset;
    this.setData({ currentCategory: id });
    this.loadProductsByCategory(id);
  },

  // 根据分类加载商品
  loadProductsByCategory(categoryId) {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API根据分类获取商品
      console.log('加载分类商品:', categoryId);
      wx.hideLoading();
    }, 300);
  },

  // 搜索点击
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 商品点击
  onProductTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${item.id}`
    });
  }
});
