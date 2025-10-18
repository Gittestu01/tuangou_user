// pages/marketing/marketing.js
const app = getApp();

Page({
  data: {
    userInfo: {
      name: '用户昵称',
      avatar: '/images/user-avatar.jpg',
      level: '普通用户',
      points: 1000,
      balance: 0,
      inviteCount: 5
    },
    isCaptain: false,
    todayStats: {
      groupCount: 3,
      earnings: 156.8,
      orderCount: 25,
      customerCount: 18
    },
    promotionStats: {
      totalInvites: 12,
      captainInvites: 2,
      totalReward: 89.6
    },
    inviteRecords: [
      {
        id: 1,
        name: '用户A',
        avatar: '/images/user1.jpg',
        type: '普通用户',
        inviteTime: '2024-03-10',
        reward: 5.0
      },
      {
        id: 2,
        name: '用户B',
        avatar: '/images/user2.jpg',
        type: '团长',
        inviteTime: '2024-03-08',
        reward: 20.0
      },
      {
        id: 3,
        name: '用户C',
        avatar: '/images/user3.jpg',
        type: '普通用户',
        inviteTime: '2024-03-05',
        reward: 5.0
      }
    ],
    showQR: false,
    qrCode: '/images/qr-code.jpg'
  },

  onLoad() {
    this.loadUserInfo();
    this.loadMarketingData();
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

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: {
          ...this.data.userInfo,
          ...userInfo
        },
        isCaptain: userInfo.isCaptain || false
      });
    }
  },

  // 加载营销数据
  loadMarketingData() {
    // 模拟API调用
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 这里应该调用真实的API获取营销数据
      console.log('加载营销数据');
      wx.hideLoading();
    }, 500);
  },

  // 刷新数据
  refreshData() {
    this.loadUserInfo();
    this.loadMarketingData();
  },

  // 申请成为团长
  onApplyCaptain() {
    wx.navigateTo({
      url: '/pages/captain-apply/captain-apply'
    });
  },

  // 我的开团
  onMyGroups() {
    wx.navigateTo({
      url: '/pages/captain-center/captain-center'
    });
  },

  // 业绩提现
  onPerformance() {
    wx.navigateTo({
      url: '/pages/captain-performance/captain-performance'
    });
  },

  // 查看业绩详情
  onViewPerformance() {
    wx.navigateTo({
      url: '/pages/captain-performance/captain-performance'
    });
  },

  // 生成推广码
  onGenerateQR() {
    wx.showLoading({ title: '生成中...' });
    
    // 模拟生成推广码
    setTimeout(() => {
      wx.hideLoading();
      this.setData({ showQR: true });
    }, 1000);
  },

  // 关闭推广码
  onCloseQR() {
    this.setData({ showQR: false });
  },

  // 邀请好友
  onShareInvite() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  // 查看邀请记录
  onViewRecords() {
    wx.navigateTo({
      url: '/pages/invite-records/invite-records'
    });
  },

  // 团购分享
  onGroupShare() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 邀请参团
  onGroupInvite() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 创建团购
  onGroupCreate() {
    if (!this.data.isCaptain) {
      wx.showModal({
        title: '提示',
        content: '请先申请成为团长',
        success: (res) => {
          if (res.confirm) {
            this.onApplyCaptain();
          }
        }
      });
      return;
    }
    
    wx.navigateTo({
      url: '/pages/group-create/group-create'
    });
  },

  // 团购管理
  onGroupManage() {
    if (!this.data.isCaptain) {
      wx.showModal({
        title: '提示',
        content: '请先申请成为团长',
        success: (res) => {
          if (res.confirm) {
            this.onApplyCaptain();
          }
        }
      });
      return;
    }
    
    wx.navigateTo({
      url: '/pages/captain-center/captain-center'
    });
  },

  onShareAppMessage() {
    return {
      title: '邀请您加入团购小程序',
      path: '/pages/home/home',
      imageUrl: '/images/share-banner.jpg'
    };
  }
});
