---
layout: post
title:  Swift 基本函数二
subtitle: 入门 swift 函数
author: Fu_sion
date: 2016-06-01 08:21:29 +0800
categories:  fdson update
tag:  学习 swift
---

## 闭包

```swift
//闭包 函数类型的变量 或者参数
//将一段逻辑代码分装起来  变成一个类似于变量的东西
//swift 如果一个函数的参数类型 是 函数类型 那么这个可以将这个等同代码传递给这个函数 或者将这个类型 和 这个参数相同的函数传递这个参数 这点要比OC的block灵活

/**
    闭包的语法
    {
        (参数列表) -> 返回值类型 in
        逻辑代码
    }
*/
//函数类型的别凉  闭包类型的变量
var sayHi : (Int, Int) ->Int
func add(a: Int, b: Int) ->Int {
    return a + b
}

sayHi = add

sayHi(1000, 1)
//直接将代码传给原来的额函数(相当于修改了原来的额代码)
sayHi = {
    (x: Int, y: Int) -> Int in return x * y
}

sayHi(3,2)
//设计一个 函数 有一个函数类型的参数 
var a = 100
var b = 200
func getRsesult(fun : (Int, Int) ->Int) ->Int {
    let restlt = fun(a, b)
    return restlt
}
//直接传入一个函数
getRsesult(add)						//300

getRsesult {
    (x: Int ,y: Int) ->Int in return x - y
}

getRsesult { (x: Int, y: Int) ->Int in return x * y
    
}
//如果一个函数的参数 在参数列表最后 则这个参数 可以写在() 里面 也可以卸载园括号 外面
//我们把这个闭包 称之为 拖尾闭包 (尾随闭包Trailing Closures)
getRsesult { (x, y) -> Int in
    return x + y + 1 + 1000
}


```

##利用闭包函数实现冒泡排序

```swift
var data = [1, 10, 9, 5, 2, 7, 8, 1]
func popopoSort (inout data : [Int]){
    for var i = 0; i < data.count - 1; i++ {
        for var j = 0; j < data.count - i - 1; j++ {
            if data[j] > data[j+1] {
                let temp = data[j]
                data[j] = data[j+1]
                data[j+1] = temp
            }
            
        }
    }
}

popopoSort(&data)
data

func popopoSort2 (inout data : [Int], function : (Int, Int) ->Bool){
    for var i = 0; i < data.count - 1; i++ {
        for var j = 0; j < data.count - i - 1; j++ {
            if function(data[j] , data[j+1]) {
                let temp = data[j]
                data[j] = data[j+1]
                data[j+1] = temp
            }
            
        }
    }
}

func rule (x: Int, y: Int) ->Bool {
    return x > y
}

popopoSort2(&data) {
    (x: Int, y: Int) -> Bool in return x < y
}
//参数类型可以省略
popopoSort2(&data) { (a, b) -> Bool in
    return a < b
}
//返回值可以省略
popopoSort2(&data) { (i, o)  in
    return i > o
}
//如果只有一条语句 return 也可以省略
popopoSort2(&data) {
    (a, b) in a < b
}

//参数名也可以省略
popopoSort2(&data) {
    $0 > $1
}

//只有逻辑
popopoSort2(&data, function: > )


```

### 函数的闭包小练习

```swift
/**
    写一个函数 要第一个参数传入一个Int型参数 第二个参数是一个函数 () ->Int, 第三个参数是String型参数, 第四个参数是一个函数类型 Void ->Viod 如果第一个参数大于10 就调用第二个参数, 然后随意传入一个值, 测试这个函数
*/

func substring (i : Int, function : () ->Int, str : String, function1: Void ->Void) {
    if i > 10 {
        function()
    }else{
        function1()
    }
}

substring(5, function: { () -> Int in
    print("this fun")
        return 1
    }, str: "123") { (Void) -> Void in
        print("this fun1")
}

substring(6, function: { () -> Int in
    print("test")
    return 1
    }, str: "12", function1: { Void -> Void in
        print("this fun1")
})
substring(7, function: { () -> Int in
    print("this fun")
    return 1
    }, str: "123",function1: { print("this fun1")
})

```

##枚举

```swift
//枚举
enum CompassPoint {
    case Ease
    case West
    case Sourth
    case North
    //枚举中可以定义方法 可以用self
    func show() {
        print(self)
    }
}

var p1 = CompassPoint.Ease
var p2 = CompassPoint.West
p1.show()

switch p1 {
case.Ease:
    print("东")
case.West:
    print("西")
case.Sourth:
    print("南")
case.North:
    print("北")
}


var p3 :CompassPoint = .Sourth

switch p3 {
case.Ease:
    print("东")
case.West:
    print("西")
case.Sourth:
    print("南")
case.North:
    print("北")
}


//简化写法
enum CompassPoint2 {
    case East, West, Sourth, North
}

var p4 : CompassPoint2 = .North

//原始值(裸值)
enum week : Int {
    case Sum, Mon, Tur, Wen,Thu, Fir, Sat
    func show(){
        print(self)
    }
}

var WeekDay : Int = week.Mon.rawValue
WeekDay = week.Fir.rawValue

//使用裸值 来构建枚举变量 4
var varWeek : week? = week(rawValue: 14)
//varWeek!.shaw()
varWeek?.show()

```

