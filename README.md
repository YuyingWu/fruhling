# Hugo Frühling Theme

This [Hugo](https://gohugo.io/) theme has been developed for the [Romka!eu](https://romka.eu/en) blog, [where you can find](https://github.com/romka/romka/) a comprehensive demo showcasing the usage of this theme. A simplified demo is available in this repository https://github.com/romka/fruhling-demo, its rendered version is deployed to GitHub Pages: https://romka.github.io/fruhling-demo/.

The theme utilizes the following JavaScript libraries:
- [lightgallery](https://www.lightgalleryjs.com/),
- [masonry](https://masonry.desandro.com/),
- [swiper](https://swiperjs.com/).

Lightgallery is a free and open-source library. However, to use it legitimately for business, commercial sites, projects, and applications, you should purchase it and insert your license key into the configuration:
```
[lightgallery]
    licenseKey = 'your-license-key'
```

## Features
The Frühling theme defines four post types:
- two text-based types: _blog_ and _note_,
- and to photo-based types: _gallery_ and _story_.

Each of the content types has a distinct template: blogs and galleries are designed to be more extensive than their counterparts --- notes and stories.

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

In addition to custom post templates, the theme introduces several shortcodes:

- two types of galleries that can be embedded into a post: `embedded-gallery` and `embedded-local-gallery`. Galleries may contain both photos and videos,
- several custom shortcodes for images,
- the `{{< more >}}` shortcode, which inserts a div with the id `#read-more`, enabling users to navigate from the "read more" link to a custom position on a page.

For more details on available shortcodes, please refer to the `layouts/shortcodes` directory.

The theme is designed for users with a substantial number of photos to post. In the header, the theme displays a _photomosaic_ block --- a row with random photos aggregated from all the photos available under the `content` directory. Each page may have its own photomosaic, but by default, for performance reasons, the number of generated photomosaics is limited, and this can be adjusted in the configuration file:
```
[photomosaic]
    numberOfUniqueMosaics = 25
```