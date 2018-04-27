//此函數用於創建複製按鈕
function createCopyBtns() {
    var $codeArea = $("figure");
    //查看頁面是否具有代碼區域，沒有代碼塊則不創建 複製按鈕
    if ($codeArea.length > 0) {
        //複製成功後將要干的事情
        function changeToSuccess(item) {
             $imgOK = $("#copyBtn").find("#imgSuccess");
                if ($imgOK.css("display") == "none") {
                    $imgOK.css({
                        opacity: 0,
                        display: "block"
                    });
                    $imgOK.animate({
                        opacity: 1
                    }, 1000);
                    setTimeout(function() {
                        $imgOK.animate({
                            opacity: 0
                        }, 2000);
                    }, 2000);
                    setTimeout(function() {
                        $imgOK.css("display", "none");
                    }, 4000);
                };
        };
        //創建 全局複製按鈕，僅有一組。包含：複製按鈕，複製成功回應按鈕
        //值得注意的是：1.按鈕默認隱藏，2.位置使用絕對位置 position: absolute; (position: fixed 也可以，需要修改代碼)
        $(".post-body").before('<div id="copyBtn" style="opacity: 0; position: absolute;top:0px;left:0px;display: none;line-height: 1; font-size:1.5em"><span id="imgCopy" ><i class="fa fa-paste fa-fw"></i></span><span id="imgSuccess" style="display: none;"><i class="fa fa-check-circle fa-fw" aria-hidden="true"></i></span>');
        //創建 複製 插件，綁定單機時間到 指定元素，支援JQuery
        var clipboard = new ClipboardJS('#copyBtn', {
            target: function() {
                //返回需要複製的元素內容
                return document.querySelector("[copyFlag]");
            },
            isSupported: function() {
                //支援複製內容
                return document.querySelector("[copyFlag]");
            }
        });
        //複製成功事件綁定
        clipboard.on('success',
            function(e) {
                //清除內容被選擇狀態
                e.clearSelection();
                changeToSuccess(e);
            });
        //複製失敗綁定事件
        clipboard.on('error',
            function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        //滑鼠 在複製按鈕上滑動和離開後漸變顯示/隱藏效果
        $("#copyBtn").hover(
            function() {
                $(this).stop();
                $(this).css("opacity", 1);
            },
            function() {
                $(this).animate({
                    opacity: 0
                }, 2000);
            }
        );
    }
}
//感應滑鼠是否在代碼區
$("figure").hover(
    function() {
        //-------滑鼠活動在代碼塊內
        //移除之前含有複製標誌代碼塊的 copyFlag
        $("[copyFlag]").removeAttr("copyFlag");
        //在新的（當前滑鼠所在代碼區）代碼塊插入標誌：copyFlag
        $(this).find(".code").attr("copyFlag", 1);
        //獲取複製按鈕
        $copyBtn = $("#copyBtn");
        if ($copyBtn.lenght != 0) {
            //獲取到按鈕的前提下進行一下操作
            //停止按鈕動畫效果
            //設置為 顯示狀態
            //修改 複製按鈕 位置到 當前代碼塊開始部位
            //設置代碼塊 左側位置
            $copyBtn.stop();
            $copyBtn.css("opacity", 0.8);
            $copyBtn.css("display", "block");
            $copyBtn.css("top", parseInt($copyBtn.css("top")) + $(this).offset().top - $copyBtn.offset().top + 3);
//            $copyBtn.css("left", -$copyBtn.width() - 3);
            $copyBtn.css("left",$(this).offset().left -$copyBtn.width() - 3);
        }
    },
    function() {
        //-------滑鼠離開代碼塊
        //設置複製按鈕可見度 2秒內到 0
        $("#copyBtn").animate({
            opacity: 0
        }, 2000);
    }
);
//頁面載入完成後，創建複製按鈕
$(document).ready(function() {
  createCopyBtns();
});