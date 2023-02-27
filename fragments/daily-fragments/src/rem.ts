export const remFn = (win: any) => {
  var dom = document.documentElement || document.body,
    fun = "orientationchange" in window ? "orientationchange" : "resize",  
    //上边这句的意思是判断是屏幕尺寸改变还是屏幕旋转。 (可以移动端适配)
    cb = function () {
    //   var clientWidth = dom.clientWidth < 800 ? 800 : dom.clientWidth; //这里限制pc端 最小800宽度
      var clientWidth = dom.clientWidth;
    //   clientWidth = clientWidth < 375 ? 375 : clientWidth;
      clientWidth = clientWidth > 750 ? 750 : clientWidth;
     //移动端最小375宽度，最带750宽度
      dom.style.fontSize = clientWidth / 10 + "px";
    };
  cb();
  win.addEventListener(fun, cb, false);
}

// export default remFn
// (function (win) {
//   var dom = document.documentElement || document.body,
//     fun = "orientationchange" in window ? "orientationchange" : "resize",  
//     //上边这句的意思是判断是屏幕尺寸改变还是屏幕旋转。 (可以移动端适配)
//     cb = function () {
//     //   var clientWidth = dom.clientWidth < 800 ? 800 : dom.clientWidth; //这里限制pc端 最小800宽度
//       var clientWidth = dom.clientWidth;
//     //   clientWidth = clientWidth < 375 ? 375 : clientWidth;
//       clientWidth = clientWidth > 750 ? 750 : clientWidth;
//      //移动端最小375宽度，最带750宽度
//       dom.style.fontSize = clientWidth / 10 + "px";
//     };
//   cb();
//   win.addEventListener(fun, cb, false);
// })(window);
