---
layout: post
title:  Swift 基本数据类型
subtitle: 入门 swift 数据类型
author: Fu_sion
date: 2016-05-22 20:26:29 +0800
categories:  fdson update
tag:  学习 swift
---
## 基本类型
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

```swift
var 表情符号 = "🍨😱💃🏻"
```

- 通过字符串数组创建字符串

```swift
var catCharacter : [Character] = ["C", "c" , "t" ,"!"]
var catString = String(catCharacter)
```

- 字符串中的转译字符

```swift
 let myStr = "\"想象力比知识更重要\" \n --爱因斯坦"
```

- 字符串的格式化拼接

```swift
var hour = 2
var min = 11
var secand = 22
print("\(hour)小时\(min) 分钟\(secand) 秒")  //"2小时11 分钟22 秒\n"
var timeStr = "\(hour):\(min):\(secand)"      //"2:11:22"
timeStr = String(format: "%02d:%02d:%02d", hour,min,secand) //"02:11:22"
```

- 值类型 引用类型

```swift
//[结构体] 都是值类型  [类 类型] 都是引用类型
var str1 = "Hello"
var str2 = "World"
str1 += str2							//"HelloWorld"
str1									//"HelloWorld"
str2
print(unsafeAddressOf(str1))			//0x00007fa870c1c5b0
print(unsafeAddressOf(str2))			//0x00007fa870d10310

//引用类型
var refStr3 : NSMutableString = "hello"
var refStr4 = refStr3
refStr3
refStr4
print(unsafeAddressOf(refStr3))		//0x00007fa870f1f600
print(unsafeAddressOf(refStr4))		//0x00007fa870f1f600

//引用类型
var myStr1 : NSString = "Hello"
var myStr2 = myStr1;
myStr2 = "world"
print(unsafeAddressOf(myStr1))		//0x00007fa870c1c910
print(unsafeAddressOf(myStr2))		//0x00007fa870c19390

//改变指针指向
myStr1 = "Hello"
print(unsafeAddressOf(myStr1))		//0x00007fa870c13c60
```

- 运算符

```swift
var a,b,c,d,e,f,g :Int
a = 10
b = 5
//swif 中的运算符 本质上就是一个函数
//赋值运算符函数返回的值是Void
//a =  b = c = d = 10

a + b
a - b
a * b
//除法取整依旧存在
a / b
7 / 2
7 / 3.0
a = 10
//变量值 和表达式 表达式值
var x = a++ + ++a + ++a + a++	//48
var y = 10 + 12 + 13 + 13			//48
a									//14
//三目运算符号
a == b ? a:b
//只有可选类型 可以赋值为nil
//可选类型的意思就是指可以是nil
//可选类型 会自动赋值为nil
var z : Int?							//nil
z = nil								//nil
z = 100
//?? 运算符是三目的简写
var r = z != nil ?z :0
//?? 空合运算符 z不是空就用z 否则就是0
var r2 = z ?? 0

var r3 = z ?? 0


//区间 运算符
a = 5
b = 9

//这个区间
a...b         				  //5..<10

//半闭半开区间
a ..< b		 				//4..<9
```

- if 语句
	1. if 后面的圆括号可以省略
	2. 无论有多少条语句 大括号不能省略
	3. 只能使用布尔型的值作为判断条件 非零即真不再成里

```swift
var x = 10
var y = 20
if x > y {
    x
}else{
    y									//20
}

var score = 85
if score >= 90{
    print("A")
}else if score >= 80 {
    print("B")   						//"B\n"
}else if score >= 60 {
    print("C")
}else{
    print("D")
}

```

- if 语句

```Switch
/**
1. 完备性的问题 需要匹配所有的可能 一般会带default
2. 只要有default就必需出现在最后
3. 没有隐式贯穿 就是不用在后面加 break 也不会向下一个分支执行 如果下一个分支可以执行则使用fallthrough
4. 在switch 中case 块中出现了变量 不需要加大括号
*/
var x = 2
switch x{
case 0:
    print("0")
case 1:
    print("1")
case 2:
    print("2")					//"2\n"
    fallthrough
case 3:
    print("3")					//"3\n"
default:
    print("nono")
    
}
```

- for 循环

```swift
// 一行中出现多行语句 需要使用分号
var x = 10
var y = 10 ; var z = 100

//使用for循环 把一个变量从1循环到9 

for var i = 0 ; i < 10 ; i++ {
    print(i)
}
```
- while 循环

```swift
var i = 1

while i < 10{
    i++
    print(i)
}
// do while
i = 10
repeat {
print(i)
i++
} while i < 6
```

- 双重循环 退出 `break`后面可以跟标签
- 小练习 写一个循环 计算里面除了元音的字符

```swift
let message = "a place where people can play"
//写一个程序 统计了 除了 a e i o u 之外有多少个字符
var n = 0
for ch in message.characters {
    if ch == "a" || ch == "e" || ch == "i" || ch == "o" || ch == "u" {
        continue;
    }
    print(ch)
}
var count = 0
for ch in message.characters {
    switch ch {
        case "a", "e", "i", "o", "u":
            continue
    default:
        count++
    }
}
```

- break终止循环可以用标记

```swift
for var i = 0; i < 10 ; i++ {
    for var j = 0 ; j < 10 ; j++ {
        if j == 3 {
            //终止当前循环
            i = 11
            break
        }
        print("\(i) \(j)")
    }
}
outerloop: for var i = 0; i < 10 ; i++ {
    for var j = 0 ; j < 10 ; j++ {
        if j == 3 {
            //终止当前循环 break 后面可以跟标签
          break outerloop  
        }
        print("\(i) \(j)")
    }
}
```


