$(document).ready(function(){
	setSiguienteAnterior();
	$(".pagina_siguiente").click(procesaSiguienteLista);
	$(".pagina_anterior").click(procesaAnteriorLista);
	listadoEtiquetas();
});


function listadoEtiquetas(){
	$(".list_etis span").dblclick(function(){
		a = $("#idTextoEtiquetas").val();
		b = $(this).html();
		if(a == ""){
			$("#idTextoEtiquetas").val(b);
		} else {
			$("#idTextoEtiquetas").val(a + ', ' +b);
		}
	});
}


function procesaSiguienteFoto(){
	urlstr = $("#btn_siguiente_foto").attr("href");
	if(typeof(urlstr) == 'undefined'){
		return false;
	}
	$.ajax({ 
			url: urlstr,
			type: "GET", 
			data: "ajax=si", 
			success: function(mmm){
				$(".col_1").html(mmm);
				setSiguienteAnterior();
			} 
		});	       
   return false;
}

function procesaAnteriorFoto(){
	urlstr = $("#btn_anterior_foto").attr("href");
	if(typeof(urlstr) == 'undefined'){
		return false;
	}
	$.ajax({ 
			url: urlstr,
			type: "GET", 
			data: "ajax=si", 
			success: function(mmm){
				$(".col_1").html(mmm);
				setSiguienteAnterior();
			} 
		});	       
   return false;

}

function procesaSiguienteLista(){
//TODO
	pages.avanza();
	return false;
/*
	urlstr = $("#pagina_siguiente").attr("href");
	if(typeof(urlstr) == 'undefined'){
		return false;
	}
	formLis = $("#form_listado");
	if(formLis[0]){
		return true;
	}
	$.ajax({ 
			url: urlstr,
			type: "GET", 
			data: "ajax=si", 
			success: function(mmm){
				objdiv = $(".listado_inferior");
				if(objdiv[0]){
					divInf = "listado_inferior";
				} else {
				   divInf = "col_1";
				}
				$("."+divInf).html(mmm);
				$(".pagina_anterior").click(procesaAnteriorLista);
				$(".pagina_siguiente").click(procesaSiguienteLista);
			} 
		});	       
   return false;
*/
}

function procesaAnteriorLista(){
//TODO
	pages.retro();
	return false;
/*
	urlstr = $("#pagina_anterior").attr("href");
	if(typeof(urlstr) == 'undefined'){
		return false;
	}
	formLis = $("#form_listado");
	if(formLis[0]){
		return true;
	}
	$.ajax({ 
			url: urlstr,
			type: "GET", 
			data: "ajax=si", 
			success: function(mmm){
				objdiv = $(".listado_inferior");
				if(objdiv[0]){
					divInf = "listado_inferior";
				} else {
				   divInf = "col_1";
				}
				$("."+divInf).html(mmm);
				$(".pagina_anterior").click(procesaAnteriorLista);
				$(".pagina_siguiente").click(procesaSiguienteLista);
			} 
		});	       
   return false;
*/
}

function centrarImg(){
	return;
/*
	a = $(".mod-img div img").width();
	if(a > 0){
		b = $(".mod-img div").width();
		c = (b-a)/2;
		if(c > 0){
			$(".mod-img div img").css("margin-left",c);
		}
	} else {
		a = $("video").width();
		if(a > 0){
			b = $(".mod-img div").width();
			c = (b-a)/2;
			if(c > 0){
				$("video").css("margin-left",c);
			}
		} else {
			setTimeout("centrarImg()",25);
		}
	}
*/
}

function login_validar(urlBase){
	var msg = new String();
	if($("#pass").val() == ""){
		msg = "el password no puede ser vacio.";
	}
	if($("#email").val() == ""){
		msg = " El email no puede estar vacio";
	}

	if(msg.length > 0){
		alert("Error:" + msg);
	} else {
		$("#miLogin").submit();
	}
}

