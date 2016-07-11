---
layout: post
title: 学习基础 Git  命令
subtitle: 入门的 Gi命令
author: Fu_sion
date: 2016-05-01 09:34:57 +0800
categories: git update
tag: Git 学习
---



## 获取与创建项目命令

[Git 在线编辑教程](https://try.github.io)

git init

```
$ mkdir Fu_sion
$ cd Fu_sion/
//初始化git仓库
$ git init
```

生成仓库后可以用命令`$ ls`来查看是否创建成功 `-a` 显示 隐藏的文件\夹

```
$ ls -a
```

git clone
用clone下载一个远程Git仓库到本地，创建分支或者进行修改

```
$ git clone https://github.com/SionFu/SionFu.github.io.git
```
下载完后就会在本地创建一个与仓库名一样的文件夹`SionFu.github.io`
接下来进入到这个文件夹中`$ cd SionFu.github.io`
默认情况下是创建于仓库名一样的名字，如果需要重命名，可以在后面添加上你想要的文件夹名字`git clone https://github.com/SionFu/SionFu.github.io.git Test`
顺便放上删除文件夹的命令 `$ rm -rf Test`

git add
用add命令来将修改或者添加的文件 添加到缓存中

```
$ touch README
$ touch hello.php
$ ls 
README		hello.php
$ git status -s
?? README
?? hello.php
$ 
```

git status 
该命令用来查看项目的当前状态
将创建的文件添加到缓存，下面两行命令的效果一样 前面的是将整个文件夹进行 添加

```
$ git add .
$ git add README hello.php
```

```
$ git status -s
A  README
A  hello.php
```

添加文件夹为A
下面修改文件内容

```
$ vim README
<p>在README文件中添加一下内容: <b>#Git 测试</b>, 然后保存退出。</p>
<p>再执行下 git status</p>
$ git status -s
AM README
A  hello.php

```
`AM`意思就是在这个文件在我们将他添加到缓存之后又有改动, 改动后用 `$ git add` 命令来将其添加到缓存中;


```
$ git add README
$ git status -s
A  README
A  hello.php
```

提交到缓存用 `add` 命令 如果是提交到服务器仓库用 `$ git push` ;

git status
该命令可以查看 本地当前的内容与上次提交的内容的差别 `-s` 可以简短的输出结果, 如果没有参数则输出


```
$ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   README
	new file:   hello.php

localhost:test tarena$ git status -s
A  README
A  hello.php
```

git diff
该命令用来查看 比执行 `git status` 更加详细的信息;
`$ git diff `命令显示写入缓存与已修改但是没有写入缓存的改动区别, 主要的引用场景有:
1. 还没有缓存的改动: `$ git diff`
2. 已经缓存的改动(提交缓存中的与提交前的更改): `$ git diff --cached`
3. 查看已经缓存的与缓存已经提交之间的改动：`$ git diff HEAD`
4. 显示摘要而非整个diff：`$ git diff --stat `


```
$ git diff --stat
 README | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
`$ git status `显示的是上次提交更新后的更改或者写入缓存的改动, 而 git diff 一行一行的显示这些具体改动具体是啥。

下面是 `$ git diff --cached` 的执行效果


```
$ git diff --cached
diff --git a/README b/README
new file mode 100644
index 0000000..c0e39ad
--- /dev/null
+++ b/README
@@ -0,0 +1,2 @@
+<p>在README文件中添加一下内容:<b>#Git 测试</b>,然后保存退出。</p>
+<p>再执行下 git status</P>
diff --git a/hello.php b/hello.php
new file mode 100644
index 0000000..973b754
--- /dev/null
+++ b/hello.php
@@ -0,0 +1,3 @@
+<?php
+echo 'Fu_sion: fdson.com'
+?>
```

git commit 
使用 `$ git add` 命令是将 更改写到缓存区 ，执行 `$ git commit` 是将缓存的内容添加到仓库中。

这里设置的 `user.name` 可以是自己自定义，会显示到 GitHub 上的修改者上 
这里的 `user.email` 参数是必须是自己GitHub上的用户邮箱 

```
$ git config --global user.name Fu_sionWorkMac
$ git config --global user.email test@fdson.com
```
 查看 `git config ` 配置  `$ git config -L `

接下来写入缓存 , 并提交对 hello.php 的所有改动 


```
$ git add .
$ git status -s
A  README
A  hello.php
$ git commit -m 'first update'
[master (root-commit) 5a681fe] first update
 2 files changed, 5 insertions(+)
 create mode 100644 README
 create mode 100644 hello.php
```

上传快照后执行


```
$ git status
On branch master
nothing to commit, working directory clean
```

以上说明我们在最后一次提交之后没有做任何的改动 , `nothing to commit, working directory clean` 干净的工作目录
在进行项目前可以先执行这条语句,保证之后的更改可以恢复
每次进行 `$ git commit `之前只有缓存中有改变时才会执行命令行
可以用 `$ git diff --cached` 来查看缓存区与仓库代码之间的区别
而 `$ git status ` 是用来查看本地文件与缓存中的代码之间的区别
`$ git diff --HEAD` 查看缓存中与提交到仓库的代码之间的区别
	
更改-> 本地 ==> 更改->缓存  ==> 更改->提交

git rest HEAD

`$ git reset HEAD` 命令用于取消缓存的内容
小测试:

1. 先修改两个文件 
2. 将两个文件都提交到缓存区
3. 将hello.php文件从缓存区中reset
4. 提交缓存区的文件到仓库
5. 比较本地文件与缓存区中的区别


```

1.
$ vi hello.php
$ vi README

2.
$ git add .
$ git status -s
 M hello.php
  M README

3.
$ git reset HEAD -- hello.php
Unstaged changes after reset:
M	hello.php

4.
iMac-2:test tarena$ git commit '测试提交到缓存中 删除缓存 后提交到仓库 本地文件与缓存之间的区别'
Unstaged changes after reset:
M	hello.php

5.
$ git status -s
 M hello.php

```

git rm 
同时删除缓存区域本地的文件

删除 `test.php` 文件

```
$ ls
README		hello.php	test.php
$ git rm test.php
rm 'test.php'
$ ls
README		hello.php
```

 不从工作区中删除文件只删除缓存区中的文件使用 `--cached` 命令


```
$ git rm --cached README
rm 'README'
$ ls
README		hello.php
```

git rm 
重命名并添加到缓存中, 需要重命名的文件必须存在于缓存中, 否则不可重命名


```
$ git mv readme.txt test.tt
fatal: not under version control, source=readme.txt, destination=test.tt
git add .
$ git mv readme.txt test.tt
$ ls
hello.php	test.tt
```



查询需求 | 命令行
------- | -------
查看提交日志|`$ git log` 
查看简洁版的历史记录|`$ git log --oneline `
查看分支|`$ git log --oneline --graph`
倒序查看修改提交情况|`$ git log --reverse --oneline`
查看作者SionFu在项目中的修改提交情况|`$ git log --author=SionFu --oneline `
查询相关日期下的提交情况|`$ git log --oneline --before={3.weeks.ago} --after={2010-04-18} --no-merges`
滚回某个节点|`git reset --hard SHA 值`




	

