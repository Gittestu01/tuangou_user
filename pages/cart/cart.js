// pages/cart/cart.js
const app = getApp();

Page({
  data: {
    cartList: [],
    recommendList: [
      {
        id: 101,
        title: '新鲜苹果 2kg装',
        image: '/images/apple.jpg',
        price: 35.9,
        originalPrice: 45.9
      },
      {
        id: 102,
        title: '土鸡蛋 30枚装',
        image: '/images/eggs.jpg',
        price: 28.8,
        originalPrice: 35.8
      },
      {
        id: 103,
        title: '新鲜橙子 3kg装',
        image: '/images/orange.jpg',
        price: 42.0,
        originalPrice: 55.0
      }
    ],
    isAllSelected: false,
    selectedCount: 0,
    totalAmount: 0,
    pointsDeduction: 0
  },

  onLoad() {
    this.loadCartData();
  },

  onShow() {
    // 页面显示时刷新购物车数据
    this.refreshCartData();
  },

  onPullDownRefresh() {
    // 下拉刷新
    this.refreshCartData();
    wx.stopPullDownRefresh();
  },

  // 加载购物车数据
  loadCartData() {
    const cartList = app.globalData.cartList || [];
    this.setData({ cartList });
    this.calculateTotal();
  },

  // 刷新购物车数据
  refreshCartData() {
    this.loadCartData();
    this.removeExpiredItems();
  },

  // 移除已过期的团购商品
  removeExpiredItems() {
    const now = new Date().getTime();
    const validItems = this.data.cartList.filter(item => {
      const endTime = new Date(item.endTime).getTime();
      return endTime > now;
    });

    if (validItems.length !== this.data.cartList.length) {
      this.setData({ cartList: validItems });
      app.globalData.cartList = validItems;
      wx.setStorageSync('cartList', validItems);
      
      wx.showToast({
        title: '已移除过期商品',
        icon: 'none'
      });
    }
  },

  // 计算总金额
  calculateTotal() {
    const selectedItems = this.data.cartList.filter(item => item.selected);
    const selectedCount = selectedItems.length;
    const isAllSelected = selectedCount === this.data.cartList.length && this.data.cartList.length > 0;
    
    let totalAmount = 0;
    selectedItems.forEach(item => {
      totalAmount += item.price * item.quantity;
    });

    // 计算积分抵扣（假设1积分=0.01元）
    const userPoints = app.globalData.userInfo?.points || 0;
    const pointsDeduction = Math.min(userPoints * 0.01, totalAmount);

    this.setData({
      selectedCount,
      isAllSelected,
      totalAmount: totalAmount - pointsDeduction,
      pointsDeduction
    });
  },

  // 全选/取消全选
  onSelectAll() {
    const isAllSelected = !this.data.isAllSelected;
    const cartList = this.data.cartList.map(item => ({
      ...item,
      selected: isAllSelected
    }));

    this.setData({ cartList, isAllSelected });
    app.globalData.cartList = cartList;
    wx.setStorageSync('cartList', cartList);
    this.calculateTotal();
  },

  // 选择单个商品
  onSelectItem(e) {
    const { id } = e.currentTarget.dataset;
    const cartList = this.data.cartList.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected };
      }
      return item;
    });

    this.setData({ cartList });
    app.globalData.cartList = cartList;
    wx.setStorageSync('cartList', cartList);
    this.calculateTotal();
  },

  // 数量变化
  onQuantityChange(e) {
    const { id, type } = e.currentTarget.dataset;
    const cartList = this.data.cartList.map(item => {
      if (item.id === id) {
        let quantity = item.quantity;
        if (type === 'plus' && quantity < item.stock) {
          quantity++;
        } else if (type === 'minus' && quantity > 1) {
          quantity--;
        }
        return { ...item, quantity };
      }
      return item;
    });

    this.setData({ cartList });
    app.globalData.cartList = cartList;
    wx.setStorageSync('cartList', cartList);
    this.calculateTotal();
  },

  // 删除单个商品
  onDeleteItem(e) {
    const { id } = e.currentTarget.dataset;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个商品吗？',
      success: (res) => {
        if (res.confirm) {
          const cartList = this.data.cartList.filter(item => item.id !== id);
          this.setData({ cartList });
          app.globalData.cartList = cartList;
          wx.setStorageSync('cartList', cartList);
          this.calculateTotal();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 删除选中商品
  onDeleteSelected() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '确认删除',
      content: `确定要删除选中的${this.data.selectedCount}个商品吗？`,
      success: (res) => {
        if (res.confirm) {
          const cartList = this.data.cartList.filter(item => !item.selected);
          this.setData({ cartList });
          app.globalData.cartList = cartList;
          wx.setStorageSync('cartList', cartList);
          this.calculateTotal();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  // 查看商品详情
  onViewProduct(e) {
    const item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${item.id}`
    });
  },

  // 添加推荐商品到购物车
  onAddToCart(e) {
    const item = e.currentTarget.dataset.item;
    app.addToCart(item);
    
    wx.showToast({
      title: '已添加到购物车',
      icon: 'success'
    });
    
    this.refreshCartData();
  },

  // 去逛逛
  onGoShopping() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },

  // 结算
  onCheckout() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      });
      return;
    }

    const selectedItems = this.data.cartList.filter(item => item.selected);
    
    // 检查是否登录
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再结算',
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

    // 跳转到确认订单页面
    wx.navigateTo({
      url: `/pages/order-confirm/order-confirm?cartItems=${JSON.stringify(selectedItems)}`
    });
  }
});