function validar_email(urlBase, idCampo){
	var data;
	creaElemento(idCampo);
	
	exp = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	
	val = $("#"+idCampo).val();
	if(val.match(exp)){
		data = ajax_exist_email(urlBase, idCampo)
	} else {
		showError(idCampo, "no es una cuenta de correo válida.");
	}
	
}

function ajax_exist_email(urlBase, idEmail){
	$.ajax({
		type	: "POST",
		url		: urlBase + "/admin/ajax/exist-email",
		async	: false,
		data	: "email=" + $("#"+idEmail).val(),
		success	: function(datos){
			if(datos != '0'){
				showError(idEmail, "la cuenta de correo ya está registrada");
			} else {
				hideError(idEmail);
			}
		}
	});
}

function ajax_listado_usuarios(idObj) {
	$.ajax({
		type	: "POST",
		url		: "/apps/public/admin/ajax/listado-usuarios",
		async	: false,
		success	: function(datos){
			$("#"+idObj).html(datos);
		}
	});
}



	function valida_campo_texto_puro(idCampo, minimo){
		creaElemento(idCampo);
		//exp = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		exp = "^([a-zA-Z áéíóúÁÉÍÓÚñÑ]{"+minimo+",})$";
		exp = new RegExp(exp);
	
		val = $("#"+idCampo).val();
		if(val.match(exp)){
			hideError(idCampo);
		} else {
			showError(idCampo, "solo se permiten caracteres alfabéticos y "+minimo+"  como mínimo");
		}
	}
	
	function valida_alfa_numerico(idCampo, minimo){
		creaElemento(idCampo);
		//exp = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		exp = "^([a-zA-Z0-9]{"+minimo+",})$";
		exp = new RegExp(exp);
	
		val = $("#"+idCampo).val();
		if(val.match(exp)){
			hideError(idCampo);
		} else {
			showError(idCampo);
		}
	}
	
	function valida_clave2(id1, id2){
		if($('#'+id1).val() != $('#'+id2).val()){
			showError(id2, "La contrseña no es la misma");
		}
	}
	
	/**
	* creaElemento() : crear el bocadillo del mensaje de error
	* showError() : posiciona el bocadillo y muestra el mensaje de error
	* hideError() : oculta el bocadillo.
	**/
	function creaElemento(idCampo){
		//creamos el mensaje de error
		obj = $("#barra_error_"+idCampo);
		if(obj == null || obj.length == 0){
		    txt = "<p id='barra_error_"+idCampo+"' class='barra_error'>Valor no válido.</p>";
		    $("body").append(txt); 
		}
	}
	
	function showError(idCampo, mensaje){
		pos = $("#"+idCampo).offset();
		$("#barra_error_"+idCampo).animate({ top: (pos.top - 4), left: (pos.left + $("#"+idCampo).width()) }, "slow");
		$("#barra_error_"+idCampo).show();
		
		$("#barra_error_"+idCampo).show();
		$("#"+idCampo).addClass("error");
		
		$("#barra_error_"+idCampo).html(mensaje);
	}
	
	function hideError(idCampo){
		$("#"+idCampo).removeClass("error");
		$("#barra_error_"+idCampo).hide();
	}



	function showFoto(url1){
		a = $("#img640").attr('src');
		b = $("video source").attr("src"); 
		c = $("#fondoImg640").css("background-image"); 
		if(a || b || c) {
			$.ajax({ 
					url: url1,
					type: "GET", 
					data: "ajax=si", 
					success: function(mmm){
						$(".col_1").html(mmm);
						$("#datepicker" ).datepicker("setDate", $("#fechaStr").html()); 
						$("#fechaTexto").html($("#fechaStr").html());
						setSiguienteAnterior();
					} 
				});	       
		} else {
			location.href = url1;
		}
		return false;
	}


	/* Cookies */

	cokk = {
		setCookie : function(c_name,value,exdays){
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
			document.cookie=c_name + "=" + c_value + "; path=/";
		},
		getCookie : function(c_name) {
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++) {
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name) {
					return unescape(y);
				}
			}
		}
	};


	function checkCookie() {
		var pagina = cokk.getCookie("onanai_pagina");
		if (pagina != null && pagina != "" && pagina != 'undefined') {
			//console.log("pagina actual : " + pagina);
		} else {
			cokk.setCookie("onanai_pagina", 1, 1);
		}
	}





