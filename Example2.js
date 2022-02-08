//使用 LocalStorage 存储多语言设置
var ls = window.localStorage;

//定义一个感应并切换语言的定时器
var langInterval;

//获取浏览器语言以自动设置显示语言
var lang = navigator.language;
lang = lang.substring(0, 2);
if(!ls.lang){
    if(lang == "zh"){
        ls.lang = "zh";
    }else if(lang == "jp"){
        ls.lang = "jp";
    }else {
        ls.lang = "en";
    }
}

//页面 HTML 整体加载完毕后再执行下列代码
window.onload = function(){
    //语言切换按钮
    var buttonZh = document.getElementById("buttonZh");
    var buttonEn = document.getElementById("buttonEn");
    var buttonJp = document.getElementById("buttonJp");

    //遍历双语键值
    var keys = document.getElementsByClassName("keys");

    //声明计数器，适用于 keys 数组
    var i;

    //按钮状态变化函数
    function btnChange(){
        if(ls.lang == "zh"){
            buttonZh.style.color = "unset";
            buttonZh.style.cursor = "default";
            buttonEn.style.color = "";
            buttonEn.style.cursor = "";
            buttonJp.style.color = "";
            buttonJp.style.cursor = "";
        }else if(ls.lang == "en"){
            buttonZh.style.color = "";
            buttonZh.style.cursor = "";
            buttonEn.style.color = "unset";
            buttonEn.style.cursor = "default";
            buttonJp.style.color = "";
            buttonJp.style.cursor = "";
        } else if (ls.lang == "jp") {
            buttonZh.style.color = "";
            buttonZh.style.cursor = "";
            buttonEn.style.color = "";
            buttonEn.style.cursor = "";
            buttonJp.style.color = "unset";
            buttonJp.style.cursor = "default";
        }
    }

    //网页标题双语切换函数
    function htmlTitleSwitcher(){
        if(ls.lang == "zh"){
            document.title = "示例网页";
        }else if(ls.lang == "en"){
            document.title = "Example Website";
        } else if (ls.lang == "jp") {
            document.title = "ウェブサイトの例";
        };
    }

    //单键替代函数
    function replace(before, after){
        if(keys[i].innerHTML == before){
            keys[i].innerHTML = after;
        };
    };

    //中文切换按钮的单击响应函数
    buttonZh.onclick = function(){
        ls.setItem("lang", "zh");
        switchToChinese();
        location.reload();
    };

    //英文切换按钮的单击响应函数
    buttonEn.onclick = function(){
        ls.setItem("lang", "zh");
        switchToChinese();
        location.reload();
        ls.setItem("lang", "en");
        switchToEnglish();
    };

    //日文切换按钮的单击响应函数
    buttonJp.onclick = function () {
        ls.setItem("lang", "zh");
        switchToChinese();
        location.reload();
        ls.setItem("lang", "jp");
        switchToJapanese();
    };

    //用于遍历并替换成中文的函数
    function switchToChinese() {
        btnChange();
        //切换网页标题语言
        htmlTitleSwitcher();
    };

    //用于遍历并替换成英文的函数
    function switchToEnglish() {
        btnChange();
        //切换网页标题语言
        htmlTitleSwitcher();

        //遍历替换
        for(i=0; i<keys.length; i++){
            replace("这是一行用于演示的文本。", "This is an example line of text.");
        }
    };

    //用于遍历并替换成日文的函数
    function switchToJapanese() {
        btnChange();
        //切换网页标题语言
        htmlTitleSwitcher();

        //遍历替换
        for(i=0; i<keys.length; i++){
            replace("这是一行用于演示的文本。", "これはテキストの例です。");
        }
    };

    //根据 LocalStorage 存储的值判定当前应该显示的语言
    if(ls.lang == "zh"){
        switchToChinese();
    }else if(ls.lang == "en"){
        switchToEnglish();
    }else if(ls.lang == "jp"){
        switchToJapanese();
    }
}