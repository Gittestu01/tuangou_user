// pages/home/home.js
const app = getApp();

Page({
  data: {
    locationText: '正在定位...',
    bannerList: [
      {
        id: 1,
        image: '/images/banner1.jpg',
        title: '春季新品上市',
        link: ''
      },
      {
        id: 2,
        image: '/images/banner2.jpg',
        title: '限时特惠活动',
        link: ''
      },
      {
        id: 3,
        image: '/images/banner3.jpg',
        title: '团长招募中',
        link: ''
      }
    ],
    groupList: [
      {
        id: 1,
        title: '新鲜草莓 500g装',
        image: '/images/strawberry.jpg',
        price: 29.9,
        originalPrice: 39.9,
        countdown: '2小时30分',
        captainName: '张团长',
        progress: 75,
        joinedCount: 15,
        targetCount: 20,
        endTime: '2024-03-15 18:00:00'
      },
      {
        id: 2,
        title: '有机蔬菜套餐',
        image: '/images/vegetables.jpg',
        price: 45.0,
        originalPrice: 60.0,
        countdown: '5小时15分',
        captainName: '李团长',
        progress: 60,
        joinedCount: 12,
        targetCount: 20,
        endTime: '2024-03-15 21:00:00'
      },
      {
        id: 3,
        title: '进口牛奶 1L*6盒',
        image: '/images/milk.jpg',
        price: 89.9,
        originalPrice: 120.0,
        countdown: '1天2小时',
        captainName: '王团长',
        progress: 40,
        joinedCount: 8,
        targetCount: 20,
        endTime: '2024-03-16 15:00:00'
      }
    ],
    nearbyList: [
      {
        id: 1,
        title: '新鲜苹果 2kg装',
        image: '/images/apple.jpg',
        price: 35.9,
        originalPrice: 45.9,
        distance: 0.5,
        captainName: '刘团长'
      },
      {
        id: 2,
        title: '土鸡蛋 30枚装',
        image: '/images/eggs.jpg',
        price: 28.8,
        originalPrice: 35.8,
        distance: 1.2,
        captainName: '陈团长'
      },
      {
        id: 3,
        title: '新鲜橙子 3kg装',
        image: '/images/orange.jpg',
        price: 42.0,
        originalPrice: 55.0,
        distance: 0.8,
        captainName: '赵团长'
      }
    ],
    loading: false
  },

  onLoad() {
    this.getLocation();
    this.loadGroupData();
    this.loadNearbyData();
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

  onReachBottom() {
    // 上拉加载更多
    this.loadMoreData();
  },

  // 获取位置信息
  getLocation() {
    if (app.globalData.location) {
      this.setData({
        locationText: '北京市朝阳区'
      });
    } else {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          app.globalData.location = {
            latitude: res.latitude,
            longitude: res.longitude
          };
          this.setData({
            locationText: '北京市朝阳区'
          });
        },
        fail: () => {
          this.setData({
            locationText: '定位失败，点击重新定位'
          });
        }
      });
    }
  },

  // 加载开团数据
  loadGroupData() {
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API
      console.log('加载开团数据');
    }, 500);
  },

  // 加载附近团购数据
  loadNearbyData() {
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API
      console.log('加载附近团购数据');
    }, 500);
  },

  // 刷新数据
  refreshData() {
    this.loadGroupData();
    this.loadNearbyData();
  },

  // 加载更多数据
  loadMoreData() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    // 模拟API调用
    setTimeout(() => {
      this.setData({ loading: false });
      console.log('加载更多数据');
    }, 1000);
  },

  // 搜索点击事件
  onSearchTap() {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },

  // 定位点击事件
  onLocationTap() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          locationText: res.name || res.address
        });
        // 更新位置后重新加载附近团购
        this.loadNearbyData();
      },
      fail: () => {
        wx.showToast({
          title: '定位失败',
          icon: 'none'
        });
      }
    });
  },

  // Banner点击事件
  onBannerTap(e) {
    const item = e.currentTarget.dataset.item;
    console.log('Banner点击:', item);
    // 根据Banner类型跳转到不同页面
    if (item.link) {
      wx.navigateTo({
        url: item.link
      });
    }
  },

  // 开团商品点击事件
  onGroupTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${item.id}`
    });
  },

  // 附近团购点击事件
  onNearbyTap(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${item.id}`
    });
  },

  // 更多开团点击事件
  onMoreGroupTap() {
    wx.switchTab({
      url: '/pages/category/category'
    });
  },

  // 更多附近团购点击事件
  onMoreNearbyTap() {
    wx.switchTab({
      url: '/pages/category/category'
    });
  }
});