/**
 *
 **/
function setSiguienteAnterior(){
	objAnt = $("#btn_anterior_foto");
	objSig = $("#btn_siguiente_foto");

	if(objAnt.length == 1 && objSig.length == 1){
		id = $("#idFoto").html();
		fechaStr = $("#fechaStr").html();
		gps1 = $("#gps1Str").html();
		gps2 = $("#gps2Str").html();
		
		if(typeof(mapIndividual) == 'object'){
			if(markers.length > 0){
				for(i=0; i<markers.length; i++){
					markers[i].setMap(null);
				}
			}
			
			if(gps1 == 0 || gps2 == 0){
				//myLatlng = new google.maps.LatLng(40.470500000000, -3.586000000000);
			} else {
				myLatlng = new google.maps.LatLng(gps1, gps2);
				mapIndividual.panTo(myLatlng);
				markers.push(new google.maps.Marker({
						position: myLatlng, 
						map: mapIndividual,
						draggable: true, 
						animation: google.maps.Animation.DROP}));
			}
			
		}
		
		$("#fechaTexto").html(fechaStr);
		$("#datepicker" ).datepicker("setDate", fechaStr);
		$("#listaEtis").html($("#divListaEtis").html());
		c = $(".fondoThumb");
		act = '';
		sig = '';
		ant = '';
		for(i=0;i < c.length; i++){
			if($(c[i]).attr('id') == "fon_"+id){
				act = $(c[i]).attr('id');
				sig = $(c[i+1]).attr('id');
				if(typeof(sig) != 'string'){
					sig = '';
				}
			} else {
				if(act == ''){
					ant = $(c[i]).attr('id');
				}
			}
		}

		if(ant.length > 0){
			tmp = ant.split("_");
			id = tmp[1];
			$("#btn_anterior_foto").show();
			$("#btn_anterior_foto").attr("href", "/album/public/index/foto/id/"+id);
		} else {
			$("#btn_anterior_foto").hide();
		}

		if(sig.length > 0){
			tmp = sig.split("_");
			id = tmp[1];
			$("#btn_siguiente_foto").show();
			$("#btn_siguiente_foto").attr("href", "/album/public/index/foto/id/"+id);
		} else {
			$("#btn_siguiente_foto").hide();
		}

		$("#btn_siguiente_foto").click(procesaSiguienteFoto);
		$("#btn_anterior_foto").click(procesaAnteriorFoto);
	}
}


