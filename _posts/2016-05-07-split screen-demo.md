---
layout: post
title: 简单的分屏 Demo 
subtitle: OC 学习
author: Fu_sion
date: 2016-05-07 23:58:29 +0800
categories: OC update
tag:  学习 OC
---



1. 利用 autoLayout 和 Size Classes 先进行布局
2. 上面或者左边的 view 先进行 with 和 height 的限定
3. 把约束进行拖线 利用 pan point.x/y 的手势进行约束constant的赋值
4. 代码

{% highlight objc %}

//
//  ViewController.m
//  test_分屏
//
//  Created by Fu_sion on 16/4/16.
//  Copyright © 2016年 Fu_sion. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()
@property (weak, nonatomic) IBOutlet UITextView *textViewA;
@property (weak, nonatomic) IBOutlet UITextView *textViewB;
@property (weak, nonatomic) IBOutlet UIView *cutScreenView;
@property (weak, nonatomic) IBOutlet UIView *cutScreenViewB;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *viewAAndBHeigth;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *viewAHeigh;

@property (weak, nonatomic) IBOutlet NSLayoutConstraint *viewAwith;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    [self cutScreenA];
    [self cutScreenB];
}
-(void)cutScreenB{
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(cupScreen:)];
     [self.cutScreenViewB addGestureRecognizer:pan];
}
- (void)cutScreenA{
    UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(cupScreen:)];
    [self.cutScreenView addGestureRecognizer:pan];
   
}
-(void)cupScreen:(UIPanGestureRecognizer*)sender{
    CGPoint point = [sender locationInView:self.view];
    CGFloat screenHeigth = self.view.frame.size.height;
    CGFloat mu = self.viewAAndBHeigth.multiplier;
    CGFloat mutiplier = (screenHeigth - point.y) / point.y;
    NSLog(@"%f ,%f ",mutiplier,mu);
    
    self.viewAHeigh.constant = point.y;
    self.viewAwith.constant = point.x;
  
}
{% endhighlight %}
##注意:约束的定位 和两个 cutView 的pan 手势需要分开添加两个手势才会生效;

代码地址 [简单分屏Demo https://github.com/SionFu/-Demo](https://github.com/SionFu/-Demo)


