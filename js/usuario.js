$(document).ready(function(){
	$("#ug_boton_principal").click(function (){
		var ls_email 		= $("#c_email").val().toLowerCase();
		var ls_contrasena 	= $("#c_contrasena").val();

		var re= /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
		if (ls_email == "" || !re.test(ls_email)){
			alert("[ERROR] El email es incorrecto.");
			$("#c_email").focus();
			return false;
		}

		if (ls_contrasena == ""){
			$("#c_contrasena").focus();
			alert("[ERROR] La contraseña es incorrecta.");
			return false;
		}

		//envía el formulario
		$("form_login").submit();
	});
});
