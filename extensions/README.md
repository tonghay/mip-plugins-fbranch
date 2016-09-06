# 百度MIP扩展组件开发手册（不依赖编译版）

## 一、开发之前

### 1、代码规范

JS

[JS 规范](https://github.com/ecomfe/spec/blob/master/javascript-style-guide.md)

CSS

[CSS 规范](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)

组件代码需通过规范检查：

[fecs](http://fecs.baidu.com/)

### 2、github 新建 [ISSUE](https://github.com/mipengine/mip-plugins/issues)
    
    1）、确认需求

    2）、申请自定义 html 标签名


## 二、怎么开发

	1、在页面头部引入 css：

```html
    <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/mipmain-v1.0.1.css">
```

	2、在 body 最后引入 js：

```html
    <script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.2.js"></script>
```

	3、在2的 js 后面外链或内联你的组件 js，若页面依赖多个组件，依次引入组件 js，写法参照 `组件 js 构成介绍`。

    注：<strong>1、2均需参考[官网](https://www.mipengine.org/)的最新版本</strong>

### 组件的生命周期
    
    MIP element 生命周期

    init                   # 初始化  
      ↓  
    create                 # 创建元素  
      ↓  
    attached               # 插入到文档中  
      ↓   
    build                  # 执行build，只会被执行一次   
      ↓     
    viewport(in or out)    # 进入或离开可视区域   
      ↓    
    detached               # 从文档中移除

    注：具体使用，请参照 demo ——> `组件 js 构成介绍`

### 组件 js 构成介绍

```javascript
define('mip-plugindemo/* 你的组件名称，需要更改1 */', ['require', 'customElement', 'zepto'], function(require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、inviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        element._index = index ++;
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.inviewCallback = function () {
        console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        console.log(isInView);
    };
    // 控制inviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,inviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };
    /* 生命周期 function list，根据组件情况选用 end */

    return customElem;
});
require(['mip-plugindemo/* 你的组件名称，需要更改4 */'], function (plugindemo) {
	//若组件需要有 css,自测时先用字符串，提交过来需要使用 __inline('./组件名称.css'),一个 css 文件
	MIP.css.mipplugindemo = ".mip-demo-f13 {font-size: 13px;}";
    //注册组件,若有 css 才加第三个参数，否则不要第三个参数
    MIP.registerMipElement('mip-plugindemo/* 你的自定义 html 标签名，一般同组件名，需要更改5 */', plugindemo, MIP.css.mipplugindemo/*  css  string，需要更改6 */');
});
```

## 三、怎么测试
	
	本地测试，直接静态的 html 文件用浏览器打开即可

	测试覆盖范围

    ```
        一、覆盖浏览器
        * 百度框（夜间模式下样式正常）
        * 百度浏览器
        * 原生浏览器/Safari
        * UC浏览器
        * QQ浏览器
        * chrome浏览器
        * 微信（带有"分享"功能的项目及运营项目必测）

        二、覆盖操作系统
        * ios6~9
        * Android 2.3
        * Android 4.0~5.1
    ```

## 四、测试 OK 了之后需要做什么？

1、书写详细的组件功能说明文档
	
	参照：https://www.mipengine.org/doc/4-widget/4-customize-widget/appdl-widget.html

2、测试的 demo 需放在 github 的 examples 目录下，命名: 组件名-mip.html

3、代码提交

### github 方式

采用Forking工作流:[参考文档](https://github.com/oldratlee/translations/blob/master/git-workflows-and-tutorials/workflow-forking.md)

[github 地址](https://github.com/mipengine/mip-plugins)


4、上线
	
	目前每周二、四上线两次，统一下午三点上线，下午二点需要代码 ready，超过时间等下次上线窗口



## 五、完整 demo 示例

注：js/css 版本参考[官网](https://www.mipengine.org/)的最新版本

```html
<!DOCTYPE html>
<html mip>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <title>文章大标题</title>
        <link rel="stylesheet" type="text/css" href="https://mipcache.bdstatic.com/static/mipmain-v1.0.1.css">
    </head>
    <body>
    <mip-img src="http://a.hiphotos.baidu.com/image/h%3D200/sign=8aa71c7ce3c4b7452b94b016fffd1e78/3c6d55fbb2fb4316edd0e02f28a4462308f7d39c.jpg" popup alt="banner a" width="414" height="207" layout="responsive">
        <p>banner a</p>
    </mip-img>
    <mip-carousel autoplay defer="2000" width="414" height="257" layout="fixed-height">
        <div>
            <mip-img src="http://a.hiphotos.baidu.com/image/h%3D200/sign=8aa71c7ce3c4b7452b94b016fffd1e78/3c6d55fbb2fb4316edd0e02f28a4462308f7d39c.jpg" popup alt="banner a" width="414" height="207" layout="responsive">
            </mip-img>
            <p>banner a</p>
        </div>
        <div>
            <mip-img src="http://img1.imgtn.bdimg.com/it/u=2363027421,438461014&fm=206&gp=0.jpg" popup alt="banner b" width="414" height="207" layout="responsive">
            </mip-img>
            <p>banner b</p>
        </div>
    </mip-carousel>
    <mip-demoforall></mip-demoforall>


    </body>
    <script src="https://mipcache.bdstatic.com/static/mipmain-v1.0.2.js"></script>
    <script src="https://mipcache.bdstatic.com/static/v0.1/mip-link.js"></script>
    <script src="https://mipcache.bdstatic.com/static/v0.1/mip-stats-bidu.js"></script>
    <script src="/*你的组件 js 地址*/"></script>
</html>

```
