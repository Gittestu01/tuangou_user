// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: null,
    isCaptain: false,
    orderStats: {
      pending: 2,
      shipping: 1,
      delivered: 3,
      completed: 15,
      refund: 0
    }
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    // 页面显示时刷新用户信息
    this.refreshUserInfo();
  },

  onPullDownRefresh() {
    // 下拉刷新
    this.refreshUserInfo();
    wx.stopPullDownRefresh();
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo,
        isCaptain: userInfo.isCaptain || false
      });
    }
  },

  // 刷新用户信息
  refreshUserInfo() {
    this.loadUserInfo();
    this.loadOrderStats();
  },

  // 加载订单统计
  loadOrderStats() {
    // 模拟API调用
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 这里应该调用真实的API获取订单统计
      console.log('加载订单统计');
      wx.hideLoading();
    }, 500);
  },

  // 登录
  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },

  // 编辑个人资料
  onEditProfile() {
    wx.navigateTo({
      url: '/pages/edit-profile/edit-profile'
    });
  },

  // 查看订单
  onViewOrders(e) {
    const { status } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/order-list/order-list?status=${status}`
    });
  },

  // 查看全部订单
  onViewAllOrders() {
    wx.navigateTo({
      url: '/pages/order-list/order-list'
    });
  },

  // 我的收藏
  onMyFavorites() {
    wx.navigateTo({
      url: '/pages/favorites/favorites'
    });
  },

  // 收货地址
  onMyAddress() {
    wx.navigateTo({
      url: '/pages/address-list/address-list'
    });
  },

  // 优惠券
  onMyCoupons() {
    wx.navigateTo({
      url: '/pages/coupons/coupons'
    });
  },

  // 积分中心
  onMyPoints() {
    wx.navigateTo({
      url: '/pages/points-center/points-center'
    });
  },

  // 邀请好友
  onMyInvite() {
    wx.navigateTo({
      url: '/pages/invite-friends/invite-friends'
    });
  },

  // 我的推广码
  onMyQR() {
    wx.navigateTo({
      url: '/pages/my-qr/my-qr'
    });
  },

  // 客服中心
  onCustomerService() {
    wx.showModal({
      title: '客服中心',
      content: '是否要联系客服？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以跳转到客服聊天页面
          wx.showToast({
            title: '正在联系客服...',
            icon: 'none'
          });
        }
      }
    });
  },

  // 意见反馈
  onFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  // 关于我们
  onAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  // 申请成为团长
  onApplyCaptain() {
    wx.navigateTo({
      url: '/pages/captain-apply/captain-apply'
    });
  },

  // 团长中心
  onCaptainCenter() {
    wx.navigateTo({
      url: '/pages/captain-center/captain-center'
    });
  },

  // 我的开团
  onMyGroups() {
    wx.navigateTo({
      url: '/pages/captain-center/captain-center'
    });
  },

  // 订单管理
  onGroupOrders() {
    wx.navigateTo({
      url: '/pages/captain-orders/captain-orders'
    });
  },

  // 业绩提现
  onPerformance() {
    wx.navigateTo({
      url: '/pages/captain-performance/captain-performance'
    });
  },

  // 设置
  onSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    });
  }
});