tabs = {
	tabSelec : function() {
		c = $(".tab_elem_contenedor li");
		for(i=0;i<c.length;i++){
			if($(c[i]).hasClass("tab_elem_seleccionado")){
				$(c).removeClass("tab_elem_seleccionado");
			}
		}
		$(this).addClass("tab_elem_seleccionado");

		pestania = $(this).attr('id');

		
		//display none a los que ya tienen gps
		if(pestania == 'tab_maps'){
/*
			c = $(".fondoThumb");
			for(i=0;i < c.length; i++){
				lat = c[i].getAttribute('maplat');
				lat = lat * 1;
				if(lat != 0){
					$(c[i]).hide();
				}
			}
*/
		} else  {
			c = $(".fondoThumb");
			for(i=0;i < c.length; i++){
				$(c[i]).show();
			}
		}

		
		// al cambiar de pestaña, ponemos los objetos seleccionados
		$(".admin_div_listado img").hide();

		if(pestania == 'tab_fecha'){
			$("#div_tab_fecha").show();
			$("#div_tab_etiqueta").hide();
			$("#div_tab_borrar").hide();
			$("#div_tab_regenerar").hide();
			$("#div_tab_agrupar").hide();
			$("#div_tab_maps").hide();
			arr = admin.arrFecha;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}
		if(pestania == 'tab_etiqueta'){
			$("#div_tab_fecha").hide();
			$("#div_tab_etiqueta").show();
			$("#div_tab_borrar").hide();
			$("#div_tab_regenerar").hide();
			$("#div_tab_agrupar").hide();
			$("#div_tab_maps").hide();
			arr = admin.arrEtiqueta;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}
		if(pestania == 'tab_borrar'){
			$("#div_tab_fecha").hide();
			$("#div_tab_etiqueta").hide();
			$("#div_tab_borrar").show();
			$("#div_tab_regenerar").hide();
			$("#div_tab_agrupar").hide();
			$("#div_tab_maps").hide();
			arr = admin.arrBorrar;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}
		if(pestania == 'tab_regenerar'){
			$("#div_tab_fecha").hide();
			$("#div_tab_etiqueta").hide();
			$("#div_tab_borrar").hide();
			$("#div_tab_regenerar").show();
			$("#div_tab_agrupar").hide();
			$("#div_tab_maps").hide();
			arr = admin.arrRegenerar;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}

		if(pestania == 'tab_agrupar'){
			$("#div_tab_fecha").hide();
			$("#div_tab_etiqueta").hide();
			$("#div_tab_borrar").hide();
			$("#div_tab_regenerar").hide();
			$("#div_tab_agrupar").show();
			$("#div_tab_maps").hide();
			arr = admin.arrAgrupar;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}

		if(pestania == 'tab_maps'){
			$("#div_tab_fecha").hide();
			$("#div_tab_etiqueta").hide();
			$("#div_tab_borrar").hide();
			$("#div_tab_regenerar").hide();
			$("#div_tab_agrupar").hide();
			$("#div_tab_maps").show();
			arr = admin.arrMaps;
			for(i=0;i<arr.length;i++){
				if(arr[i]){
					$("#fon_"+arr[i]+" img").show();
				}
			}
		}

		

	},

	tabsIni : function() {
		c = $(".tab_elem_contenedor li");
		for(i=0;i<c.length;i++){
			$(c[i]).click(this.tabSelec);
		}
	},
	tabActiva : function(){
		var activa = "";
		c = $(".tab_elem_contenedor li");
		for(i=0;i<c.length;i++){
			if($(c[i]).hasClass("tab_elem_seleccionado")){
				activa = $(c[i]).attr("id");
			}
		}
		return activa;
	}
}



