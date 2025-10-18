// pages/product-detail/product-detail.js
const app = getApp();

Page({
  data: {
    productId: null,
    product: {
      id: 1,
      title: '新鲜草莓 500g装',
      subtitle: '产地直供，新鲜采摘，甜度适中',
      price: 29.9,
      originalPrice: 39.9,
      discount: 7.5,
      stock: 50,
      endTime: '2024-03-15 18:00:00',
      joinedCount: 15,
      targetCount: 20,
      progress: 75,
      images: [
        '/images/strawberry1.jpg',
        '/images/strawberry2.jpg',
        '/images/strawberry3.jpg'
      ],
      details: '<p>新鲜草莓，产地直供，当日采摘，保证新鲜度。</p><p>规格：500g装</p><p>保质期：3天</p><p>储存方式：冷藏保存</p>'
    },
    captain: {
      id: 1,
      name: '张团长',
      avatar: '/images/captain1.jpg',
      address: '北京市朝阳区三里屯街道',
      groupCount: 25,
      rating: 98
    },
    joiners: [
      {
        id: 1,
        name: '用户1',
        avatar: '/images/user1.jpg',
        joinTime: '2小时前'
      },
      {
        id: 2,
        name: '用户2',
        avatar: '/images/user2.jpg',
        joinTime: '1小时前'
      },
      {
        id: 3,
        name: '用户3',
        avatar: '/images/user3.jpg',
        joinTime: '30分钟前'
      },
      {
        id: 4,
        name: '用户4',
        avatar: '/images/user4.jpg',
        joinTime: '15分钟前'
      }
    ],
    isCollected: false
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({ productId: id });
      this.loadProductDetail(id);
    }
  },

  onShow() {
    // 页面显示时检查收藏状态
    this.checkCollectStatus();
  },

  onShareAppMessage() {
    return {
      title: this.data.product.title,
      path: `/pages/product-detail/product-detail?id=${this.data.productId}`,
      imageUrl: this.data.product.images[0]
    };
  },

  // 加载商品详情
  loadProductDetail(id) {
    // 模拟API调用
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 这里应该调用真实的API获取商品详情
      console.log('加载商品详情:', id);
      wx.hideLoading();
    }, 500);
  },

  // 检查收藏状态
  checkCollectStatus() {
    const collectedProducts = wx.getStorageSync('collectedProducts') || [];
    const isCollected = collectedProducts.includes(this.data.productId);
    this.setData({ isCollected });
  },

  // 联系团长
  onContactCaptain() {
    wx.showModal({
      title: '联系团长',
      content: '是否要联系张团长？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以跳转到聊天页面或拨打电话
          wx.showToast({
            title: '正在联系团长...',
            icon: 'none'
          });
        }
      }
    });
  },

  // 查看位置
  onViewLocation() {
    wx.openLocation({
      latitude: 39.9042,
      longitude: 116.4074,
      name: '张团长位置',
      address: this.data.captain.address
    });
  },

  // 收藏/取消收藏
  onCollect() {
    const collectedProducts = wx.getStorageSync('collectedProducts') || [];
    const productId = this.data.productId;
    
    if (this.data.isCollected) {
      // 取消收藏
      const index = collectedProducts.indexOf(productId);
      if (index > -1) {
        collectedProducts.splice(index, 1);
      }
      this.setData({ isCollected: false });
      wx.showToast({
        title: '已取消收藏',
        icon: 'success'
      });
    } else {
      // 添加收藏
      collectedProducts.push(productId);
      this.setData({ isCollected: true });
      wx.showToast({
        title: '已添加收藏',
        icon: 'success'
      });
    }
    
    wx.setStorageSync('collectedProducts', collectedProducts);
  },

  // 分享
  onShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 立即参团
  onJoinGroup() {
    // 检查是否登录
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再参团',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            });
          }
        }
      });
      return;
    }

    // 检查团购是否已结束
    const now = new Date().getTime();
    const endTime = new Date(this.data.product.endTime).getTime();
    if (now >= endTime) {
      wx.showToast({
        title: '团购已结束',
        icon: 'none'
      });
      return;
    }

    // 检查库存
    if (this.data.product.stock <= 0) {
      wx.showToast({
        title: '商品已售罄',
        icon: 'none'
      });
      return;
    }

    // 跳转到确认订单页面
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?productId=${this.data.productId}`
    });
  }
});
