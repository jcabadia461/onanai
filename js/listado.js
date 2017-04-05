var g_pagina = 0;
var g_pidiendo = false;
var g_agrupaFecha = true;
var g_imgs = new Object();
var g_todas_cargadas = false;
var g_scrollDiv = false;
var g_opacity = .05;
var g_administrar = false;
var g_height_changed = false;
var g_ratio = 1;
var g_resize = false;


function showTree() {
	if($("div.s-menu").css("display") == "block"){
		$("div.s-menu").hide();
	}
	if($(".col_2").css("display") == "block"){
		$("div.col_2").css('display','none');
	} else {
		$("div.col_2").css('display','block');
		varTop = $(".menu").offset().top;
		alturaMenu = $(".menu").height();
		$(".col_2").css("top", (varTop + alturaMenu + 4));
	}
}

function showMenuResponsive() {
	if($(".col_2").css("display") == "block"){
		$("div.col_2").hide();
	}
	if($("div.s-menu").css("display") == "block"){
		$("div.s-menu").hide();
	} else {
		$("div.s-menu").show();
		varTop = $(".menu").offset().top;
		alturaMenu = $(".menu").height();		
		$("div.s-menu").css("top", (varTop + alturaMenu));
	}
}

function getCurrentHeight(){
	alto = $(".prueba").css("content");
	alto = alto.replace(/\"/g, "");
	alto = alto.replace(/\'/g, "");
	alto = parseInt(alto);
	return alto;	
}

//icono agrandar todas las thumbs
function maximise(){
	g_ratio = g_ratio + .1;
	for(var key in g_imgs){
		g_imgs[key].finalPaintImg();
	}
}
// icono enpequeñeser todas las thumbs
function minimise(){
	g_ratio = g_ratio - .1;
	for(var key in g_imgs){
		g_imgs[key].finalPaintImg();
	}
}

function listado(){
	elemPrincipal = document.getElementById('listadoImgs');
	elemPrincipal.setAttribute('class', 'listadoImgsFlex');
	if(!g_todas_cargadas){
		if(g_pidiendo == false){
			g_pidiendo = true;
			url = $("#fechaListado").val();
			if(url.search('mas-valoradas') > 1 || url.search('mas-vistas') > 1)
				g_agrupaFecha = false;
			else
				g_agrupaFecha = true;
			url = url.concat("/pagina/").concat(g_pagina++);
			$.getJSON(url, function (response) {
				var num = response.length;
				if(num == 0)
					g_todas_cargadas = true;
				num = (num - 15);
				if(num < 1)
					g_scrollDiv = false;
				$.each(response, function(idx, rec){
					g_imgs[rec.id] = new objImg(rec);
					g_imgs[rec.id].insertarEn(elemPrincipal);
					if(idx == num) {
						g_scrollDiv = rec.id;
					}
				})
				g_pidiendo = false;
			});
		}
	}
}

objImg = function(dataMedia){
	this.elemDiv, this.elem, this.elemCapaVideo, this.elemVideo, this.elemBarra;
	var _data = dataMedia;
	var _enThumb = true;
	var _enVideo = false;
	var _self = this;
	var _oriWidth, _oriHeight;

	var _init = function(){
		this.elemDiv = document.createElement("div");
		this.elemDiv.setAttribute('class', 'imageThu2');
		this.elem = document.createElement("img");
		this.elem.setAttribute('id', _data.id);
		this.elem.setAttribute('src', this.getThumb());
		this.elem.onload = function(){_self.finishLoadImg();};
		this.elem.style.opacity = g_opacity;
		this.elem.onclick = function(){_self.enClick()};

		this.elemDiv.appendChild(this.elem);

	}

	this.finishLoadImg = function(){
		_oriWidth = this.elem.clientWidth;
		_oriHeight = this.elem.clientHeight;
		this.elem.onload = null;
		this.finalPaintImg();
	}

	this.insertarEn = function(contenedor){
		contenedor.appendChild(this.elemDiv);
	}

	this.enClick = function(){
		if(_enThumb){
			this.toBig();
		} else {
			this.toThumb();
		}
	}

	var barraBotones = function() {
		if(typeof this.elemBarra == 'object'){
			this.elemBarra.style.display = 'block';
		} else {
			this.elemBarra = document.createElement('div');
			this.elemBarra.className = 'barraBotones';

			var botones = document.createElement('div');
			botones.setAttribute('class', 'filaBotones');

			//favoritos
			var favorito = document.createElement('img');
			favorito.className = 'imgBotones';
			if(_data.favorito > 4) {
				favorito.src = '/album/public/img/iconos/favorito.png';
			} else {
				favorito.src = '/album/public/img/iconos/favoritoLess-48.png';
			}
			botones.appendChild(favorito);

			//img zoom
			var zoom = document.createElement('img');
			zoom.setAttribute('src', '/album/public/img/iconos/ico-full-img.png');
			zoom.setAttribute('class', 'imgBotones');
			zoom.onclick = function() {
				_self.enClick()
			};
			botones.appendChild(zoom);

			//img cerrar
			var cerrar = document.createElement('img');
			cerrar.setAttribute('src', '/album/public/img/iconos/cerrar.png');
			cerrar.setAttribute('class', 'imgBotones');
			cerrar.onclick = function() {
				_self.enClick()
			};
			botones.appendChild(cerrar);

			//hamburguesa
			var ham = document.createElement('div');
			ham.className = 'hamburger hamburger--slider';
			ham.innerHTML = '<div class="hamburger-box"> <div class="hamburger-inner"></div> </div>';
			ham.onclick = function(){
				this.classList.toggle("is-active");
				_self.hamburgerClick();
			}
			botones.appendChild(ham);

			// fin botones
			this.elemBarra.appendChild(botones);
			if(_data.tipo == 'V'){
				this.elemCapaVideo.appendChild(this.elemBarra);
			} else {
				this.elemDiv.appendChild(this.elemBarra);
			}
		}
	}

	this.hamburgerClick = function(){
		var ham = this.elemBarra.getElementsByClassName("hamburger")[0];
		var btns = this.elemBarra.getElementsByTagName('img');
		if(ham.className.search(/is-active/g) > -1){
			this.elemBarra.style.backgroundColor = "rgba(188, 215, 243, 0.3)";
			for(var i=0; i < btns.length; i++){
				btns[i].className+= " show";
			}
		} else {
			this.elemBarra.style.backgroundColor = '';
			for(var i=0; i < btns.length; i++){
				btns[i].className = btns[i].className.replace(" show", '');
			}
		}
	}

	var creaCapaVideo = function(){
		this.elemCapaVideo = document.createElement('div');
		this.elemCapaVideo.setAttribute('class', 'capaVideo');

		this.elemVideo = document.createElement("video");
		if(screen.availWidth > 600){
			this.elemVideo.src = "/videos/"+_data.id+"/nada640x480.mp4";
			this.elemVideo.poster = _data.recorte.t640;
		} else {
			this.elemVideo.src = "/videos/"+_data.id+"/nada320x240.mp4";
			this.elemVideo.poster = _data.recorte.t320;
		}
		this.elemVideo.setAttribute('controls', '');

		this.elemCapaVideo.appendChild(this.elemVideo);

		this.elemDiv.appendChild(this.elemCapaVideo);
	}

	this.toBig = function(){
		_enThumb = false;
		this.elem.removeAttribute('width');
		this.elem.removeAttribute('height');

		if(_data.tipo == 'V'){
			_enVideo = true;
			this.elem.style.display = 'none';
			if(typeof this.elemCapaVideo == 'undefined'){
				creaCapaVideo.apply(this);
			} else {
				this.elemCapaVideo.style.display = 'block';
			}
		} else {
			if(screen.availWidth > 600){
				this.elem.src = _data.recorte.t640;
			} else {
				this.elem.src = _data.recorte.t320;
			}
		}
		barraBotones.apply(this);
	}

	this.toThumb = function(){
		_enThumb = true;
		if(typeof this.elemBarra == 'object')
			this.elemBarra.style.display = 'none';

		if(_enVideo){
			_enVideo = false;
			this.elemVideo.pause();
			this.elemCapaVideo.style.display = 'none';
			this.elem.style.display = '';
		} else {
			this.elem.setAttribute('src', this.getThumb());
		}
		this.finalPaintImg();
	}
	this.getThumb = function(){
		if(screen.availWidth > 1600){
			//return _data.recorte.t320;
			return _data.recorte.thumb;
		} else {
			return _data.recorte.thumb;
		}
	}

	this.finalPaintImg = function(){
		if(_enThumb){
			if(g_ratio > 1){
				if(this.elem.src.indexOf(_data.recorte.t320) == -1){
					this.elem.src = _data.recorte.t320;
				}
			} else {
				if(this.elem.src.indexOf(this.getThumb()) == -1){
					this.elem.src = this.getThumb();
				}
			}
			this.elem.width = _oriWidth * g_ratio;
			this.elem.height = _oriHeight * g_ratio;
		}
	}

	_init.apply(this);
}



window.onresize = function(event) {
	if(!g_resize){
		g_resize = true;
		setTimeout(function(){responsivo();}, 250);
	}
};

function getRatio(){
	var w = document.body.clientWidth;
	var ratio = 1;
	if(w > 1400 ){
		ratio = 1.2;
	}
	if(w > 1200 && w < 1400){
		ratio = 1;
	}
	if(w > 1000 && w < 1200){
		ratio = .9;
	}
	if(w > 800 && w < 1000){
		ratio = .8;
	}
	if(w > 600 && w < 800){
		ratio = .7;
	}
	if(w > 400 && w < 600){
		ratio = .6;
	}
	if(w < 400){
		ratio = .5;
	}
	return ratio;
}

function responsivo(){
	var ratio = getRatio();
	if(g_ratio != ratio){
		g_ratio = ratio;
		console.log(g_ratio);
		for(var key in g_imgs){
			g_imgs[key].finalPaintImg();
		}
	}
	g_resize = false;
}

$(document).ready(function() {
	g_ratio = getRatio();
	listado();
});












/*
* OBJETO img
*/
objImg2 = function() {
	this.p1Container;
	this.p1Data;
	this.p1Borrado = false;
	this.p1EsVideo = false;
	this.p1TipoContainer;
	this.p1Oculto = false;
	/* el div que contiene al img */
	this.p1ElemDiv;
	/* el img */
	this.p1ElemImg;
	/* small, big, checked */
	this.p1Estado = 'small';
	
	this.init = function(data, tipo) {
		this.p1Data = data;
		this.p1TipoContainer = tipo;
		if(this.p1Data.tipo == 'V')
			this.p1EsVideo = true;
	}

	this.setContainer = function(){
		if(this.p1TipoContainer == 'fecha'){
			this.p1Container = $("#"+this.p1Data.fecha);
			if(this.p1Container.length == 0) {
				var tmpDiv = $('<div/>', {'id': this.p1Data.fecha});
				var tmpP = $('<p/>', {'text':this.p1Data.fecha});
				tmpDiv.append(tmpP);
				$("#listadoImgs").append(tmpDiv);
				this.p1Container = $("#"+this.p1Data.fecha);
			}
		}
		if(this.p1TipoContainer == 'todas'){
			this.p1Container = $("#todastodas");
			if(this.p1Container.length == 0) {
				tmpDiv = $('<div/>', {'id':"todastodas"});
				$("#listadoImgs").append(tmpDiv);
				this.p1Container = $("#todastodas");
			}
		}
	}

	this.setHeight = function(val){
		$(this.p1ElemImg).css('height', val+'em');
	}

	this.showImg = function(){
		this.setContainer();
		var tmpDiv = $('<div/>', {'id':this.p1Data.id, 'class':'thu'});
		var tmpImg = $('<img/>', {
			'id':'img_'+this.p1Data.id, 
			'style':'opacity:'+g_opacity, 
			'class':'imageThu', 
			'src':this.p1Data.recorte.t320
		});
		tmpDiv.append(tmpImg);
		$(this.p1Container).append(tmpDiv);
		this.p1ElemDiv = $("#"+this.p1Data.id);
		this.p1ElemImg = $("#img_"+this.p1Data.id);
		$(this.p1ElemImg).click(function(){clicked(this);});
	}

	this.click = function(){
		switch(this.p1Estado){
			case "small" :
				if(g_administrar)
					this.checkOn();
				else
					this.toBig();
				break;
			case "big" : 
			case "checked":
				this.toSmall();
				break;
		}
	}

	this.checkOn = function(){
		$(this.p1ElemDiv).attr('class', 'thuCheck');
		this.p1Estado = 'checked';
	}

	this.toBig = function(){
		$(this.p1ElemDiv).attr('class', 'bigThu');
		$(this.p1ElemImg).attr('class', 'bigThuImg');

		var tmpA = $('<a/>', {
			'href':'#', 
			'onclick': 'clickedAux('+this.p1Data.id+');return false;'
		});
		var tmpImg = $('<img/>', {
			'class':'iconCerrar', 
			'src':'/album/public/img/iconos/cerrar.png',
			'style':'position: absolute; right: 5px; top:-9px; z-index:2001;'
		});
		tmpA.append(tmpImg);
		$(this.p1ElemDiv).append(tmpA);
		//Favorito
		var tmpA = $('<a/>', {
			'href':'#', 
			'onclick': 'clickedFavorite('+this.p1Data.id+');return false;'
		});
		if(this.p1Data.favorito > 4) {
			tmpImg =  $('<img/>', {
				'class':'iconFavorito', 
				'src':'/album/public/img/iconos/favorito.png',
				'style':'position: absolute; right: 110px; top:-9px; z-index:2001;'
			});
		} else {
			tmpImg =  $('<img/>', {
				'class':'iconFavorito', 
				'src':'/album/public/img/iconos/favoritoLess-48.png',
				'style':'position: absolute; right: 110px; top:-9px; z-index:2001;'
			});
		}
		tmpA.append(tmpImg);
		$(this.p1ElemDiv).append(tmpA);
		// ** Favorito
		if(!this.p1EsVideo) {
			var tmpA = $('<a/>', {
				'href' : '/album/recorte.php?type=3&id='+this.p1Data.id,
				'target': '_blank'
			});
			var tmpImg = $('<img/>', {
				'class': 'iconAmpliar',
				'src': '/album/public/img/iconos/ico-full-img.png',
				'style': 'position: absolute; right: 55px; top:-9px; z-index:2001;'
			});
			tmpA.append(tmpImg);
			$(this.p1ElemDiv).append(tmpA);
		}
		if(this.p1EsVideo){
			var tmpIframe = $('<iframe/>', {
				'src':'/album/public/ver/index/video/id/'+this.p1Data.id,
				'width':'100%'
				//'height':'510px'
			});
			$(this.p1ElemDiv).append(tmpIframe);
			$(this.p1ElemImg).hide();
		} else {
			$(this.p1ElemImg).attr("src",this.p1Data.recorte.t640);
		}
		this.p1Estado = 'big';
	}

	this.toSmall = function(){
		/* eliminamos los botones añadidos en el toBig */
		$("#" + this.p1Data.id + " a").remove();
		/* si existe iframe de video, lo eliminamos */
		iframe = $("#" + this.p1Data.id + " iframe");
		if(iframe.length == 1){
			iframe.remove();
			this.p1ElemImg.show();
		}

		$(this.p1ElemDiv).attr('class', 'thu');
		$(this.p1ElemImg).attr('class', 'imageThu');
		$(this.p1ElemImg).attr("src",this.p1Data.recorte.t320);
		this.p1Estado = 'small';
	}

	this.hideNotVisited = function(){
		if(this.p1Data.visitas == 0) {
			this.fadeOutElem();
		} else {
			if(this.p1Oculto) {
				this.fadeInElem();
			}

		}
	}
	this.hideVisited = function(){
		if(this.p1Data.visitas > 0) {
			this.fadeOutElem();
		} else {
			if(this.p1Oculto){
				this.fadeInElem();
			}
		}
	}

	this.fadeOutElem = function(){
		$(this.p1ElemDiv).fadeOut("slow", function(){});
		this.p1Oculto = true;
	}
	this.fadeInElem = function(){
		$(this.p1ElemDiv).fadeIn("slow", function(){});
		this.p1Oculto = false;
	}


	this.removeHide = function(){
		if(this.p1Oculto){
			$(this.p1ElemDiv).show();
			this.p1Oculto = false;				
		}
	}

}


function clickedAux(id){
	var img =$("#img_"+id);
	clicked(img[0]);
}

function clickedFavorite(id){
	$.post("/album/public/ver/admin/",
		{accion: 'favorite', ids: id},
		function(data, status){
			console.log("Data: " + data + "\nStatus: " + status);
			if(data == "OK" && status == "success"){
				alert('marcado como favorito');
			}
		});	
}

function clicked(a){
	var idStr = $(a).attr('id');
	var idArr = idStr.split('_');
	var id = idArr[1];
	g_imgs[id].click();
}

/** ************************************************************************************ **/
 
/**
* funcion que nos permite saber si un elemento está en la parte visible de la página.
* $("#id").isOnScreen() == true -> el elemento está en la parte visible de la pantalla
**/ 

$.fn.isOnScreen = function(){
	
	var win = $(window);
	
	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();
	
	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();
	
	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	
};

/**
* cada vez que hacemos scroll, comprobamos si el div es visible
**/
$(window).scroll(function(){
	doScroll();
});

doScroll = function(){
	if(g_pidiendo == false) {
		if (g_scrollDiv) {
			if($("#"+g_scrollDiv).isOnScreen() || $("#alFinal").isOnScreen()){
				listado();
			}
		}
	}
	//Si promo01 está visible pero no en pantalla, la ocultamos.
	if($(".col_2").css('display') == 'block') {
		if(!$(".col_2").isOnScreen()){
			$(".col_2").hide();
		}
	}
	// Si s-menu está visible pero no en pantalla, la ocultamos
	if($("div.s-menu").css("display") == 'block') {
		if(!$("div.s-menu").isOnScreen()){
			$("div.s-menu").hide();
		}
	}
}
/*
	$(window).scroll(function(){
		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		var  scrolltrigger = 0.98;

		if  ((wintop/(docheight-winheight)) > scrolltrigger) {
			listado();
		}
	});
*/
adminClick = function(){
	var objElemMenu = $(".menu");
	var objElemMenuAdmin = $(".menu-admin");
	var objElemTree = $(".tree");

	if($(objElemMenuAdmin).css('display') == 'block'){
		g_administrar = false;
		$(objElemMenuAdmin).hide();
		objElemMenu.removeClass("admin");
	} else {
		g_administrar = true;
		objElemMenu.addClass("admin");
		$(objElemMenuAdmin).show();
	}
	alturaMenu = $(".menu").height();
	$(".col_1").css("margin-top",alturaMenu);
}


getCheckedElems = function(){
	var ids = '';
	for(var index in g_imgs){ 
		if(g_imgs[index].p1Estado == 'checked'){
			if(ids)
				ids+=','+g_imgs[index].p1Data.id;
			else
				ids = g_imgs[index].p1Data.id;
		}
	}	
	return ids;
}

hideCheckedElems = function(){
	for(var index in g_imgs){ 
		if(g_imgs[index].p1Estado == 'checked'){
			g_imgs[index].fadeOutElem();
		}
	}
}

unCheckElems = function(){
	for(var index in g_imgs){ 
		if(g_imgs[index].p1Estado == 'checked'){
			g_imgs[index].toSmall();
		}
	}
}

hideNotCheckedElems = function(){
	$('.col_2').hide();
	for(var index in g_imgs){ 
		if(g_imgs[index].p1Estado != 'checked'){
			g_imgs[index].fadeOutElem();
		}
	}
	listado();
}

adminRight = function(){
	doAdmin('right');
}

adminLeft = function(){
	doAdmin('left');
}

adminDate = function(f_year, f_month, f_day, f_grupo){
	var f_fecha = f_year + "-" + f_month + "-" + f_day;
	var strIds = getCheckedElems();
	if(strIds) {
		$.post("/album/public/ver/admin/",
			{accion: 'fecha', ids: strIds, fecha: f_fecha, grupo: f_grupo},
			function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
				if(data == "OK" && status == "success"){
					hideCheckedElems();
					unCheckElems();
				}
			});
	}

}

adminTags = function(f_tags){
	var strIds = getCheckedElems();
	if(strIds) {
		$.post("/album/public/ver/admin/",
			{accion: 'tags', ids: strIds, tags: f_tags},
			function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
				if(data == "OK" && status == "success"){
					unCheckElems();
				}
			});	
	}
}
adminTagsLess = function(f_tags){
	var strIds = getCheckedElems();
	if(strIds) {
		$.post("/album/public/ver/admin/",
			{accion: 'tagsLess', ids: strIds, tags: f_tags},
			function(data, status){
				console.log("Data: " + data + "\nStatus: " + status);
				if(data == "OK" && status == "success"){
					unCheckElems();
				}
			});	
	}
}

