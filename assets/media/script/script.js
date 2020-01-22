(function() {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function() {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function(f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function() {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function() {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();

function hitokoto() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var data = JSON.parse(xhr.responseText);
            var hitokoto = document.getElementById('hitokoto');
            hitokoto.innerText = data.hitokoto;
        }
    }
    xhr.send();
}

function scroll() {
    /* scroll */
    let mainNavLinks = document.querySelectorAll(".markdownIt-TOC a");
    window.addEventListener("scroll", event => {
        let fromTop = window.scrollY;

        mainNavLinks.forEach((link, index) => {
            let section = document.getElementById(decodeURI(link.hash).substring(1));
            let nextSection = null
            if (mainNavLinks[index + 1]) {
                nextSection = document.getElementById(decodeURI(mainNavLinks[index + 1].hash).substring(1));
            }
            if (section.offsetTop <= fromTop) {
                if (nextSection) {
                    if (nextSection.offsetTop > fromTop) {
                        link.classList.add("current");
                    } else {
                        link.classList.remove("current");
                    }
                } else {
                    link.classList.add("current");
                }
            } else {
                link.classList.remove("current");
            }
        });
    });
}

function loadlive2d() {
    //const home_Path = document.getElementById('home_path').innerHTML + '/media/live2d/tororo/assets/tororo.model_';
    //const home_Path = 'https://cdn.jsdelivr.net/gh/itjoker233/Gridea-theme-Chic@latest/assets/media/live2d/tororo/assets/tororo.model_';
    var currentTheme = window.localStorage && window.localStorage.getItem('theme');
    const superSample_ = 2.0;
    const opacityDefault_ = 1;
    const opacityOnHover_ = 1;
    const width_ = 130;
    const height_ = 130;
    const hOffset_ = 5;
    const vOffset_ = 80;
    const position_ = 'right';
    const show_ = true;
    const scale_ = 1;
    const motion_ = true;
    const config_light = {
        tagMode: false,
        model: {
            jsonPath: home_Path + `light.json`,
        },
        display: {
            superSample: superSample_,
            width: width_,
            height: height_,
            position: position_,
            hOffset: hOffset_,
            vOffset: vOffset_,
        },
        mobile: {
            show: show_,
            scale: scale_,
            motion: motion_,
        },
        react: {
            opacityDefault: opacityDefault_,
            opacityOnHover: opacityOnHover_,
        },
        log: false,
        debug: false
    };
    const config_dark = {
        tagMode: false,
        model: {
            jsonPath: home_Path + `dark.json`,
        },
        display: {
            superSample: superSample_,
            width: width_,
            height: height_,
            position: position_,
            hOffset: hOffset_,
            vOffset: vOffset_,
        },
        mobile: {
            show: show_,
            scale: scale_,
            motion: motion_,
        },
        react: {
            opacityDefault: opacityDefault_,
            opacityOnHover: opacityOnHover_,
        },
        log: false,
        debug: false
    };
    $("#live2d-widget").remove();
    if (currentTheme == "dark") {
        L2Dwidget.init(config_light);
    } else {
        L2Dwidget.init(config_dark);
    }
}


function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}

document.ready(
    function() {
        var _Blog = window._Blog || {};
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        var mobile_toggle_theme_zh = document.getElementById("mobile-toggle-theme-zh");
        var mobile_toggle_theme_en = document.getElementById("mobile-toggle-theme-en");
        var mobile_toggle_theme_en_display = getStyle(mobile_toggle_theme_en, 'display');
        var switch_default = document.getElementById("switch_default");
        if (isDark) {
            switch_default.checked = false;
            // mobile
            if (mobile_toggle_theme_en_display == "inline")
                mobile_toggle_theme_en.innerText = "·Dark";
            else
                mobile_toggle_theme_zh.innerText = "·\u6697\u9ED1";
        } else {
            switch_default.checked = true;
            // mobile
            if (mobile_toggle_theme_en_display == "inline")
                mobile_toggle_theme_en.innerText = "·Light";
            else
                mobile_toggle_theme_zh.innerText = "·\u65E5\u95F4";
        }
        _Blog.toggleTheme = function() {
            if (isDark) {
                document.getElementsByTagName('body')[0].classList.add('dark-theme');
                // mobile
                if (mobile_toggle_theme_en_display == "inline")
                    mobile_toggle_theme_en.innerText = "·Dark";
                else
                    mobile_toggle_theme_zh.innerText = "·\u6697\u9ED1";
            } else {
                document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                // mobile
                if (mobile_toggle_theme_en_display == "inline")
                    mobile_toggle_theme_en.innerText = "·Light";
                else
                    mobile_toggle_theme_zh.innerText = "·\u65E5\u95F4";
            }
            document.getElementsByClassName('toggleBtn')[0].addEventListener('click', () => {
                    if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                        document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                    } else {
                        document.getElementsByTagName('body')[0].classList.add('dark-theme');
                    }
                    window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light', );
                    location.reload()
                        //loadlive2d();
                })
                // moblie
                /* en */
            mobile_toggle_theme_en.addEventListener('click', () => {
                    if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                        document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                        // mobile
                        if (mobile_toggle_theme_en_display == "inline") {
                            mobile_toggle_theme_en.innerText = "·Light";
                        } else {
                            mobile_toggle_theme_zh.innerText = "·\u65E5\u95F4";
                        }
                    } else {
                        document.getElementsByTagName('body')[0].classList.add('dark-theme');
                        // mobile
                        if (mobile_toggle_theme_en_display == "inline")
                            mobile_toggle_theme_en.innerText = "·Dark";
                        else
                            mobile_toggle_theme_zh.innerText = "·\u6697\u9ED1";
                    }
                    window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light', );
                    location.reload()
                        //loadlive2d();
                })
                /* zh */
            mobile_toggle_theme_zh.addEventListener('click', () => {
                if (document.getElementsByTagName('body')[0].classList.contains('dark-theme')) {
                    document.getElementsByTagName('body')[0].classList.remove('dark-theme');
                    // mobile
                    if (mobile_toggle_theme_en_display == "inline")
                        mobile_toggle_theme_en.innerText = "·Light";
                    else
                        mobile_toggle_theme_zh.innerText = "·\u65E5\u95F4";

                } else {
                    document.getElementsByTagName('body')[0].classList.add('dark-theme');
                    // mobile
                    if (mobile_toggle_theme_en_display == "inline")
                        mobile_toggle_theme_en.innerText = "·Dark";
                    else
                        mobile_toggle_theme_zh.innerText = "·\u6697\u9ED1";
                }
                window.localStorage && window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light', );
                //loadlive2d();
            })
        };
        _Blog.toggleTheme();
    }
);
