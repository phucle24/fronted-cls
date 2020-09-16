$(document).ready(function() {
    
	$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },"Gồm các kí tự a-z và A-Z hoặc dấu cách"
	);
	$.validator.addMethod(
		"noSpace",
		function(value, element) { 
			return value.indexOf(" ") < 0 && value != ""; 
	 	},"Không chứa khoảng trắng");	  
	$.validator.addMethod("isusernameused", function(value, element) {
        usernameIn = $("#txtUserName").val();
        check = false;

        for (var i = 0; i < listUser.length; i++) {
			if (usernameIn == listUser[i].username) {
                check = true;
                break;
            }
        }
        return check;
		},"Tên đăng nhập đã được sử dụng."
	);
	$.validator.addMethod("isemailused", function(value, element) {
        emailIn = $("#txtEmail").val();
        check = false;

        for (var i = 0; i < listUser.length; i++){
			if (emailIn == listUser[i].email) {
				check = true;
				break;
			}
        }
        return check;
		}, "Email đã được sử dụng."
	);
	$.validator.addMethod("userisnotexit", function(value, element) {
        usernameLogin = $("#txtName").val();
        check = false;

        for (var i = 0; i < listUser.length; i++){
			if (usernameLogin == listUser[i].email) {
				check = true;
				break;
			}
        }
        return check;
		}, "Tên đăng nhập không tồn tại."
	);
	$.validator.addMethod("passisnotcorect", function(value, element) {
        passwordLogin = $("#txtPass").val();
        check = false;

        for (var i = 0; i < listUser.length; i++){
			if (passwordLogin == listUser[i].password) {
				check = true;
				break;
			}
        }
        return check;
		}, "Mật khẩu không đúng."
	);
});