adminDelete = function(){
	if(confirm("Seguro quiere eliminar lo seleccionado?")){
		doAdmin('delete');
	}
}

doAdmin = function(accion){
	$.post("/album/public/ver/admin/",
		{accion: accion, ids: getCheckedElems()},
		function(data, status){
			console.log("Data: " + data + "\nStatus: " + status);
			if(data == "OK" && status == "success"){
				hideCheckedElems();
				unCheckElems();
			}
		});	
}

filterMoreVisited = function(){
	$('.s-menu').hide();
	for(var index in g_imgs){ 
		g_imgs[index].hideNotVisited();
	}	
}

filterLessVisited = function(){
	$('.s-menu').hide();
	for(var index in g_imgs){ 
		g_imgs[index].hideVisited();
	}	
}

removeFilters = function(){
	$('.s-menu').hide();
	for(var index in g_imgs){ 
		g_imgs[index].removeHide();
	}	
}
/**
 *
 * dialogo de cambio de fecha y etiquetas
 *
 **/
	 $(function() {
	 	var dialog, form, dialogTags, dialogTagsLess;
	 	function chgDate() {
	 		var f_year = $("#f_year").val();
	 		var f_month = $("#f_month").val();
	 		var f_day = $("#f_day").val();
	 		var f_grupo = $("#f_grupo").val();
	 		dialog.dialog( "close" );
	 		adminDate(f_year, f_month, f_day, f_grupo);
	 	}
	 	function chgTags() {
	 		var f_tags = $("#f_tags").val();
	 		dialogTags.dialog( "close" );
	 		adminTags(f_tags);
	 	}
	 	function chgTagsLess(){
	 		var f_tags = $("#f_tags_less").val();
	 		dialogTagsLess.dialog( "close" );
	 		adminTagsLess(f_tags);
	 	}
	 	dialog = $( "#dialog-form" ).dialog({
	 		autoOpen: false,
	 		height: 290,
	 		width: 350,
	 		modal: true,
	 		buttons: {
	 			"Modificar fecha": chgDate,
	 			Cancel: function() {
	 				dialog.dialog( "close" );
	 			}
	 		},
	 		close: function() {}
	 	});
	 	dialogTags = $( "#dialog-form-tags" ).dialog({
	 		autoOpen: false,
	 		height: 260,
	 		width: 350,
	 		modal: true,
	 		buttons: {
	 			"Modificar tags": chgTags,
	 			Cancel: function() {
	 				dialogTags.dialog( "close" );
	 			}
	 		},
	 		close: function() {}
	 	});
	 	dialogTagsLess = $( "#dialog-form-tags-less" ).dialog({
	 		autoOpen: false,
	 		height: 260,
	 		width: 350,
	 		modal: true,
	 		buttons: {
	 			"Eliminar tags": chgTagsLess,
	 			Cancel: function() {
	 				dialogTags.dialog( "close" );
	 			}
	 		},
	 		close: function() {}
	 	});
	 	$("#adminDateButton").click(function() {dialog.dialog( "open" );});
	 	$("#adminTagsButton").click(function() {dialogTags.dialog( "open" );});
	 	$("#adminTagsLessButton").click(function() {dialogTagsLess.dialog( "open" );});
	 });
