$(function () {
  // 事件委托    mui使用的时候会将所有的a标签的href屏蔽，从而导致移动端不能正常跳转。
  mui('body').on('tap', 'a', function () {
    window.top.location.href = this.href;
  });


  // rem适配  js方法
  myrem();
  window.onresize = myrem; //屏幕宽度改变时调用
  function myrem() {
    var htmlWidth = document.querySelector('html').clientWidth; //获取当前屏幕的宽度
    var basefs = 100; //基础的font-size （即最开始的font-size）    为什么基础值要写100px？ 
    var pageWidth = 640; //设计稿要求的宽度(320为iPhone 5 的屏幕宽度，所以当前适配iPhone 5)
    var fs = htmlWidth * basefs / pageWidth; //最终给html的font-size
    document.querySelector('html').style.fontSize = fs + 'px';
  }

})