admin = {
	arrFecha : false,
	conFecha : 0,
	arrEtiqueta : false,
	conEtiqueta : 0,
	arrBorrar : false,
	conBorrar : 0,
	arrRegenerar : false,
	conRegenerar : 0,
	arrAgrupar : false,
	conAgrupar : 0,
	arrMaps : false,
	conMaps : 0,
	otras : false,
	etiReemplaza : false,
	etiAniade : true,

	init : function(){
		this.arrFecha = new Array();
		this.conFecha = 0;
		this.arrEtiqueta = new Array();
		this.conEtiqueta = 0;
		this.arrBorrar = new Array();
		this.conBorrar = 0;
		this.arrRegenerar = new Array();
		this.conRegenerar = 0;
		this.arrAgrupar = new Array();
		this.conAgrupar = 0;
		this.arrMaps = new Array();
		this.conMaps = 0;
	},
	click : function(id){
		if(tabs.tabActiva() == 'tab_fecha'){
			ind = this.inArray(id, this.arrFecha);
			if(ind > -1){
				this.arrFecha[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrFecha[this.conFecha++] = id;
				$("#fon_"+id+" img").show();
			}
		}
		if(tabs.tabActiva() == 'tab_etiqueta'){
			ind = this.inArray(id, this.arrEtiqueta);
			if(ind > -1){
				this.arrEtiqueta[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrEtiqueta[this.conEtiqueta++] = id;
				$("#fon_"+id+" img").show();
			}
		}
		if(tabs.tabActiva() == 'tab_borrar'){
			ind = this.inArray(id, this.arrBorrar);
			if(ind > -1){
				this.arrBorrar[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrBorrar[this.conBorrar++] = id;
				$("#fon_"+id+" img").show();
			}
		}
		if(tabs.tabActiva() == 'tab_regenerar'){
			ind = this.inArray(id, this.arrRegenerar);
			if(ind > -1){
				this.arrRegenerar[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrRegenerar[this.conRegenerar++] = id;
				$("#fon_"+id+" img").show();
			}
		}
		if(tabs.tabActiva() == 'tab_agrupar'){
			ind = this.inArray(id, this.arrAgrupar);
			if(ind > -1){
				this.arrAgrupar[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrAgrupar[this.conAgrupar++] = id;
				$("#fon_"+id+" img").show();
			}
		}
		if(tabs.tabActiva() == 'tab_maps'){
			ind = this.inArray(id, this.arrMaps);
			if(ind > -1){
				this.arrMaps[ind] = '';
				$("#fon_"+id+" img").hide();
			} else {
				this.arrMaps[this.conMaps++] = id;
				$("#fon_"+id+" img").show();
			}
		}

	},
	procesarFecha : function(){
		var arr;
		var c = 0;
		var ids = '';
		var fecha;
		arr = new Array();
		fecha = $("#adminDatePicker").val();

		for(i=0;i<admin.arrFecha.length;i++){
			if(admin.arrFecha[i]){
				arr[c++] = admin.arrFecha[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrFecha[i];
			}
		}

		if(ids && fecha){
			if(this.otras){
				fecha = "0000-00-00";
			}
			$.ajax({ 
				url: '/album/public/admin/index/admin-procesar',
				type: "POST", 
				data: {ajax: "si", ids: ids, fecha: fecha}, 
				success: function(mmm){
					location.reload();
				} 
			})
		}
		return false;
	},
	marcarFechaOtras : function(){
		if(this.otras){
			this.otras = false;
			$("#adminDatePicker" ).datepicker("enable");
		} else {
			this.otras = true;
		//	$("#idMarcarOtras").attr("disabled", "");
			$("#adminDatePicker" ).datepicker("disable");
		}
	},
	etiMarcarReemplaza : function(){
		$("#idBtnReemplazaEti").css("opacity", "1");
		$("#idBtnMasEti").css("opacity", ".5");
		this.etiReemplaza = true;
		this.etiAniade = false;
	},
	etiMarcarAniade : function(){
		$("#idBtnReemplazaEti").css("opacity", ".5");
		$("#idBtnMasEti").css("opacity", "1");
		this.etiReemplaza = false;
		this.etiAniade = true;
	},
	procesarEtiqueta : function(){
		var arr;
		var c = 0;
		var ids = '';
		var texto;

		texto = $("#idTextoEtiquetas").val();
		arr = new Array();

		for(i=0;i<admin.arrEtiqueta.length;i++){
			if(admin.arrEtiqueta[i]){
				arr[c++] = admin.arrEtiqueta[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrEtiqueta[i];
			}
		}

		if(ids){
			$.ajax({ 
				url: '/album/public/admin/index/admin-procesar-etis',
				type: "POST", 
				data: {ajax: "si", ids: ids, reemplaza: this.etiReemplaza, texto: texto}, 
				success: function(mmm){
					location.reload();
				} 
			})
		}
		return false;

	},
	procesarBorrar: function(){
		var arr;
		var c = 0;
		var ids = '';

		arr = new Array();

		for(i=0;i<admin.arrBorrar.length;i++){
			if(admin.arrBorrar[i]){
				arr[c++] = admin.arrBorrar[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrBorrar[i];
			}
		}

		if(ids){
			$.ajax({ 
				url: '/album/public/admin/index/admin-procesar-borrar',
				type: "POST", 
				data: {ajax: "si", ids: ids}, 
				success: function(mmm){
					location.reload();
				} 
			})
		}
		return false;
	},
	/**
	 * seleccionamos, deseleccionamos todo
	 **/
	procesarRegenerarMarcar: function(){
		$(".admin_div_listado div").each(function(a,b){
			id = b.id;
			c = id.split("_");
			id = c[1];
			admin.click(id);
		});
	},
	procesarRegenerar: function(){
		var arr;
		var c = 0;
		var ids = '';

		arr = new Array();

		for(i=0;i<admin.arrRegenerar.length;i++){
			if(admin.arrRegenerar[i]){
				arr[c++] = admin.arrRegenerar[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrRegenerar[i];
			}
		}

		if(ids){
			$.ajax({ 
				url: '/album/public/admin/index/admin-procesar-regenerar',
				type: "POST", 
				data: {ajax: "si", ids: ids}, 
				success: function(mmm){
					location.reload();
				} 
			})
		}
		return false;
	},

	procesarAgrupar : function(){
		var arr;
		var c = 0;
		var ids = '';

		arr = new Array();

		for(i=0;i<admin.arrAgrupar.length;i++){
			if(admin.arrAgrupar[i]){
				arr[c++] = admin.arrAgrupar[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrAgrupar[i];
			}
		}


		if(ids){
			//recuperamos el grupo seleccionado
			radioCheck = $('input:radio[name=groupGrupos]:checked');
			grupoId = radioCheck.val();
			if(grupoId == 0){
				nombre = $("#idNuevoGrupo").val();
			} else {
				nombre = "";
			}

			if(typeof(grupoId) == "undefined"){
				alert("Debes de seleccionar un grupo");
				return false;
			}
			if(grupoId == 0 && nombre == ""){
				alert("Tienes que escribir el nombre del nuevo grupo");
				return false;
			}

			$.ajax({ 
				url: '/album/public/admin/index/admin-procesar-agrupar',
				type: "POST", 
				data: {ajax: "si", ids: ids, idGrupo: grupoId, nombreGrupo:nombre}, 
				success: function(mmm){
					location.reload();
				} 
			})
		}
		return false;
	},
	
	procesarMaps : function(){
		var arr;
		var i;
		var c = 0;
		var ids = '';
		arr = new Array();
		for(i=0;i<admin.arrMaps.length;i++){
			if(admin.arrMaps[i]){
				arr[c++] = admin.arrMaps[i];
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + admin.arrMaps[i];
			}
		}
		if(ids){
			if(markador.length > 0){
				pos = markador[0].getPosition();
				posLat = pos.lat();
				posLng = pos.lng();
				$.ajax({ 
					url: '/album/public/admin/index/admin-procesar-maps',
					type: "POST", 
					data: {ajax: "si", ids: ids, lat: posLat, lng:posLng}, 
					success: function(mmm){
						console.log('fin 1');
						//location.reload();
					} 
				})
			} else {
				alert("No ha seleccionado una posición en el mapa.");
			}
		}
		//el resto
		var a;
		var arrIds  = ids.split(",");
		for(i=0;i < markers.length;i++){
			a = markers[i];
			if(this.inArray(a.id, arrIds) == -1){
				var lat = $("#fon_"+a.id).attr("maplat");
				var lng = $("#fon_"+a.id).attr("maplng");
				if(a.position.lat() != lat && a.position.lng() != lng){
					$.ajax({ 
						url: '/album/public/admin/index/admin-procesar-maps',
						type: "POST", 
						data: {ajax: "si", ids: a.id, lat: a.position.lat(), lng: lat && a.position.lng()}, 
						success: function(mmm){
							console.log('fin 2');
							//location.reload();
						} 
					})
				}
			}
		}
		return false;
	},

	inArray : function(needle, haystack) {
	    var length = haystack.length;
	    for(var i = 0; i < length; i++) {
    	    if(haystack[i] == needle) return i;
	    }
    	return -1;
	},
	
	ocultaSinGps : function() {
		var lat;
		var lng;
		var c = $(".fondoThumb");
		for(var i=0;i < c.length; i++){
			lat = c[i].getAttribute('maplat');
			lat = lat * 1;
			if(lat != 0){
				$(c[i]).hide();
			}
		}
	}

}


	$(document).ready(function(){
		checkCookie();
		tabs.tabsIni();
	});
