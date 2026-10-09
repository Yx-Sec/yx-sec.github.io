# 远山Sec · 网络安全博客

基于 Vite 与原生 JavaScript 的静态个人博客，包含文章、项目、关于页、留言板、主题切换和搜索等功能。站点名称为远山Sec，头像、介绍和文章素材已按个人博客内容配置。

## 本地运行

```bash
npm install
npm run dev
```

构建静态文件：

```bash
npm run build
```

## GitHub Pages

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 [https://yx-sec.github.io](https://yx-sec.github.io)。

## 修改内容

- 站点名称、简介、链接等配置在 `src/data.js`。
- 头像放入 `public/assets/` 后，在 `src/data.js` 设置 `portrait`。
- 文章以 Markdown 文件放入 `src/articles/`，图片和附件分别放入 `src/articles/images/` 与 `src/articles/files/`。
- 留言板目前未配置接收邮箱，补充 `contactEmail` 后才能发送。

## 许可与来源

博客程序基于 [N0tHer3/n0ther3.github.io](https://github.com/N0tHer3/n0ther3.github.io) 的 MIT 许可代码二次开发。请保留仓库中的原始 `LICENSE` 文件。原作者的文章、图片和其他个人资料未包含在本版本中。
