function animate(obj, target, callback) {
    // console.log(callback); 調用時用callback()
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步長值寫到定時器裡面
        // 步長值改為整數，不要出現小數點
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        // 如果是大於0就是取大的－小於0就取小的
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止動畫，本質上就是停止定時器
            clearInterval(obj.timer);
            // 回調函數寫到定時器結束裡面
            // if (callback) {
            //     // 調用函數
            //     callback();
            // }
            // 優化上方 if 的寫法，左邊為真時右邊才會調用
            callback && callback();
        }
        // 將步長值1改為慢慢變小的值，步長公式：（目標值-現在的位置）/10
        obj.style.left = obj.offsetLeft + step + "px";
    }, 15);
}
