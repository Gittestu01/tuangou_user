// app.js
App({
  globalData: {
    userInfo: null,
    isCaptain: false, // 是否为团长
    location: null, // 用户位置信息
    cartList: [], // 购物车商品列表
    points: 0, // 用户积分
    balance: 0 // 可提现金额
  },

  onLaunch() {
    // 小程序启动时执行
    this.checkLoginStatus();
    this.getLocation();
  },

  onShow() {
    // 小程序显示时执行
  },

  onHide() {
    // 小程序隐藏时执行
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
      this.globalData.isCaptain = userInfo.isCaptain || false;
      this.globalData.points = userInfo.points || 0;
      this.globalData.balance = userInfo.balance || 0;
    }
  },

  // 获取用户位置
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        };
      },
      fail: () => {
        console.log('获取位置失败');
      }
    });
  },

  // 更新用户信息
  updateUserInfo(userInfo) {
    this.globalData.userInfo = userInfo;
    this.globalData.isCaptain = userInfo.isCaptain || false;
    this.globalData.points = userInfo.points || 0;
    this.globalData.balance = userInfo.balance || 0;
    wx.setStorageSync('userInfo', userInfo);
  },

  // 添加商品到购物车
  addToCart(product) {
    const cartList = this.globalData.cartList;
    const existingItem = cartList.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartList.push({
        ...product,
        quantity: 1
      });
    }
    
    this.globalData.cartList = cartList;
    wx.setStorageSync('cartList', cartList);
  },

  // 从购物车移除商品
  removeFromCart(productId) {
    this.globalData.cartList = this.globalData.cartList.filter(item => item.id !== productId);
    wx.setStorageSync('cartList', this.globalData.cartList);
  },

  // 清空购物车
  clearCart() {
    this.globalData.cartList = [];
    wx.setStorageSync('cartList', []);
  }
});
