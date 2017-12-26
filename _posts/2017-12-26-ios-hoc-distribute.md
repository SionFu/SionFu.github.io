---
layout: post
title: iOS 企业版发布流程
subtitle:  iOS 企业版本的发布流程记录
author: Fu_sion
date: 2017-12-26 16:25:13 +0800
categories: 
tag: 学习 iOS
---

## 发布内容需要三个文件

1. test.plist
2. test.ipa
3. app.html

将这三个文件放在根目录的 APPS 文件夹下

*需要注意的是 `.ipa` 文件名必须和 `.plist` 文件名一致,*
*`bundle-identifier` 必须和打包的包名内一致*


test.plist

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
					<string>https:/www.fdson.com/apps/xxx.ipa</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>full-size-image</string>
					<key>needs-shine</key>
					<false/>
					<key>url</key>
					<string>vhttps://www.fdson.com/apps/image.512x512.png</string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>needs-shine</key>
					<false/>
					<key>url</key>
					<string>https://www.fdson.com/apps/image.57x57.png</string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>com.fdson.test</string> /
				<key>bundle-version</key>
				<string>1.40</string>
				<key>kind</key>
				<string>software</string>
				<key>subtitle</key>
				<string>副标题（非必填）</string>
				<key>title</key>
				<string>巨化云办公</string>
			</dict>
		</dict>
	</array>
</dict>
</plist>

```

app.html
*这里的 plist文件 必须放置在 https 的地址下*

```
<!DOCTYPE html>
<html>
<head>
	<title>install App</title>
</head>
<body>
	<h2><center><a href="itms-services://?action=download-manifest&url=https://www.fdson.com/apps/test.plist" id="text">install fdson App</a> </center></h2>
</body>
</html>
```

这样访问以下地址就可以下载企业版本的 APP 了，需要在设置 -> 通用 -> 证书 -信任此证书

```
https://fdson.com/apps/test.html
```

<!---->
 
- 生成文件

![archive](https://raw.githubusercontent.com/SionFu/SionFu.github.io/master/_site/images/archive.png)

- 导出文件

![iosHoc](https://raw.githubusercontent.com/SionFu/SionFu.github.io/master/_site/images/iosHoc.png)


