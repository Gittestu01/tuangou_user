// pages/payment-success/payment-success.js
const app = getApp();

Page({
  data: {
    orderId: null,
    order: {
      product: {
        title: '新鲜草莓 500g装'
      },
      quantity: 1,
      productTotal: 29.9,
      pointsDeduction: 0,
      deliveryFee: 0,
      totalAmount: 29.9,
      deliveryType: 'captain',
      captain: {
        name: '张团长',
        address: '北京市朝阳区三里屯街道'
      },
      selectedAddress: null,
      endTime: '2024-03-15 18:00:00'
    },
    groupStatus: '进行中',
    groupProgress: 75,
    remainingCount: 5
  },

  onLoad(options) {
    const { orderId } = options;
    if (orderId) {
      this.setData({ orderId });
      this.loadOrderDetail(orderId);
    }
  },

  onShow() {
    // 页面显示时刷新团购进度
    this.refreshGroupProgress();
  },

  onShareAppMessage() {
    return {
      title: `团购进行中：${this.data.order.product.title}`,
      path: `/pages/product-detail/product-detail?id=${this.data.order.productId}`,
      imageUrl: this.data.order.product.image
    };
  },

  // 加载订单详情
  loadOrderDetail(orderId) {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API获取订单详情
      console.log('加载订单详情:', orderId);
      wx.hideLoading();
    }, 500);
  },

  // 刷新团购进度
  refreshGroupProgress() {
    // 模拟API调用获取最新团购进度
    setTimeout(() => {
      // 这里应该调用真实的API获取团购进度
      console.log('刷新团购进度');
    }, 300);
  },

  // 查看订单
  onViewOrder() {
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${this.data.orderId}`
    });
  },

  // 返回首页
  onBackHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  // 分享团购
  onShareGroup() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
});
