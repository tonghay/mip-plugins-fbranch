define('mip-plugindemo/* 你的组件名称，需要更改1 */', ['require', 'customElement'], function(require) {

    var customElem = require('customElement');

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