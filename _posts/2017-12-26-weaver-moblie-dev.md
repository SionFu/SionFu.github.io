---
layout: post
title:  泛微 mobile 表单开发
subtitle: 泛微的移动端开发的部分内容
author: Fu_sion
date: 2017-12-26 15:49:41 +0800
categories: fdson update
tag: Weaver  学习
---

## 文档目录结构

 ```
 -D:	
 	-weaver
 		-ecology
 			-mobile
 				-plugin
 					-1
 						-view.jsp	 /*moblie 版本调用页面*/
 					-custom
 						-leaverAjx.jsp
 			-interface
 				-custompage
 					-leavecustompage.jsp  /*桌面版调用页面*/	 	
 ```
 
## 判断是否为请假表单

- 电脑版本的已经开发好，只需要手机端调用相关接口就可以
 
![findLeaveFrome](https://raw.githubusercontent.com/SionFu/SionFu.github.io/master/_site/images/findLeaveFrome.png)

## 从数据库取数相关的请假数据

```
function getWorkAjaxValue(resourceId,formid){

		jQuery.ajax({
			type:"POST",
			url:"/mobile/plugin/custom/leaverAjax.jsp",
			data:{"resourceId":resourceId,"formid":formid},
			success:function(res){
				
				var json = eval("("+res+")");
				if(json.flag == "-1"){
					alert("数据查询错误");
				}else{
					var returnValue="";
					jQuery.each(json.data,function(i){ 
						returnValue+=json.data[i].leaveType+": "+json.data[i].leaveSumHour+"小时";
						if (i < json.data.length - 1){
							returnValue+=", ";
						}
					});
					//kyjbsc=json.canUseJBDay;//可用加班时长
					var kyjbsc=json.canUseJBTime; //可用加班时长
					jQuery("#field9360").val(String(returnValue));

					jQuery("#field9361").val(String(kyjbsc+" 小时"));
					jQuery("#field9360").attr("disabled", true); //将控件设置为不可编辑
					jQuery("#field9361").attr("disabled", true);
				}
			}
		});
		
}
```	

