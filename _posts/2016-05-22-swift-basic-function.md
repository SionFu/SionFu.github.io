---
layout: post
title:  Swift 基本函数
subtitle: 入门 swift 函数
author: Fu_sion
date: 2016-06-01 08:18:29 +0800
categories:  fdson update
tag:  学习 swift
---

##定义一个函数

```swift
/**func 函数名(参数名 : 参数类型) -> 返回类型  {
函数部分
} */

func sayHello () -> (Void) {
    print("hello")
}
sayHello()
//没有返回值 可以省略返回类型
func sayHello2(){
    print("Hello2")
}
sayHello2()

//带参数 带返回值
func sayHello3(personName : String) -> String {
    let msg = "Hello" + personName
    print(msg)
    return msg
}

sayHello3(" me")

//设计一个函数 有参数 没有返回值
//把一个人的名字 和 年龄传入 然后在这个函数的内容打印传入的信息

func printInfo (name: String, age : Int)->(Void) {

    print("Hello: \(name)今年\(age) 岁")
}

printInfo("Fu_sion", age: 13)

let msgStr = "我我我爱爱爱你, 我想你, 我喜欢你, 我恨你, 我想回家"

func getNum (msgStr : String) -> (me: Int, you: Int, other: Int) {
    var m = 0, y = 0, o = 0
    
    for ch in msgStr.characters {
        switch ch {
        case "我":
        m++
        case "你":
        y++
        default:
        o++
        }
    }
    return (m,y,o)
}

let result = getNum(msgStr)
result.0
result.1
result.2

```

- 函数参数


```swift
//函数的参数
func fa(localeName: Int) -> Void {
    //localeName 是参数名
    //并且是内部名 就只是能在函数内部使用
    //默认函数的第一个参数 只是内部名
    print(localeName)
}
fa(100)
//可以给函数的参数 起外部名 
func fa(externName localeName: Int) {
    print(localeName)
}

//externalName 外部名只能在函数外部使用
fa(externName: 1000)

//显示一个人的信息
func show(name: String, age: Int) {
    print("\(name)\(age)")
}
//从第二个参数开始既是内部名 又是外部名
show("fusion", age: 132)

//如果不希望使用外部名 默认额外部名 可以自己写外部名
func pointWthX(x: Int,andY y: Int) {
    print("\(x)\(y)")
}

pointWthX(1, andY: 2)

//用C语言的方法 _ 去掉外部名
func pointWithY(x: Int, _ y: Int) {
    print("\(x)\(y)")
}
pointWithY(9, 2)
//所有外部名 都自己来
func pointWithXX(x x: Int, andY y:Int) {
    print("\(x)\(y)")
}

pointWithXX(x: 9, andY: 9)

```

- 函数的重载

```swift

/**
    函数重载(方法重载)
    两个或者以上的方法 方法名相同 参数列表不一样都可以形成重载关系
    参数列表不同: 参数的个数不同
                参数的类型不同
                参数的顺序不同
                swift 中的外部名不同
*/
func add(x: Int, y:Int) ->Int {
    print("add(x: Int, y:Int) ->Int")
    return x * y
}

func add(x: Double, y: Double) ->Double {
    return x + y
}

func add(x: Int, y: Double) ->Double {
    return Double(x) - y
}
//根据参数的传入情况 自动匹配相应的函数
add(99, y: 99)
add(99.0, y: 98.0)
add(2, y: 1.0)

```

- 函数的默认值和边长参数

```swift
/**
    一个函数的参数 可以设定默认值 
    如果这个参数不穿入值 则使用默认值 
    如果传入值 则会自动替代掉这个值
*/
func printArray(array: [Int], apli: String = ",", flag: Bool = true) {
    if flag {
        print("[")
    }
    for var i = 0; i < array.count - 1; i++ {
        print("\(array[i]) \(apli)")
    }
    print(array[array.count - 1])
    if flag{
        print("]")
    }
}

var array = [9, 5, 2,4]
printArray(array, apli: ",", flag: true)
printArray(array)
printArray(array, apli: "243")

//可变长参数
func getAvg(numbers: Double...) ->Double {
    var total = 0.0
    for num in numbers {
        total += num
    }
    return total / Double( numbers.count)
}
//可以传入n个值
getAvg(1, 2, 3, 4, 5, 6, 6)

```

- 函数的类型

```swift
//函数类型
//() -> void
//函数类型 也可以写成 () -> ()
func sayHello() -> Void {
    print("Hello")
}

//写出下面函数的类型
//函数类型 (Int, Int) -> Int
func addTwoInts(x :Int, y: Int) -> Int {
    return x + y
}
//(Int, Int) ->Int
func subTwoInt (x: Int, y: Int) ->Int {
    return x - y
}

//定义一个变量 用来保存
var function = addTwoInts
//使用function调用函数
function(100 , y: 200)
//标注函数不需要外部名
var function2 : (Int, Int) ->Int = addTwoInts
function2(100, 100)

function2 = subTwoInt
function2(200, 100)

func sayHello2(){
    print("hello2")
}
//函数类型标注的几种方式
var fun1 : () -> () = sayHello2
var fun2 : () -> Void = sayHello2
var fun3 : () -> (Void) = sayHello2
var fun4 : (Void) -> (Void) = sayHello2
var fun5 : Void -> Void = sayHello2
var fun6 : (Void) -> Void = sayHello2

var a = 100
var b = 200
//函数类型的参数

func getResult(fun : (Int, Int) ->Int) ->Int {
    let result = fun(a, b)
    return result
}


getResult(addTwoInts)				//300
getResult(subTwoInt)					//100

//函数类型的返回值
func test() -> (Int, Int) ->Int {
    return addTwoInts
}

test()


test()(100, 100)						//200

func test1() -> (Int, Int) ->Int {
    return subTwoInt
}

test1()(3, 1)							//1
```




