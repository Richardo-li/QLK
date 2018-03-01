$(function () {

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；  
  });

  // 侧滑菜单内容滚动
  mui('#offCanvasSideScroll').scroll();
  mui('#offCanvasContentScroll').scroll();


  // 单击显示侧滑菜单
  $("#left-menu").on('tap', function (event) {
    mui('.mui-off-canvas-wrap').offCanvas('show');
  });



  $.ajax({
    type: 'get',
    url: 'http://localhost:3000/123',
    success: function (data) {
      console.log(data);
    },
    error: function () {
      console.log('error');
    }
  })








})