

##1.更新gem

```
sudo gem update —system
```
##2.替换源

```gem sources --remove https://rubygems.org/   执行失败的话,可以跳过该句不管
gem sources -a https://ruby.taobao.org/
gem sources -l
```
## 3.安装

```$ sudo gem install cocoa pods
macOS 10.11以后用
sudo gem install -n /usr/local/bin cocoapods
$ pod setup
```
## 4.安装完毕
到此cocoa pod安装完毕，如有问题参考8，9；以下为实例应用及问题

<!--文／ColdYi（简书作者）
原文链接：http://www.jianshu.com/p/ab6575600cf8
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。-->
 终端以此输入:
			查看当前源   gem sources
			1. 输入pod ,如果打印出好多东西,则说明成功了
			2. 搜索 pod search AFNetworking
	

#解决步骤：

1.为了安全起见，执行命令`sudo gem uninstall cocoapods`，卸载原有的CocoaPod

2.执行命令`sudo gem install -n /usr/local/bin cocoapods`来重新安装cocoapod

3.如果没有权限执行pod，执行命令`sudo chmod +rx /usr/local/bin/`，赋予`/usr/local/bin`给予执行与读取权限

<!--文／浮在空中的笨鱼（简书作者）
原文链接：http://www.jianshu.com/p/6ff1903c3f11
著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。-->

