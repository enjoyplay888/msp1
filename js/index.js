window.addEventListener("load", function () {
    // 獲取元素
    var arrow_l = document.querySelector(".arrow-l");
    var arrow_r = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");
    var focusWidth = focus.offsetWidth;
    // 滑鼠經過 focus 就顯示隱藏左右按鈕
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        // 經過時停止定時器
        clearInterval(timer);
        timer = null; // 清除定時器變量
    });
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        // 離開 focus 後定時器繼續執行
        timer = setInterval(function () {
            // 使用手動調用右側按鈕點擊事件 arrow_r.click()
            arrow_r.click();
        }, 2000);
    });
    // 動態生成小圓圈，有幾個圖片就生成幾個圓圈
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 創建一個li，將li插入ol裡面
        // 記錄當前小圓圈的索引號，通過自定義屬性來做
        var li = document.createElement("li");
        li.setAttribute("index", i);
        ol.appendChild(li);
        // 小圓圈的排他思想：我們可以直接在生成小圓圈的同時直接綁定點擊事件
        li.addEventListener("click", function () {
            // 把所有的li清除current類名
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            // 當前的li設置current類名
            this.className = "current";
            // 點擊小圓圈移動圖片，要移動ul
            // ul的移動距離就是小圓圈的索引號乘以圖片的寬度，注意是負值
            // 點擊某個li時就拿到當前li的索引號
            var index = this.getAttribute("index");
            // 點擊某個li就要把li的索引號給num
            num = index;
            // 點擊某個li就要把li的索引號給circle
            circle = index;
            console.log(focusWidth);
            animate(ul, -index * focusWidth);
        });
    }
    // 把ol裡面的第一個li設置類名為current
    ol.children[0].className = "current";
    // 克隆第一張圖片，放到ul最後面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 點擊右側按鈕，圖片滾動一張
    var num = 0;
    // circle 控制小圓圈的撥放
    var circle = 0;
    // flag 節流閥
    var flag = true;
    // 右側按鈕
    arrow_r.addEventListener("click", function () {
        if (flag) {
            flag = false; // 關閉節流閥
            // 如果走到最後複製第一張的圖片，此時ul要快速復原，left改為0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; // 打開節流閥
            });
            // 點擊右側按鈕，小圓圈跟隨一起變化，可以再聲明一個變量控制小圓圈的撥放
            circle++;
            // 如果circle==4，說明走到最後一張克隆的圖片了，此時circle要復原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 調用函數
            circleChange();
        }
    });

    // 左側按鈕
    arrow_l.addEventListener("click", function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 點擊右側按鈕，小圓圈跟隨一起變化，可以再聲明一個變量控制小圓圈的撥放
            circle--;
            // 如果circle<0，已經到了第一張圖片，此時circle要改到第4個小圓圈
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 調用函數
            circleChange();
        }
    });
    function circleChange() {
        // 先清除其餘小圓圈的current類名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        // 留下當前小圓圈的類名
        ol.children[circle].className = "current";
    }
    // 自動撥放輪播圖
    var timer = setInterval(function () {
        // 使用手動調用右側按鈕點擊事件 arrow_r.click()
        arrow_r.click();
    }, 2000);
});
