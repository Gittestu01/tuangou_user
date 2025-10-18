// pages/captain-center/captain-center.js
const app = getApp();

Page({
  data: {
    overviewStats: {
      groupCount: 5,
      groupCountChange: 2,
      earnings: 156.8,
      earningsChange: 45.6,
      orderCount: 25,
      orderCountChange: 8,
      customerCount: 18,
      customerCountChange: 5
    },
    myGroups: [
      {
        id: 1,
        title: '新鲜草莓 500g装',
        image: '/images/strawberry1.jpg',
        price: 29.9,
        originalPrice: 39.9,
        progress: 75,
        joinedCount: 15,
        targetCount: 20,
        status: 'active',
        statusText: '进行中',
        endTime: '2024-03-15 18:00'
      },
      {
        id: 2,
        title: '有机蔬菜套餐',
        image: '/images/vegetables.jpg',
        price: 45.0,
        originalPrice: 60.0,
        progress: 100,
        joinedCount: 20,
        targetCount: 20,
        status: 'completed',
        statusText: '已完成',
        endTime: '2024-03-14 21:00'
      },
      {
        id: 3,
        title: '进口牛奶 1L*6盒',
        image: '/images/milk.jpg',
        price: 89.9,
        originalPrice: 120.0,
        progress: 40,
        joinedCount: 8,
        targetCount: 20,
        status: 'active',
        statusText: '进行中',
        endTime: '2024-03-16 15:00'
      }
    ],
    pendingOrders: [
      {
        id: 1,
        orderId: 'TG202403150001',
        statusText: '待发货',
        productImage: '/images/strawberry1.jpg',
        productTitle: '新鲜草莓 500g装',
        quantity: 2,
        amount: 59.8,
        customerName: '用户A'
      },
      {
        id: 2,
        orderId: 'TG202403150002',
        statusText: '待确认',
        productImage: '/images/vegetables.jpg',
        productTitle: '有机蔬菜套餐',
        quantity: 1,
        amount: 45.0,
        customerName: '用户B'
      }
    ],
    weekEarnings: 856.4,
    monthEarnings: 3245.6,
    totalEarnings: 12890.8,
    pickupStats: {
      today: 12,
      pending: 5,
      total: 156
    }
  },

  onLoad() {
    this.loadCaptainData();
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

  // 加载团长数据
  loadCaptainData() {
    wx.showLoading({ title: '加载中...' });
    
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API获取团长数据
      console.log('加载团长数据');
      wx.hideLoading();
    }, 500);
  },

  // 刷新数据
  refreshData() {
    this.loadCaptainData();
  },

  // 新开团
  onCreateGroup() {
    wx.navigateTo({
      url: '/pages/group-create/group-create'
    });
  },

  // 订单管理
  onManageOrders() {
    wx.navigateTo({
      url: '/pages/captain-orders/captain-orders'
    });
  },

  // 业绩查看
  onViewPerformance() {
    wx.navigateTo({
      url: '/pages/captain-performance/captain-performance'
    });
  },

  // 客服支持
  onCustomerService() {
    wx.showModal({
      title: '客服支持',
      content: '是否要联系客服？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '正在联系客服...',
            icon: 'none'
          });
        }
      }
    });
  },

  // 查看团购详情
  onViewGroup(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/group-detail/group-detail?id=${item.id}`
    });
  },

  // 编辑团购
  onEditGroup(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/group-edit/group-edit?id=${item.id}`
    });
  },

  // 分享团购
  onShareGroup(e) {
    const item = e.currentTarget.dataset.item;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 查看全部团购
  onViewAllGroups() {
    wx.navigateTo({
      url: '/pages/captain-groups/captain-groups'
    });
  },

  // 查看订单详情
  onViewOrder(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${item.id}`
    });
  },

  // 联系客户
  onContactCustomer(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: '联系客户',
      content: `是否要联系${item.customerName}？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '正在联系客户...',
            icon: 'none'
          });
        }
      }
    });
  },

  // 处理订单
  onProcessOrder(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/order-process/order-process?id=${item.id}`
    });
  },

  // 查看全部订单
  onViewAllOrders() {
    wx.navigateTo({
      url: '/pages/captain-orders/captain-orders'
    });
  },

  // 查看业绩详情
  onViewPerformanceDetail() {
    wx.navigateTo({
      url: '/pages/captain-performance/captain-performance'
    });
  },

  // 扫码核销
  onScanPickup() {
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果:', res);
        // 处理扫码结果
        wx.showToast({
          title: '扫码成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        });
      }
    });
  },

  // 手动核销
  onManualPickup() {
    wx.navigateTo({
      url: '/pages/pickup-manual/pickup-manual'
    });
  },

  onShareAppMessage() {
    return {
      title: '团长中心',
      path: '/pages/captain-center/captain-center',
      imageUrl: '/images/share-captain.jpg'
    };
  }
});
