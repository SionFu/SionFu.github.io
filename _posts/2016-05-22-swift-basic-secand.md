---
layout: post
title:  Swift 基本数据类型二
subtitle: 入门 swift 数据类型二
author: Fu_sion
date: 2016-05-31 18:43:29 +0800
categories:  fdson update
tag:  学习 swift
---

[Swift 基本数据类型一 http://fdson.com/swift-basic.html](http://fdson.com/swift-basic.html)

##元组

- 元组的定义和访问

```swift
//元祖 Tuple 将多个数据(可以是相同,也可以是不同的数据组织到一起 和C语言的结构体类似)
("姓名","张三","年龄",13)//有四个属性
//必须赋值或者声明属性
let http404Error : (Int, String)
http404Error = (404, "NotFind")
//访问数据
http404Error.0
http404Error.1
//声明一个员工元祖 包括员工 员工年龄 月薪 并访问相应的数据
let oneEmp :(String, Int, Double) = ("张三", 15, 30_000)
oneEmp.0
oneEmp.1
oneEmp.2
//提高可读性
let http400Error : (code : Int, description: NSString)
var http500Error = (code : 500, description : "server Error")
http404Error

//可以通过key来取值
 http500Error.code
http500Error.description

```

- 元组和Switch

```swift
let onePrint = (0, 112)
/**
    判断一个点是否在原点上 如果在就输出 在原点上
    判断这个点是否在x轴上  如果在就输出 在x轴上
    判断这个点是否在y轴上  如果是就输出 在y轴上
    判断这个点是否在 -20, 20, -20, 20 矩形范围内 否则输出在其他位置
*/

switch onePrint {
case (0, 0):
    print("在原点上")
case (_, 0):
    print("在x轴上")
case (0, _):
    print("在y轴上")
case (-20 ... 20, -20 ... 20):
    print("在这个矩形里")
default:
    print("不在这个范围内")
}
/**
写一个程序 定义一个元组 代表一个点 
    判断这个点是不是在x == y 的斜线 上 如果在就答应x 和 y相等的斜线1 上
    在判断这个点是不是在 x == -y 的斜线2上 如果是就答应在 反斜线上
    如果还不是 就打印不在斜线 和反斜线上
*/

let otherPrint : (Int, Int)
otherPrint = (4, -4)					//(.0 4, .1 -4)
otherPrint.0							//4
otherPrint.1							//-4
if otherPrint.0 == otherPrint.1 {
    print("在斜线上")
}else if otherPrint.0 == -otherPrint.1 {
    print("在反斜线上")					//"在反斜线上\n"
}else{
    print("不在斜线上")
}


switch otherPrint {
case let(x, y) where x == y :
    print("在斜线上")
case let(x, y) where x == -y :
    print("在反斜线上")					//"在反斜线上\n"
default:
    print("不在线上")
}

```
##可选类型 自动解包

```swift
/**
只要可选值类型的 才可以赋值为nil
如果是可选值类型 则自动初始化nil
类型? 这是可选值类型的简写形式
*/

var y : Int?								//nil
y = nil									//nil
//规范的写法 Optional <类型>
var o : Optional<Int>
o = 100

let num = "123"						//"123"
"1" + "2"								//"12"
1 + 3									//4

//因为转换可能失败 失败就返回nil 所以这里使用可选类型接收
//如果不标注客服性比较差
let converNum  : Int? = Int(num)		//"123"
//可选类型需要解包之后 才能运算
//如果converNum 是nil 则解包会报错
//convernum! + 100

//为了安全 判断是够转换成功
if converNum == nil {
    print("fail")
}else {
    converNum! + 100					//"223"
}
 print(converNum)						//"Optional(123)\n"

let nn = converNum
//可选绑定 实际上是 是对上面程序的简化 自动对converNum进行了解包
if let myConver = converNum {
    print(myConver)
    myConver + 1000
}else {
    print(converNum)
}

//需要手动解包的类型 比较麻烦 所以引入一个叫可选自动解包的可选类型
//[自动解包Int!!!]使用之前 [[一定不能为空]]
var var_x : Int!
var_x = 19
var_x + 100

//使用故事板 创建组件类型 是 用的时候已经创建完毕 所以拽线 产生的是自动解包类型

var  userName : UITextField?

```

##断言

```swift
var x = 10001
assert(x != 100)

func testAssert(partX : Int) {
    //断言成立 程序才能继续运行
    assert(partX != 0 , "参数不能为零")
    print(100.0 / Double(partX))
    print(Double(partX)/100)
}
//只有在条件成立才会向下运行
testAssert(5)
```

##数组

```swift
//线性结构 顺序
//增 删 改 查 遍历
var arr : Array<Int> = [1,2,3,4,5,6,7,8,]   //<Int>范形

var arr2 : Array<String> = ["123", "321", "456"]

//定义数组的九种形式 (共9 种)

var array1 = Array<Int>()
var array2 : Array<Int> = Array<Int>() //最标准
var array3 : Array<Int> = Array()
var array4 : Array = Array<Int>()
var array5 : Array<Int> = [Int]()
var array6 : [Int] = Array()
var array7 : [Int] = [Int]()
var array8 = [1,2,3,4]

//都有 " = " 代表赋值
var array9 : [Int]?
array9 = nil
//没有值不能操作 必须先赋值 其他8 种都可以操作
array9?.append(123)
array1.append(123)

var shoppingList = ["帽子", "鞋子", "衬衫"]
shoppingList.append("手机")
shoppingList.append("👌")
//尾部增加一个数组
shoppingList += ["🍎", "🚗", "👩"]
//在是定位置增加 其他元素后移 
shoppingList .insert("", atIndex: 0)
//删除指定位置
shoppingList.removeAtIndex(0)
//删除第一个(往后的几个)
shoppingList.removeFirst(2)
//删除最后一个
shoppingList.removeLast()
//删除范围内的
var range = Range(start: 0, end: 3)
shoppingList.removeRange(range)
//删除所有
shoppingList.removeAll()
//修改数据
shoppingList[1]
shoppingList[1] = "回家"
//查询数组
shoppingList[1]
var subList = shoppingList[1 ... 3]
//遍历数组
for item in shoppingList {
    print(item)
}
for item in subList {
    print(item)
}

for var i = 0 ; i < shoppingList.count ; i++ {
    print(shoppingList[i])
}
//用for循环遍历子数组 要从下标1 开始!!
for var i = 1 ; i <= subList.count  ; i++ {
    print(subList[i])
}

```

##字典

```swift
var dictinary1 : Dictionary<String, Int> = Dictionary<String, Int>() //最标准的方式
var dictinary2  = Dictionary<String, Int>()
var dictinary3 : Dictionary = Dictionary<String, Int>()
var dictinary4 : Dictionary<String, Int> = Dictionary()
var dictinary5 : Dictionary<String, Int> = [String: Int]()
var dictinary6 : [String: Int] = [String: Int]()
var dictinary7 : [String: Int?] = ["age": nil]
var dictinary8 = ["age" :19, "name": "Fu"]
var dictinary9 : [String : Int]
dictinary1.isEmpty
//dictinary9.isEmpty
//没有赋值不能操作

//操作字典
var airports : [String: String] = ["PEK": "北京首都机场", "CAN": "广州机场", "SHA": "浦东国际机场"]
airports.count
//增加数据
airports["SAS"] = "深圳机场"
airports["FDD"] = "我的机场"
airports.updateValue("虹桥机场", forKey: "SHH")
airports.count
//删除数据
airports["FDD"] = nil
if let airport = airports.removeValueForKey("ASA") {
    print("done")
}else{
    print("fail")
}

//修改数据
if var airport = airports.updateValue("首都国际机场", forKey: "PEK") {
    print("done\(airport)")
}else{
    print("fail")
}

//查询数据
airports["PEK"]
airports["FFD"]

//遍历字典中的所有key
for airportKey in airports.keys {
    print(airportKey)
}
//遍历字典中的所有value
for airportValue in airports.values {
    print(airportValue)
}

//用key 或者 value 直接创建数组
let airpoarts = [String](airports.keys)
airpoarts[0]

//Swift 中的字典 是值类型 还是引用类型 
var dic : Dictionary = [1 : "one", 2 : "two"]
var dic2 = dic
dic[1] = "1⃣️"
dic2[1]   //证明swift中的dictionary是指类型

//使用oc的NSMutabledictionary
var nsdic : NSMutableDictionary = [1 : "one", 2 : "two"]

var nsdic2 = nsdic

nsdic[1] = "1⃣️"
nsdic2[1] //OC中的dictionary是引用(指针)类型

```

##Set集合

```swift
//Set 集合 特点就是不能有重复的数据
//提供操作集合的api
//消除重复数据
var letters : Set<Character> = Set<Character>()
letters.isEmpty
letters.count
letters.insert("A")
letters.insert("B")
letters.insert("A")
letters.count
letters.insert("C")
letters.count

var musics : Set<String>  = ["Rock", "Classical", "jazz"]
musics.isEmpty
musics.count
musics.insert("Jay")
musics.insert("jazz")
musics.insert("hip hop")
musics.insert("class")
musics.removeFirst()
//删除
if let jazz = musics.remove("jazz") {
    print(jazz)
}else{
    print("fail")
}
//遍历
for music in musics {
    print(music)
}

//排序
for music in musics.sort() {
    print(music)
}
//集合运算
let oddDigits : Set = [1, 2, 4, 5, 6, 9]
let evenDigits : Set = [0, 3, 7, 2]
//并集
var newNums = oddDigits.union(evenDigits)

//交集
newNums = oddDigits.intersect(evenDigits)

//差集
newNums = oddDigits.subtract(evenDigits)

//把两个几乎中 相同的元素取掉,用剩下的元素组成一个集合
newNums = oddDigits.exclusiveOr(evenDigits)


```