##结构体和类

```swift
/**
结构体和类的区别
    1. 结构体 和类 都能表达一种类型
    2. 都可以在内部定义属性 和方法
    3. 都可以定义下标运算符 arr[]
    4. 都可以定义初始化器(类似于oc的初始化方法init) 也叫初始化方法 构造器 或者将构造方法
    5. 够可以写扩展extension (oc中叫分类 叫扩展)
    6. 都可以准守协议 实现协议
不同点
    1. 类可以继承 结构体不能
    2. 类有多态性 结构体没有
    3. 类的内存支持自动引用计数 结构体不支持 结构体变量都是在栈中分配内存作出了域 自动释放
    4. 类是引用类型 结构体是值类型
*/

struct Resloution {
    var with : Float
    var heigth : Float
}

var r = Resloution(with: 100, heigth: 200)
//如果 结构体的所有的属性都初始化了 则编译器会提供一个逐一初始化器 和一个无参初始化器
struct Resloution2 {
    var with : Float = 0.0
    var height :Float = 0.5
}

var r2 = Resloution2()

// 类中的属性 必须进行初始化 除非他是可选类型
class VideoModel{
    var resloution : Resloution = Resloution(with: 320, heigth: 240)
    var fraeRate : Float = 0.0
    var name : String?
}
var vmode1 = VideoModel()
var vmode2 = VideoModel()
var vmode3 = VideoModel()
print(unsafeAddressOf(vmode1))
print(unsafeAddressOf(vmode2))

if vmode1 === vmode2 {
    print("v1和v2相等")
}else{
    print("v1和v2不相等")
}



```

##属性

```swift
/*
    Swift 中的属性 有两种分类方式
    第一种方式:
        存储属性:(store properties)
            用变量或者常量来存储属性的值
        计算属性:(calculate properties)
            不是通过变量或者产量存储性值
            是属性的值通过计算获得
    第二种方式:
        实例属性
        类型属性
**/

struct MyRange {
    //存储区
    var location : Int
    // 存储属性 座椅初始化器 可以给产量初始化
    let lenth : Int
}
var mr = MyRange(location: 100, lenth: 400)
mr.lenth
mr.location
//计算属性
struct Point {
    var x = 0.0 , y = 0.0
}

struct Size {
    var w = 0.0 ,h = 0.0
}
struct Rect {
    //存储属性
    var origin = Point()
    var size = Size()
    //中心点 计算属性 提供了get 和set 方法的计算属性
            //只提供了get 属性 只读
    var center : Point {
        get {
            let centerX = origin.x + size.w * 0.5
            let centerY = origin.y + size.h * 0.5
            return Point(x: centerX, y: centerY)
//        }set (newCenter){
//            let newOriX = newCenter.x - size.w * 0.5
//            let newOriY = newCenter.y - size.h * 0.5
//            origin = Point(x:newOriX , y:newOriY)
//        }
        } set {//未提供set方法 只提供了get方法
                let newOriX = newValue.x - size.w * 0.5
                let newOriY = newValue.y - size.h * 0.5
                origin = Point(x:newOriX , y:newOriY)
            }

    }
}
var r = Rect(origin: Point(x: 0, y: 0), size: Size(w: 100,h: 100))
r.center.x
r.center.y

```

##延迟属性

```swift
//一定要有存储空间  存储属性 类似于OC中的懒加载
class DataImporter{
    init() {
        print("DataImporter 被创建")
    }
    var fileName = "data.txt"
}
class DataManager {
   lazy var dataImporter = DataImporter()  //添加关键词 lazy 延迟加载
    var dataImport = [String]()
}
var dataManager = DataManager()
var dataImporter = DataImporter()
```

##属性监视器

```swift
/**
    属性监视器
    是一段代码 这段代码在属性变化时调用
    1. 计算属性 延迟属性 不能设置属性监视器 存储属性可以
    2. 属性监视器 在属性初始化时 不调用
    3. 属性监视器有两种
        willSet  didSet
    4. 一个属性 可以有一个属性监视器 也可以有两个
*/
class StepCounter {
    //存储属性
    var labelText = "文本内容"
    var a : Int = 10
    //只读计算属性
    var
    b : Int {
//        get{
        //如果只有一行代码get 可以省略
        return a + 10
//        }
    }
    //存储属性, 有属性监视器  只要是有get set必然是存储属性
    var totalSteps : Int /*= 100000*/{
    
        willSet (newValue){
           print("属性将要变成:\(newValue)现在是\(totalSteps)")
        }
        didSet{
        print("属性将要变成:\(oldValue)现在是\(totalSteps)")
        }
    }
    init(){
        totalSteps = 1002
    }
}

var stepCounter = StepCounter()
stepCounter.totalSteps = 1998
stepCounter.totalSteps = 2016
```


