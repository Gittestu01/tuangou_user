// pages/order-confirm/order-confirm.js
const app = getApp();

Page({
  data: {
    productId: null,
    product: {
      id: 1,
      title: '新鲜草莓 500g装',
      subtitle: '产地直供，新鲜采摘，甜度适中',
      image: '/images/strawberry1.jpg',
      price: 29.9,
      originalPrice: 39.9,
      stock: 50
    },
    quantity: 1,
    deliveryType: 'captain', // captain: 团长自提, home: 送货上门
    selectedAddress: null,
    captain: {
      id: 1,
      name: '张团长',
      avatar: '/images/captain1.jpg',
      address: '北京市朝阳区三里屯街道',
      phone: '138****8888'
    },
    userPoints: 1000,
    usedPoints: 0,
    pointsDeduction: 0,
    paymentType: 'wechat', // wechat: 微信支付, alipay: 支付宝
    agreed: false,
    deliveryFee: 0,
    productTotal: 0,
    totalAmount: 0
  },

  onLoad(options) {
    const { productId } = options;
    if (productId) {
      this.setData({ productId });
      this.loadProductDetail(productId);
    }
    this.calculateTotal();
  },

  onShow() {
    // 页面显示时刷新用户信息
    this.loadUserInfo();
  },

  // 加载商品详情
  loadProductDetail(productId) {
    // 模拟API调用
    wx.showLoading({ title: '加载中...' });
    
    setTimeout(() => {
      // 这里应该调用真实的API获取商品详情
      console.log('加载商品详情:', productId);
      wx.hideLoading();
    }, 500);
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userPoints: userInfo.points || 0
      });
    }
  },

  // 数量变化
  onQuantityChange(e) {
    const { type } = e.currentTarget.dataset;
    let { quantity } = this.data;
    
    if (type === 'plus' && quantity < this.data.product.stock) {
      quantity++;
    } else if (type === 'minus' && quantity > 1) {
      quantity--;
    }
    
    this.setData({ quantity });
    this.calculateTotal();
  },

  // 收货方式变化
  onDeliveryTypeChange(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ 
      deliveryType: type,
      selectedAddress: type === 'home' ? null : this.data.selectedAddress
    });
    this.calculateTotal();
  },

  // 选择地址
  onSelectAddress() {
    wx.navigateTo({
      url: '/pages/address-list/address-list'
    });
  },

  // 联系团长
  onContactCaptain() {
    wx.showModal({
      title: '联系团长',
      content: `是否要联系${this.data.captain.name}？`,
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

  // 积分输入
  onPointsInput(e) {
    const value = parseInt(e.detail.value) || 0;
    const maxPoints = Math.min(this.data.userPoints, this.data.productTotal * 100);
    const usedPoints = Math.min(value, maxPoints);
    
    this.setData({ 
      usedPoints,
      pointsDeduction: usedPoints * 0.01
    });
    this.calculateTotal();
  },

  // 支付方式变化
  onPaymentTypeChange(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ paymentType: type });
  },

  // 协议同意状态变化
  onAgreementChange(e) {
    this.setData({ agreed: e.detail.value });
  },

  // 查看协议
  onViewAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    });
  },

  // 计算总金额
  calculateTotal() {
    const { product, quantity, deliveryType, pointsDeduction } = this.data;
    const productTotal = product.price * quantity;
    const deliveryFee = deliveryType === 'home' ? 5 : 0;
    const totalAmount = Math.max(0, productTotal + deliveryFee - pointsDeduction);
    
    this.setData({
      productTotal,
      deliveryFee,
      totalAmount
    });
  },

  // 确认订单
  onConfirmOrder() {
    // 检查协议是否同意
    if (!this.data.agreed) {
      wx.showToast({
        title: '请先同意团购协议',
        icon: 'none'
      });
      return;
    }

    // 检查地址是否选择
    if (this.data.deliveryType === 'home' && !this.data.selectedAddress) {
      wx.showToast({
        title: '请选择收货地址',
        icon: 'none'
      });
      return;
    }

    // 检查库存
    if (this.data.quantity > this.data.product.stock) {
      wx.showToast({
        title: '库存不足',
        icon: 'none'
      });
      return;
    }

    // 检查积分是否足够
    if (this.data.usedPoints > this.data.userPoints) {
      wx.showToast({
        title: '积分不足',
        icon: 'none'
      });
      return;
    }

    // 创建订单
    this.createOrder();
  },

  // 创建订单
  createOrder() {
    wx.showLoading({ title: '创建订单中...' });
    
    const orderData = {
      productId: this.data.productId,
      product: this.data.product,
      quantity: this.data.quantity,
      deliveryType: this.data.deliveryType,
      selectedAddress: this.data.selectedAddress,
      captain: this.data.captain,
      usedPoints: this.data.usedPoints,
      pointsDeduction: this.data.pointsDeduction,
      paymentType: this.data.paymentType,
      productTotal: this.data.productTotal,
      deliveryFee: this.data.deliveryFee,
      totalAmount: this.data.totalAmount
    };

    // 模拟API调用
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟支付成功
      wx.showLoading({ title: '支付中...' });
      
      setTimeout(() => {
        wx.hideLoading();
        
        // 跳转到支付成功页面
        wx.redirectTo({
          url: `/pages/payment-success/payment-success?orderId=${Date.now()}`
        });
      }, 2000);
    }, 1000);
  }
});
