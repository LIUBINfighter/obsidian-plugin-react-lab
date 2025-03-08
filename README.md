# Obsidian React Lab Plugin

这是一个用于在 Obsidian 中进行 React 开发实验的插件平台。

设计哲学是：减少设置界面/模态框/原生边栏，将主要交互放在工作区。

![image](https://github.com/user-attachments/assets/c5c40a07-e2b7-4f2d-bc63-53f82bee1a77)

欢迎访问由 [raistlind](https://raistlind.github.io/obsidian-dev-docs-zh/) 创建，目前由我 Fork 并维护的[中文obsidian插件开发文档](https://liubinfighter.github.io/obsidian-dev-docs-zh/)！我正在致力于翻译优质社区内容和开发通用插件平台。

## 特性

- 完整的React开发环境配置
- TypeScript支持
- i18n国际化支持（i18next）
- Markdown渲染能力
- Obsidian插件基础功能

## 安装

1. 克隆此仓库到你的Obsidian插件目录
2. 进入插件目录
3. 安装依赖（如遇到依赖冲突，使用以下命令）：
```bash
npm i --legacy-peer-deps
```
4. 构建插件：
```bash
npm run build
```

## 开发

1. 克隆仓库后，运行：
```bash
npm run dev
```

2. 启用插件即可在Obsidian中进行开发和测试

## 功能

- React组件开发环境
- 国际化支持（中文/英文）
- Markdown渲染
- 内部链接支持
- 数学公式支持
- Mermaid图表支持

## 贡献

欢迎提交Issue和Pull Request！
