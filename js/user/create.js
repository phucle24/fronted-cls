var userModule = {
	currentUserEditIndex: 0
}
userModule.getlistUser = function () {
	var table = document.getElementById("tableUser");
	$.ajax({
		type: "GET",
		url: "http://192.168.0.32:8080/api/UserInfoes",
		dataType: "json",
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				// get birthday
				var getBirthDay = data[i].birthday;
				// Định dạng birthday theo dạng chuỗi 
				var birthdayDate = new Date(getBirthDay);
				// Định dạng nó về dạng /dd/mm/yyyy
				var birthday = birthdayDate.toLocaleDateString('arn-CL');
				var row = table.insertRow(i + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				var cell9 = row.insertCell(8);
				// Truyền giá trị thuộc tính của User vào cột
				cell1.innerHTML = data[i].username;
				cell2.innerHTML = data[i].fname;
				cell3.innerHTML = data[i].lname;
				cell4.innerHTML = data[i].email;
				cell5.innerHTML = data[i].gender;
				cell6.innerHTML = birthday;
				cell7.innerHTML = data[i].phone;
				cell8.innerHTML = "<button onclick='userModule.getCurrentUser(" + data[i].Id + ")'>Chỉnh sửa</button>";
				cell9.innerHTML = "<button onclick='userModule.removeUser(" + data[i].Id + ")'>Xóa</button> ";
			}
		},
		error: function () {
			$("#thongbao").text("Không tồn tại danh sách tài khoản người dùng");
		}
	})
}

userModule.createUser = function () {
	$("#formUserCreate").submit(function () {
		event.preventDefault();
	});
}

userModule.removeUser = function (Id) {
	var conf = confirm("Bạn muốn xóa user này không ?");
	if (conf == true) {
		$.ajax({
			url: 'http://192.168.0.32:8080/api/UserInfoes/' + Id,
			type: 'DELETE',
			success: function (data) {
				window.location.reload();
			},
			error: function (error) { }
		});
	}
	else {
		window.location.reload(true);
	}

}

userModule.getCurrentUser = function (Id) {
	$("#addMyModalEdit").modal({});
	$.ajax({
		type: "GET",
		url: "http://192.168.0.32:8080/api/UserInfoes/" + Id,
		dataType: "json",
		success: function (data) {
			$("#txtUserNameEdit").val(data.username);
			$("#txtPasswordEdit").val(data.password);
			$("#txtFirstNameEdit").val(data.fname);
			$("#txtLastNameEdit").val(data.lname);
			$("#txtEmailEdit").val(data.email);
			$("#txtPhoneEdit").val(data.phone);
			$("#txtBirthDayEdit").val(data.birthday);
			$("#txtIdEdit").val(data.Id);
			$("#gender").val(data.gender);
			// if (data.gender == 'male') {
			// 	document.getElementById('male').checked = "true";
			// } else document.getElementById('female').checked = "true";
		},
		error: function () {
		}
	})
}

userModule.editCurentUser = function () {
	$("#formUserEdit").submit(function () {
		event.preventDefault();
	});
}

