---
layout: post
title:  Swift 基本数据类型
subtitle: 入门 swift 数据类型
author: Fu_sion
date: 2016-05-22 20:26:29 +0800
categories:  fdson update
tag:  学习 swift
---
##基本类型
Swift 是强类型语言

- var 声明变量
- let 声明常量
- 定义常量 和 变量


```swift
var str = "HelloWord"
let str = "HelloWord"
```
- 类型标注

```swift
var str : String //声明变量 str 为 String 类型 只能赋值字符串
```

- 强类型转换

```swift
var int = 12;
var double = 3.14
//int = double //不支持隐式类型转换
int = Int(double)
```
- 字符串的拼接


```swift
var label = "This is"
var label1 = "Label"
var test = label + label1
var with = 60 
//int 类型和字符串拼接
var test1 = test + "的宽度为:" +String(with)
```

- Swift 中的类型

- 整型


```swift
var i : Int 
var.max
var.min
//Int 默认为 Int64
```

- 浮点

```swift
var f1 : Float
var f2 : Float80
var f3 : float64
// Double 是 Float64 的	别名,在 Swift 中没有 Dubele

```

- 布尔

``` swift
var isBool :Bool
//布尔值不能用1 0 来赋值
isBool = ture
isBool = false
```

- 计算一个类型的大小


```swift
sizeof(Int) 	//8byte
sizeof(Float)	//4byte
sizeof(Int8)	//1byte

```

- 字符串和字符

```swift
var str:String //字符串直接标注,未使用时不能判断是否为空
//给字符串赋空值的几种方法
var str1 = ""
var str = String()
//判断字符按串是否为空
if str.isEmpty {
	print("strIsEmpty")
}
```

- 变量字符串在 swift 中不是用指针来引用的
- 在 swift 中可以用 OC 的 语法
- 变量字符串的拼接

```swift
var i1 = 10
var i2 = i1
i1 = 20
print(q2) //20
//引用类型 引用 OC 类型
var str_ns : NSMutableString = "Hello World"
var str2_ns = str_ns  //引用类型 起了一个别名
str_ns .appendString("String")//"Hello WorldString"
print(str2_ns)		           	//"Hello WorldString"
let constrString = "常量"
var variable = "变量"
variable += constrString //变量常量

```

- Swift 中的编码字符为 UNICODE 支持所有字符,包括表情符号

