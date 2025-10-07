# Closr Web

一个基于 Vue 3 + TypeScript + Element Plus 的现代化 Web 应用，支持多语言国际化，提供完整的项目管理和用户界面。

## 🚀 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Element Plus** - Vue 3 组件库
- **Pinia** - Vue 状态管理
- **Vue Router** - 官方路由管理器
- **Vue I18n** - 国际化解决方案
- **UnoCSS** - 原子化 CSS 引擎
- **Sass** - CSS 预处理器

## 📋 环境要求

- **Node.js**: >= 22.x
- **pnpm**: >= 9.x

## 🛠️ 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install
```

## 🏃‍♂️ 运行项目

### 开发环境

```bash
# 启动开发服务器
pnpm dev

# 或者指定主机地址
pnpm dev --host
```

开发服务器将在 `http://localhost:5173` 启动，支持热重载。

### 生产构建

```bash
# 构建生产版本
pnpm build
```

### 预览生产构建

```bash
# 预览生产构建结果
pnpm preview
```

## 🧪 测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

## 🔍 代码质量

### ESLint 检查

```bash
# 检查代码规范
pnpm lint

# 自动修复可修复的问题
pnpm lint:fix
```

### Stylelint 检查

```bash
# 检查样式规范
pnpm stylelint

# 自动修复样式问题
pnpm stylelint:fix
```

## 📁 项目结构

```
src/
├── assets/           # 静态资源
│   ├── fonts/        # 字体文件
│   ├── images/       # 图片资源
│   └── svg/          # SVG 图标
├── components/       # 公共组件
│   ├── Layout/       # 布局组件
│   ├── Navigation/   # 导航组件
│   └── ...
├── hooks/           # 组合式函数
├── locales/         # 国际化配置
├── modules/         # 业务模块
│   ├── Project/     # 项目管理模块
│   ├── Result/      # 结果模块
│   └── UserAccount/ # 用户账户模块
├── router/          # 路由配置
├── store/           # 状态管理
├── styles/          # 全局样式
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
└── widgets/         # 小部件
```

## 🎨 功能特性

### 项目管理模块
- ✅ 项目列表展示
- ✅ 项目创建表单
- ✅ 移动端/桌面端响应式设计
- ✅ 实时预览功能
- ✅ 社交媒体链接管理
- ✅ 标签系统

### 组件化架构
- ✅ 模块化组件设计
- ✅ 可复用的业务组件
- ✅ 清晰的组件职责分离
- ✅ TypeScript 类型安全

### 开发体验
- ✅ 热重载开发
- ✅ 自动导入
- ✅ 代码规范检查
- ✅ 单元测试支持

## 🌐 国际化

项目支持多语言切换：

- 🇺🇸 English
- 🇨🇳 简体中文

语言文件位于 `src/locales/` 目录下。

## 📱 响应式设计

项目采用移动端优先的响应式设计：

- **移动端**: < 768px
- **桌面端**: >= 768px

## 🔧 开发工具

### 自动导入
项目配置了自动导入，无需手动导入：
- Vue 3 Composition API
- Vue Router
- Pinia
- Element Plus 组件

### 代码规范
- ESLint + TypeScript
- Stylelint + SCSS
- Husky Git Hooks
- Lint-staged

## 📦 部署

### GitHub Pages 部署

```bash
# 构建并部署到 GitHub Pages
pnpm deploy:gh-pages
```