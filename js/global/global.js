var globalModule = {}
var listUser = new Array();

globalModule.setCookie = function (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

globalModule.getCookie = function (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

globalModule.removeCookie = function (cname) {
  document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

globalModule.initButton = function (id, onClickedEnvent) {
  $("#" + id).on("click", onClickedEnvent);
}

globalModule.checkLogin = function () {
  $("#formUserLogin").submit(function (event) {
		event.preventDefault();
	});
	$("#formUserLogin").validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		rules: {
			"usernameLogin": {
				required: true,
				// userisnotexit: true,
			},
			"passwordLogin": {
				required: true,
				// passisnotcorect: true,
			},
		},
		messages: {
			"usernameLogin": {
                required: "Vui lòng nhập Tên đăng nhập.",
			},
			"passwordLogin": {
                required: "Vui lòng nhập Mật khẩu.",
			},
        }
    });
  var username =  $("#txtName").val();
  globalModule.setCookie("currentUser", username, 3);
  $("#currentUserName").text(username);
  $.ajax({
    type: "POST",
    url: "http://192.168.0.32:8080/api/login",
    data: ({
      "UserName": $("#txtName").val(),
      "PassWord": $("#txtPass").val(),
    }),
    dataType: "json",
    success: function(result){
      //debugger;
      if(result == true){
            $("#addMyModalLogin").modal("hide");
            $("#login").addClass("hide");
            $("#userMenu").removeClass("hide");      }
      else{
      }
    },
    error: function(){
    }
  })
}

globalModule.checkLoginSuccess = function () {
  var currentUserName = globalModule.getCookie("currentUser");
  if (currentUserName != "") {
    $("#login").addClass("hide");
    $("#userMenu").removeClass("hide");
    $("#currentUserName").text(currentUserName);
  }
  else {
    $("#login").removeClass("hide");
    $("#userMenu").addClass("hide");
  }
}
globalModule.logOut = function () {
  globalModule.removeCookie("currentUser");
  window.location.reload();
}

$(function () {
  globalModule.checkLoginSuccess();
  globalModule.initButton("btnLogout", globalModule.logOut);
  globalModule.initButton("btnDangNhap", globalModule.checkLogin);
});