import streamlit as st

# 页面配置
st.set_page_config(
    page_title="团购小程序 - 手机端原型",
    page_icon="🛒",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# 自定义CSS样式
st.markdown("""
<style>
    /* 隐藏Streamlit默认元素 */
    .stApp > header {
        display: none;
    }
    
    .stApp > div[data-testid="stToolbar"] {
        display: none;
    }
    
    .stApp > div[data-testid="stDecoration"] {
        display: none;
    }
    
    .stApp > div[data-testid="stStatusWidget"] {
        display: none;
    }
    
    .stApp > div[data-testid="stSidebar"] {
        display: none;
    }
    
    .stApp > div[data-testid="stMain"] {
        padding: 0;
    }
    
    .stApp > div[data-testid="stMain"] > div {
        padding: 0;
    }
    
    /* 手机容器样式 */
    .phone-container {
        max-width: 375px;
        margin: 20px auto;
        background: #000;
        border-radius: 25px;
        padding: 8px;
        box-shadow: 0 0 30px rgba(0,0,0,0.3);
        overflow: hidden;
    }
    
    .screen {
        width: 100%;
        height: 667px;
        background: #fff;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
    }
    
    .status-bar {
        height: 20px;
        background: #000;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        font-size: 12px;
    }
    
    .app-container {
        height: calc(100% - 20px);
        background: #f5f5f5;
        overflow: hidden;
        position: relative;
    }
    
    .nav-bar {
        height: 44px;
        background: #ff6b35;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 600;
        position: relative;
        z-index: 10;
    }
    
    .content {
        padding: 15px;
        height: calc(100% - 44px - 50px);
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
    }
    
    .card {
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .search-bar {
        background: #fff;
        padding: 15px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .search-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #f8f9fa;
        padding: 10px 15px;
        border-radius: 20px;
        border: 1px solid #e9ecef;
    }
    
    .search-placeholder {
        color: #999;
        font-size: 14px;
    }
    
    .location-bar {
        background: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
    }
    
    .location-text {
        font-size: 14px;
        color: #333;
        margin-left: 5px;
    }
    
    .banner {
        margin: 10px 15px;
        border-radius: 8px;
        overflow: hidden;
        height: 160px;
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
    }
    
    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    
    .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }
    
    .section-more {
        font-size: 14px;
        color: #ff6b35;
    }
    
    .product-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        box-sizing: border-box;
    }
    
    .product-item {
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        border: 1px solid #e9ecef;
        cursor: pointer;
        transition: transform 0.2s;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .product-item:hover {
        transform: scale(0.95);
    }
    
    .product-image {
        width: 100%;
        height: 120px;
        background: #f0f0f0;
        border-radius: 6px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 14px;
    }
    
    .product-title {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
        line-height: 1.3;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .product-price {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .price {
        font-size: 16px;
        font-weight: 600;
        color: #ff6b35;
        margin-right: 5px;
    }
    
    .price-original {
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
    }
    
    .product-meta {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .product-captain {
        font-size: 12px;
        color: #666;
    }
    
    .product-countdown {
        font-size: 12px;
        color: #ff6b35;
        font-weight: 500;
    }
    
    .user-header {
        background: #fff;
        padding: 20px;
        margin-bottom: 10px;
    }
    
    .user-info {
        display: flex;
        align-items: center;
    }
    
    .user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #ddd;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
        font-size: 24px;
    }
    
    .user-details {
        flex: 1;
    }
    
    .user-name {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 4px;
    }
    
    .user-level {
        font-size: 14px;
        color: #666;
    }
    
    .order-stats {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
    }
    
    .order-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }
    
    .order-icon {
        font-size: 24px;
        margin-bottom: 8px;
    }
    
    .order-label {
        font-size: 12px;
        color: #666;
    }
    
    .menu-group {
        background: #fff;
        margin-bottom: 10px;
    }
    
    .menu-item {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid #f0f0f0;
        cursor: pointer;
    }
    
    .menu-item:last-child {
        border-bottom: none;
    }
    
    .menu-icon {
        font-size: 20px;
        margin-right: 15px;
    }
    
    .menu-text {
        flex: 1;
        font-size: 16px;
        color: #333;
    }
    
    .menu-arrow {
        font-size: 16px;
        color: #999;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 15px;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 10px;
    }
    
    .cart-image {
        width: 80px;
        height: 80px;
        background: #f0f0f0;
        border-radius: 6px;
        margin-right: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #999;
    }
    
    .cart-info {
        flex: 1;
    }
    
    .cart-title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
    }
    
    .cart-price {
        font-size: 18px;
        font-weight: 600;
        color: #ff6b35;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }
    
    .quantity-btn {
        width: 30px;
        height: 30px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    
    .quantity-value {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        min-width: 30px;
        text-align: center;
    }
    
    .bottom-bar {
        position: absolute;
        bottom: 50px;
        left: 0;
        right: 0;
        width: 100%;
        background: #fff;
        padding: 15px 20px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 999;
        box-sizing: border-box;
    }
    
    .total-amount {
        font-size: 18px;
        font-weight: 700;
        color: #ff6b35;
    }
    
    .checkout-btn {
        padding: 12px 24px;
        background: #ff6b35;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
    }
    
    .marketing-stats {
        display: flex;
        justify-content: space-around;
        margin: 20px 0;
    }
    
    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .stat-value {
        font-size: 20px;
        font-weight: 700;
        color: #ff6b35;
        margin-bottom: 4px;
    }
    
    .stat-label {
        font-size: 12px;
        color: #666;
    }
    
    .captain-card {
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: #fff;
        padding: 20px;
        border-radius: 12px;
        margin: 20px 0;
        cursor: pointer;
    }
    
    .captain-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }
    
    .captain-desc {
        font-size: 14px;
        opacity: 0.9;
    }
    
    .performance-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin: 20px 0;
    }
    
    .performance-item {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        text-align: center;
    }
    
    .performance-value {
        font-size: 18px;
        font-weight: 700;
        color: #ff6b35;
        margin-bottom: 4px;
    }
    
    .performance-label {
        font-size: 12px;
        color: #666;
    }
    
    .tab-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        border-top: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: 1000;
        box-sizing: border-box;
    }
    
    .tab-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: 5px;
        color: #666;
        font-size: 12px;
    }
    
    .tab-item.active {
        color: #ff6b35;
    }
    
    .tab-icon {
        font-size: 20px;
        margin-bottom: 2px;
    }
    
    @media (max-width: 480px) {
        .phone-container {
            margin: 10px auto;
            max-width: 100%;
            border-radius: 0;
        }
        
        .screen {
            border-radius: 0;
        }
        
        .content {
            padding: 10px;
        }
        
        .product-grid {
            gap: 10px;
        }
        
        .product-item {
            padding: 10px;
        }
    }
</style>
""", unsafe_allow_html=True)

# 初始化session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = 'home'

if 'cart_items' not in st.session_state:
    st.session_state.cart_items = [
        {'id': 1, 'title': '新鲜草莓 500g装', 'price': 29.9, 'quantity': 1, 'emoji': '🍓'},
        {'id': 2, 'title': '有机蔬菜套餐', 'price': 45.0, 'quantity': 1, 'emoji': '🥬'}
    ]

# 页面切换函数
def switch_page(page):
    st.session_state.current_page = page
    st.rerun()

# 渲染页面内容
def render_page():
    if st.session_state.current_page == 'home':
        render_home_page()
    elif st.session_state.current_page == 'category':
        render_category_page()
    elif st.session_state.current_page == 'marketing':
        render_marketing_page()
    elif st.session_state.current_page == 'cart':
        render_cart_page()
    elif st.session_state.current_page == 'profile':
        render_profile_page()

# 首页
def render_home_page():
    st.markdown("""
    <div class="search-bar">
        <div class="search-input">
            <span class="search-placeholder">搜索商品...</span>
            <span>🔍</span>
        </div>
    </div>
    <div class="location-bar">
        <span>📍</span>
        <span class="location-text">北京市朝阳区</span>
    </div>
    <div class="banner">
        🎯 春季新品上市
    </div>
    <div class="card">
        <div class="section-header">
            <span class="section-title">今日开团</span>
            <span class="section-more">更多 ></span>
        </div>
        <div class="product-grid">
            <div class="product-item">
                <div class="product-image">🍓</div>
                <div class="product-title">新鲜草莓 500g装</div>
                <div class="product-price">
                    <span class="price">¥29.9</span>
                    <span class="price-original">¥39.9</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">张团长</span>
                    <span class="product-countdown">2小时30分</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">🥬</div>
                <div class="product-title">有机蔬菜套餐</div>
                <div class="product-price">
                    <span class="price">¥45.0</span>
                    <span class="price-original">¥60.0</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">李团长</span>
                    <span class="product-countdown">5小时15分</span>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# 分类页
def render_category_page():
    st.markdown("""
    <div class="search-bar">
        <div class="search-input">
            <span class="search-placeholder">搜索商品...</span>
            <span>🔍</span>
        </div>
    </div>
    <div class="card">
        <div class="section-header">
            <span class="section-title">新鲜水果</span>
        </div>
        <div class="product-grid">
            <div class="product-item">
                <div class="product-image">🍓</div>
                <div class="product-title">新鲜草莓 500g装</div>
                <div class="product-price">
                    <span class="price">¥29.9</span>
                    <span class="price-original">¥39.9</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">张团长</span>
                    <span class="product-countdown">2小时30分</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">🍎</div>
                <div class="product-title">有机苹果 2kg装</div>
                <div class="product-price">
                    <span class="price">¥35.9</span>
                    <span class="price-original">¥45.9</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">李团长</span>
                    <span class="product-countdown">5小时15分</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">🍊</div>
                <div class="product-title">新鲜橙子 3kg装</div>
                <div class="product-price">
                    <span class="price">¥42.0</span>
                    <span class="price-original">¥55.0</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">王团长</span>
                    <span class="product-countdown">1天2小时</span>
                </div>
            </div>
            <div class="product-item">
                <div class="product-image">🍌</div>
                <div class="product-title">进口香蕉 1kg装</div>
                <div class="product-price">
                    <span class="price">¥18.8</span>
                    <span class="price-original">¥25.8</span>
                </div>
                <div class="product-meta">
                    <span class="product-captain">刘团长</span>
                    <span class="product-countdown">3小时45分</span>
                </div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# 营销中心
def render_marketing_page():
    st.markdown("""
    <div class="user-header">
        <div class="user-info">
            <div class="user-avatar">👤</div>
            <div class="user-details">
                <div class="user-name">用户昵称</div>
                <div class="user-level">普通用户</div>
            </div>
        </div>
    </div>
    <div class="marketing-stats">
        <div class="stat-item">
            <span class="stat-value">1000</span>
            <span class="stat-label">积分余额</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">¥0</span>
            <span class="stat-label">可提现金额</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">5</span>
            <span class="stat-label">邀请人数</span>
        </div>
    </div>
    <div class="captain-card">
        <div class="captain-title">成为团长</div>
        <div class="captain-desc">开启团购事业，赚取丰厚佣金</div>
    </div>
    <div class="card">
        <div class="section-header">
            <span class="section-title">推广中心</span>
        </div>
        <div class="performance-grid">
            <div class="performance-item">
                <div class="performance-value">12</div>
                <div class="performance-label">总邀请人数</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">2</div>
                <div class="performance-label">邀请团长数</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">¥89.6</div>
                <div class="performance-label">累计奖励</div>
            </div>
            <div class="performance-item">
                <div class="performance-value">📱</div>
                <div class="performance-label">生成推广码</div>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

# 购物车
def render_cart_page():
    cart_html = """
    <div class="card">
        <div class="section-header">
            <span class="section-title">购物车</span>
        </div>
    """
    
    total_amount = 0
    for item in st.session_state.cart_items:
        item_total = item['price'] * item['quantity']
        total_amount += item_total
        cart_html += f"""
        <div class="cart-item">
            <div class="cart-image">{item['emoji']}</div>
            <div class="cart-info">
                <div class="cart-title">{item['title']}</div>
                <div class="cart-price">¥{item['price']}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn">-</button>
                    <span class="quantity-value">{item['quantity']}</span>
                    <button class="quantity-btn">+</button>
                </div>
            </div>
        </div>
        """
    
    cart_html += f"""
    </div>
    <div class="bottom-bar">
        <span class="total-amount">合计：¥{total_amount:.1f}</span>
        <button class="checkout-btn">结算({len(st.session_state.cart_items)})</button>
    </div>
    """
    
    st.markdown(cart_html, unsafe_allow_html=True)

# 我的页面
def render_profile_page():
    st.markdown("""
    <div class="user-header">
        <div class="user-info">
            <div class="user-avatar">👤</div>
            <div class="user-details">
                <div class="user-name">用户昵称</div>
                <div class="user-level">普通用户</div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="section-header">
            <span class="section-title">我的订单</span>
            <span class="section-more">查看全部 ></span>
        </div>
        <div class="order-stats">
            <div class="order-item">
                <div class="order-icon">⏰</div>
                <div class="order-label">待付款</div>
            </div>
            <div class="order-item">
                <div class="order-icon">🚚</div>
                <div class="order-label">待发货</div>
            </div>
            <div class="order-item">
                <div class="order-icon">📦</div>
                <div class="order-label">待收货</div>
            </div>
            <div class="order-item">
                <div class="order-icon">✅</div>
                <div class="order-label">已完成</div>
            </div>
            <div class="order-item">
                <div class="order-icon">🔄</div>
                <div class="order-label">退换货</div>
            </div>
        </div>
    </div>
    <div class="menu-group">
        <div class="menu-item">
            <span class="menu-icon">❤️</span>
            <span class="menu-text">我的收藏</span>
            <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
            <span class="menu-icon">📍</span>
            <span class="menu-text">收货地址</span>
            <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
            <span class="menu-icon">🎫</span>
            <span class="menu-text">优惠券</span>
            <span class="menu-arrow">></span>
        </div>
    </div>
    <div class="menu-group">
        <div class="menu-item">
            <span class="menu-icon">💎</span>
            <span class="menu-text">积分中心</span>
            <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
            <span class="menu-icon">👥</span>
            <span class="menu-text">邀请好友</span>
            <span class="menu-arrow">></span>
        </div>
        <div class="menu-item">
            <span class="menu-icon">📱</span>
            <span class="menu-text">我的推广码</span>
            <span class="menu-arrow">></span>
        </div>
    </div>
    """, unsafe_allow_html=True)

# 主界面
def main():
    # 页面标题
    page_titles = {
        'home': '团购小程序',
        'category': '分类',
        'marketing': '营销中心',
        'cart': '购物车',
        'profile': '我的'
    }
    
    # 创建列布局
    col1, col2, col3 = st.columns([1, 1, 1])
    
    with col2:
        st.markdown(f"<div class='nav-bar'>{page_titles[st.session_state.current_page]}</div>", unsafe_allow_html=True)
    
    # 渲染页面内容
    st.markdown("""
    <div class="phone-container">
        <div class="screen">
            <div class="status-bar">
                <span>9:41</span>
                <span>📶 🔋</span>
            </div>
            <div class="app-container">
                <div class="content">
    """, unsafe_allow_html=True)
    
    render_page()
    
    st.markdown("""
                </div>
            </div>
            <div class="tab-bar">
    """, unsafe_allow_html=True)
    
    # 底部导航栏
    tabs = [
        ('home', '🏠', '首页'),
        ('category', '📂', '分类'),
        ('marketing', '📊', '营销中心'),
        ('cart', '🛒', '购物车'),
        ('profile', '👤', '我的')
    ]
    
    for tab_id, icon, label in tabs:
        active_class = 'active' if st.session_state.current_page == tab_id else ''
        st.markdown(f"""
        <div class="tab-item {active_class}">
            <div class="tab-icon">{icon}</div>
            <div>{label}</div>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("""
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # 添加交互按钮
    st.markdown("---")
    st.markdown("### 页面导航")
    
    col1, col2, col3, col4, col5 = st.columns(5)
    
    with col1:
        if st.button("🏠 首页", use_container_width=True):
            switch_page('home')
    
    with col2:
        if st.button("📂 分类", use_container_width=True):
            switch_page('category')
    
    with col3:
        if st.button("📊 营销", use_container_width=True):
            switch_page('marketing')
    
    with col4:
        if st.button("🛒 购物车", use_container_width=True):
            switch_page('cart')
    
    with col5:
        if st.button("👤 我的", use_container_width=True):
            switch_page('profile')
    
    # 购物车操作
    if st.session_state.current_page == 'cart':
        st.markdown("### 购物车操作")
        col1, col2 = st.columns(2)
        
        with col1:
            if st.button("清空购物车", use_container_width=True):
                st.session_state.cart_items = []
                st.rerun()
        
        with col2:
            if st.button("添加商品", use_container_width=True):
                new_item = {
                    'id': len(st.session_state.cart_items) + 1,
                    'title': '新商品',
                    'price': 19.9,
                    'quantity': 1,
                    'emoji': '🛍️'
                }
                st.session_state.cart_items.append(new_item)
                st.rerun()

if __name__ == "__main__":
    main()