userModule.initInputSearchUser = function (key) {
	// $.ajax({
    //     type: 'GET',
    //     url: 'http://192.168.0.32:8080/api/UserInfoes?key=',
    //     data: {
	// 			"Id": 1,
	// 			"username": "sample string 2",
	// 			"password": "sample string 3",
	// 			"fname": "sample string 4",
	// 			"lname": "sample string 5",
	// 			"email": "sample string 6",
	// 			"phone": "sample string 7",
	// 			"birthday": "2020-07-14T09:35:52.5366321+07:00",
	// 			"gender": "sample string 8"
	// 		  },
    //     success: function(data){
          
    //     },
    //     error: function(response){
    //         alert("Failed");
    //     }
	//   });
	$("#key").on("keyup", function () {
		var value = $(this).val().toLowerCase();
		$("#tableUser tr").filter(function () {
			$("#tableUser th").css("display: none;")
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
	
}

userModule.checkloginUser = function () {
	var currentUserName = globalModule.getCookie("currentUser");
	if (currentUserName == "") {
		$("#manageUser").addClass("hide");
		$("#thongbao").text("Vui lòng đăng nhập để thực hiện chức năng này");
	}
	else {
		$("#listManageUser").addClass("hide");
		userModule.getlistUser();
		userModule.initInputSearchUser();
		$("#titleSuccess").text("Quản lý User");
	}
}

$(function () {
	userModule.checkloginUser();
	$("#formUserCreate").submit(function (event) {
		event.preventDefault();
	});

	$("#formUserCreate").validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		rules: {
			"username": {
				required: true,
				maxlength: 15,
				// isusernameused: true,
				noSpace: true
			},
			"password": {
				required: true,
				minlength: 6,
				maxlength: 32
			},
			"firstname": {
				required: true,
				regex: /^[a-zA-Z ]+$/
			},
			"lastname": {
				required: true,
				regex: /^[a-zA-Z ]+$/
			},
			"email": {
				email: true,
				// isemailused: true
			},
		},
		messages: {
			"username": {
				required: "Vui lòng nhập Tên đăng nhập",
				isusername: "Không chứa khoảng cách."
			},
			"password": {
				required: "Vui lòng nhập Mật khẩu",
				minlength: "Mật khẩu từ 8 - 32 kí tự"
			},
			"firstname": {
				required: "Vui lòng nhập Tên của bạn",
				pattern: "Gồm kí tự a-z,A-Z và dấu cách"
			},
			"lastname": {
				required: "Vui lòng nhập Họ của bạn",
				pattern: "Gồm kí tự a-z,A-Z và dấu cách"
			},
			"email": {
				required: "Vui lòng nhập Email của bạn",
				email: "Hãy nhập đúng định dạng email.",
			}

		},
		submitHandler: function (form) {
			$.ajax({
				type: "POST",
				url: "http://192.168.0.32:8080/api/UserInfoes",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify({
					Id: Math.floor((Math.random() * 100) + 1),
					username: $("#txtUserName").val(),
					password: $("#txtPassword").val(),
					fname: $("#txtFirstName").val(),
					lname: $("#txtLastName").val(),
					email: $("#txtEmail").val(),
					phone: $("#txtPhone").val(),
					birthday: $("#txtBirthDay").val(),
					gender: $("#gender").val(),
				}),
				success: function (data) {
					alert("Thêm User thành công.");
					window.location.reload();
				},
				error: function () {
					alert("Thêm User thất bại.");
				}
			})
		}
	});

	$("#formUserEdit").submit(function (event) {
		event.preventDefault();
	});

	$("#formUserEdit").validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		rules: {
			"password": {
				required: true,
				minlength: 6,
				maxlength: 32
			},
			"firstname": {
				required: true,
				regex: /^[a-zA-Z ]+$/
			},
			"lastname": {
				required: true,
				regex: /^[a-zA-Z ]+$/
			},
			"email": {
				email: true,
			}
		},
		messages: {
			"password": {
				required: "Vui lòng nhập Mật khẩu",
				minlength: "Mật khẩu từ 8 - 32 kí tự"
			},
			"firstname": {
				required: "Vui lòng nhập Tên của bạn",
				pattern: "Gồm kí tự a-z,A-Z và dấu cách"
			},
			"lastname": {
				required: "Vui lòng nhập Họ của bạn",
				pattern: "Gồm kí tự a-z,A-Z và dấu cách"
			},
			"email": {
				required: "Vui lòng nhập Email của bạn",
				email: "Hãy nhập đúng định dạng email.",
			}

		},
		submitHandler: function () {
			var objectUser = {
				"Id": parseInt($("#txtIdEdit").val()),
				"username": $("#txtUserNameEdit").val(),
				"password": $("#txtPasswordEdit").val(),
				"fname": $("#txtFirstNameEdit").val(),
				"lname": $("#txtLastNameEdit").val(),
				"email": $("#txtEmailEdit").val(),
				"phone": $("#txtPhoneEdit").val(),
				"birthday": $("#txtBirthDayEdit").val(),
				"gender": $("input:checked").val(),

			};

			// var objectUser={
			// 	"Id": 22,
			// 	"username": "sample string 2",
			// 	"password": "sample string 3",
			// 	"fname": "sample string 4",
			// 	"lname": "sample string 5",
			// 	"email": "sample string 6",
			// 	"phone": "sample string 7",
			// 	"birthday": "2020-07-13T15:42:03.4275517+07:00",
			// 	"gender": "sample string 8"
			//   };

			$.ajax({
				type: "PUT",
				url: "http://192.168.0.32:8080/api/UserInfoes",
				contentType: "application/json",
				dataType: "json",
				data: JSON.stringify(objectUser),
				success: function (data) {
					alert("Chỉnh sửa User thành công.");
					window.location.reload();
				},
				error: function () {
					alert("Chỉnh sửa User thất bại.");
				}
			})
		}
	});
});
