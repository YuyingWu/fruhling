# Hugo Frühling 主题

这个 [Hugo](https://gohugo.io/) 主题最初为 [Romka!eu](https://romka.eu/en) 博客开发，目前版本为中英文配置的二次开发，以及做了一些主题模块的调整。

该主题使用了以下 JavaScript 库：
- [lightgallery](https://www.lightgalleryjs.com/)：提供图片查看和交互功能
- [masonry](https://masonry.desandro.com/)：提供瀑布流布局
- [swiper](https://swiperjs.com/)：提供轮播图功能

Lightgallery 是一个免费开源的库。但是，如果您想在商业网站、项目和应用中合法使用它，您应该购买许可证并将许可证密钥插入配置中：
```
[lightgallery]
    licenseKey = '您的许可证密钥'
```

## 功能特点
Frühling 主题定义了四种内容类型：
- 两种基于文本的类型：_blog_（博客）和 _note_（笔记）
- 两种基于照片的类型：_gallery_（图库）和 _story_（故事）

每种内容类型都有独特的模板：博客和图库的设计比笔记和故事更加丰富和复杂。

### 内容类型与图片支持

#### Gallery（图库）
Gallery 类型同时支持本地图片和 Markdown 图片语法。Markdown 内容中的图片将优先显示，其次是目录中的本地图片。

```markdown
---
title: 我的图库
type: gallery
---

![图片标题;图片描述](https://example.com/image.jpg)
![另一个标题;另一个描述](https://example.com/another.jpg)

# 同一目录下的本地图片将在 Markdown 图片之后显示
```

#### Story（故事）
与 Gallery 类似，Story 类型同时支持 Markdown 图片和本地图片，Markdown 图片优先显示。

```markdown
---
title: 我的故事
type: story
---

![图片标题;图片描述](https://example.com/image.jpg)
![另一个标题;另一个描述](https://example.com/another.jpg)

这里是您的故事内容...
```

#### Blog（博客）和 Note（笔记）
Blog 和 Note 类型都支持 Markdown 图片语法和多种图片相关的简码（shortcode）：

1. 基本图片简码：
```
{{</* img "image.jpg" "图片标题" */>}}      # 用于本地图片
{{</* img "https://example.com/image.jpg" "图片标题" */>}}  # 用于外部图片
```

2. 右对齐图片：
```
{{</* img-right "image.jpg" "图片标题" */>}}
{{</* img-right "https://example.com/image.jpg" "图片标题" */>}}
```

3. 引用其他文章的图片：
```
{{</* rel-img "文章路径" "image.jpg" "图片标题" */>}}
{{</* rel-img "文章路径" "https://example.com/image.jpg" "图片标题" */>}}
```

#### 博客摘要设置
博客文章支持两种摘要生成方式：

1. 使用 `<!--more-->` 标记：在文章中插入 `<!--more-->` 标记，该标记之前的内容将作为摘要显示在列表页面。
2. 自动截断：如果没有 `<!--more-->` 标记，系统将根据配置的字符数自动截断内容作为摘要。

可以在配置文件中设置摘要长度：
```toml
[fruhling]
    summaryLength = 150  # 设置摘要长度为150个字符
```

### 简码功能

除了自定义文章模板外，该主题还提供了几种简码：

- 两种可嵌入文章的图库类型：`embedded-gallery` 和 `embedded-local-gallery`。这些图库可以包含照片和视频
- 多种自定义图片简码
- `{{< more >}}` 简码，用于插入一个 ID 为 `#read-more` 的 div，使用户可以从"阅读更多"链接导航到页面上的特定位置

有关可用简码的更多详细信息，请参阅 `layouts/shortcodes` 目录。

### Photomosaic 设置

该主题在页面头部显示一个 _photomosaic_ 区块——一行随机照片，这些照片从 `content` 目录下的所有可用照片中聚合而来。每个页面可以有自己的 photomosaic，但出于性能考虑，默认情况下生成的 photomosaic 数量是有限的，可以在配置文件中调整：

```toml
[photomosaic]
    numberOfUniqueMosaics = 25  # 限制生成的photomosaic数量
    enabled = true              # 控制是否显示photomosaic，设置为false可临时禁用
```

如果您想临时禁用photomosaic功能（例如在开发过程中提高页面加载速度），可以将`enabled`设置为`false`。这样页面仍会显示标题，但不会加载photomosaic图片。

### 图片交互功能

主题集成了lightGallery库，为图片提供了丰富的交互体验：

1. 点击图片可放大查看
2. 支持图片间的导航（前一张/后一张）
3. 支持全屏查看
4. 支持缩略图导航
5. 点击图片或黑色背景区域可关闭查看器

这些交互功能适用于所有内容类型（博客、笔记、图库和故事）中的图片。