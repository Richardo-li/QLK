$(function () {

  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；  
  });

  // tab
  var box = document.getElementById("box");
  var lis = box.getElementsByTagName("li");
  var divs = box.getElementsByTagName("div");
  tap(lis, divs);
  function tap(obj1, obj2) {                          /*封装了一个tap函数*/
    for (var x = 0; x < obj1.length; x++) {
      obj1[x].index = x;
      $(obj1[x]).on('tap', function (event) {
        for (var y = 0; y < obj1.length; y++) {
          obj2[y].style.display = "none";
        }
        obj2[this.index].style.display = "block";
      });
    }
  }

  // $.ajax({
  //   type: 'get',
  //   url: 'http://localhost:3000/123',
  //   success: function (data) {
  //     console.log(data);
  //   },
  //   error: function () {
  //     console.log('error');
  //   }
  // })





})