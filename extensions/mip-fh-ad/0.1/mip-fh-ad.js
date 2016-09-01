/**
 * @author: laoono
 * @date:  2016-09-01
 * @time: 15:35
 * @contact: laoono.com
 * @description: #
 */

define('mip-fh-ad', ['require', 'customElement', 'zepto'], function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();


    var loadJSFile = function (url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    };
    // load btm baidu ad
    var loadBdAd = function () {
        window.cpro_psid = 'u2355234';
        window.cpro_psdata = {
            staticDomain: 'bdimg.fh21.com.cn'
        };
        loadJSFile('http://bdimg.fh21.com.cn/static/dspui/js/umf.js', function () {
            // console.log('loaded js file');
        });
    };

    var ajaxurl = 'http://partners.fh21.com.cn/partners/showcodejsonp?callback=?';

    var param = $('#adParam');
    var paramObj = param.data('keyword');
    var hostStatic = param.data('host-static');
    var pid = [1, 11, 14, 47, 48, 49];
    var consoleStr = {
            kw: paramObj,
            pid: pid.join(',')
        };

    window.HOST = {
        STATIC: hostStatic
    };

    var init = function () {

        if (paramObj && paramObj.length) {
            $.getJSON(ajaxurl, consoleStr, function (json) {
                // console.log(json);
                var adObj = $.parseJSON(json.result);
                // console.log(adObj);

                $.each(adObj, function (k, v) {
                    if ($.trim(v)) {
                        $('[id^=BAIDU_DUP_wrapper]').remove();
                        // 根据广告id，判断广告的显示位置
                        switch (+k) {
                            case 1:
                                $('body').append('<div id="ad_position_1">' + v + '</div>');
                                // 去除三种广告：顶部网盟嵌入，右上漂浮：猪，右下漂浮：图片
                                // $('div[id*='wrapper_u2311978'],.imagepluspage_entry,#icon_0').remove();
                                $('.direct_ad_effect_style').removeClass('direct_ad_effect_style');
                                break;
                            case 11:
                                $('body').append(v);
                                break;
                            case 14:
                                $('#liveAdBlock').html(v);
                                break;
                            // 我要提问广告位
                            case 47:
                                $('#i-2-iask').html(v);
                                break;
                            // 向Ta提问广告位
                            case 48:
                                $('div.introduce-list').find('a.btn').remove();
                                $('div.introduce-list').append(v);
                                break;
                            // 我要提问下方热图广告位
                            case 49:
                                $('#ad-s-1255').prepend(v);
                                break;
                        }
                    } else {
                        // 广告位id为1时，加载底部漂浮的百度广告
                        if (+k === 1) {
                            loadBdAd();
                        }
                    }
                });
                $('.direct_ad_effect_style').remove();
            });
        } else {
            $('.direct_ad_effect_style').remove();
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        init();
    };

    return customElem;
});

require(['mip-fh-ad'], function (plugindemo) {
    MIP.registerMipElement('mip-fh-ad', plugindemo);
});
