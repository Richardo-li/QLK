$(function () {

  // 睁眼与捂眼
  $('#password').on('focus', function () {
    $('.Ali').attr('src', './images/login2.png');
  })
  $('#password').on('blur', function () {
    $('.Ali').attr('src', './images/login1.png');
  })

  // 登录验证



})