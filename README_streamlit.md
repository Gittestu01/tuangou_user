# 团购小程序 Streamlit 手机端原型

## 项目简介

这是一个使用 Streamlit 构建的团购小程序手机端原型，可以在线部署和分享。

## 功能特点

### 📱 手机端设计
- 模拟真实手机界面
- 响应式布局适配
- 触摸友好的交互设计

### 🛒 核心功能
- **首页**：搜索栏、定位、Banner、开团商品列表
- **分类页**：商品分类浏览
- **营销中心**：用户信息、推广功能、团长申请
- **购物车**：商品管理、数量控制、结算
- **我的页面**：个人信息、订单管理、功能菜单

### 🎨 交互效果
- 页面切换动画
- 商品点击效果
- 数量增减控制
- 购物车实时更新

## 部署方式

### 1. 本地运行
```bash
# 安装依赖
pip install -r requirements.txt

# 运行应用
streamlit run main.py
```

### 2. Streamlit Cloud 部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [Streamlit Cloud](https://share.streamlit.io)
3. 连接 GitHub 仓库
4. 选择 `main.py` 作为主文件
5. 点击 Deploy

### 3. Heroku 部署

1. 创建 `Procfile`：
```
web: streamlit run main.py --server.port=$PORT --server.address=0.0.0.0
```

2. 部署到 Heroku：
```bash
heroku create your-app-name
git push heroku main
```

### 4. Railway 部署

1. 连接 GitHub 仓库
2. 选择 `main.py` 作为启动文件
3. 自动部署

## 项目结构

```
├── main.py              # 主应用文件
├── requirements.txt     # Python 依赖
├── README_streamlit.md  # 项目说明
└── deploy.md           # 部署指南
```

## 技术栈

- **前端框架**：Streamlit
- **样式**：CSS + HTML
- **状态管理**：Streamlit Session State
- **部署平台**：Streamlit Cloud / Heroku / Railway

## 主要功能

### 1. 页面切换
- 使用 Streamlit Session State 管理页面状态
- 底部导航栏切换页面
- 流畅的页面过渡效果

### 2. 购物车功能
- 添加/删除商品
- 数量增减控制
- 实时计算总价
- 清空购物车

### 3. 响应式设计
- 适配不同屏幕尺寸
- 手机端优化
- 触摸友好的交互

### 4. 数据持久化
- 使用 Session State 保存数据
- 页面刷新后数据保持
- 购物车状态管理

## 自定义修改

### 修改主题颜色
在 `main.py` 中找到 CSS 样式，修改颜色值：
```css
.primary-color {
    color: #ff6b35;  /* 修改为主题色 */
}
```

### 添加新页面
1. 在 `render_page()` 函数中添加新页面条件
2. 创建对应的渲染函数
3. 在底部导航栏添加新标签

### 修改商品数据
在 `st.session_state.cart_items` 中修改商品信息：
```python
cart_items = [
    {
        'id': 1,
        'title': '商品名称',
        'price': 29.9,
        'quantity': 1,
        'emoji': '🍓'
    }
]
```

## 部署后的访问链接

部署成功后，您将获得一个可分享的链接，例如：
- `https://your-app-name.streamlit.app`
- `https://your-app-name.herokuapp.com`
- `https://your-app-name.railway.app`

## 注意事项

1. **数据持久化**：当前使用 Session State，页面刷新后数据会重置
2. **性能优化**：大量数据时可能需要优化渲染性能
3. **移动端适配**：建议在手机浏览器中测试效果
4. **样式兼容**：确保 CSS 样式在不同浏览器中正常显示

## 扩展功能

### 可以添加的功能
- 用户登录注册
- 商品搜索功能
- 订单管理
- 支付集成
- 数据可视化
- 实时聊天

### 技术改进
- 使用数据库存储数据
- 添加 API 接口
- 实现用户认证
- 优化移动端体验

## 故障排除

### 常见问题
1. **页面不显示**：检查 CSS 样式是否正确
2. **按钮无响应**：确认 JavaScript 代码是否正确
3. **样式错乱**：检查 CSS 选择器是否冲突
4. **部署失败**：检查 `requirements.txt` 依赖是否正确

### 调试技巧
- 使用 `st.write()` 输出调试信息
- 检查浏览器开发者工具
- 查看 Streamlit 日志输出

## 联系支持

如有问题或建议，请联系开发团队。

---

**注意**：这是一个原型演示项目，实际生产环境需要添加更多功能和安全措施。
