
	easyFin = function(){
		pages.trabajando = false;
		pages.paginas();
	}

	// objeto que controla la paginación
	pages = {
		trabajando: false,
		widDiv:0,
		actual:1,
		ultima:1,
		ancho:800,

		getWid : function(){
			obj = $("#capas");
			wid = obj.css("width");
			wid = wid.split("px");
			wid = wid[0];
			this.widDiv = wid*-1;
		},
		getMarginLeft: function(){
			obj = $("#capas");
			mar = obj.css("margin-left");
			mar = mar.split("px");
			mar = mar[0];
			return mar*1;
		},
		avanza: function(){
			if(this.trabajando == false){
				if(this.widDiv == 0){
					this.getWid();
				}
				if((this.getMarginLeft() - this.ancho) > this.widDiv){
					this.actual++;
					this.trabajando = true;
					$("#capas").animate({"margin-left": "-="+this.ancho+"px"}, {queue:false, duration:700, easing:"expoEaseIn", complete:easyFin});
				}
			}
		},
		retro: function(){
			if(this.trabajando == false){
				if(this.widDiv == 0){
					this.getWid();
				}
				if((this.getMarginLeft() + this.ancho) < 1){
					this.actual--;
					this.trabajando = true;
					$("#capas").animate({"margin-left": "+="+this.ancho+"px"}, {queue:false, duration:700, easing:"expoEaseIn", complete:easyFin});
				}
			}
		},
		paginas: function(){
			if(this.actual == this.ultima){
				$(".pagina_siguiente").css("opacity",".2");
			} else {
				$(".pagina_siguiente").css("opacity","1");
			}
			if(this.actual == 1){
				$(".pagina_anterior").css("opacity",".2");
			} else {
				$(".pagina_anterior").css("opacity","1");
			}

			cokk.setCookie("onanai_pagina", this.actual, 1);

			str = "";
			for(i=1;i<=this.ultima;i++){
				if(i == this.actual){
					str = str + "<img src='/album/public/img/iconos/bullet-green.png' style='width:32px; opacity:.3;' />";
				} else {
					str = str + "<img onclick='pages.ira("+i+", false)' src='/album/public/img/iconos/bullet-green.png' style='width:32px;' />";
				}
			}
			$(".barra_paginas").html(str);
		},
		// ir a tal página
		ira: function(pag, facil){
			if(this.trabajando == false){
				this.trabajando = true;
				if(pag > this.actual){
					cuantos = pag - this.actual;
					this.actual = this.actual + cuantos;
					mover = this.ancho * cuantos;
					if(facil){
						$("#capas").css("margin-left", (this.getMarginLeft() - mover));
						easyFin();
					} else {
						$("#capas").animate({"margin-left": "-="+mover+"px"}, {queue:true, duration:1000, easing:"expoEaseIn", complete:easyFin});
					}
				} else {
					cuantos = this.actual - pag;
					this.actual = this.actual - cuantos;
					mover = this.ancho * cuantos;
					if(facil){
						$("#capas").css("margin-left", (this.getMarginLeft() + mover));
						easyFin();
					} else {
						$("#capas").animate({"margin-left": "+="+mover+"px"}, {queue:true, duration:1000, easing:"expoEaseIn", complete:easyFin});
					}
				}
			}
		}
	}


$(document).ready(function(){
	bloques = $(".bloques");
	pages.ultima = bloques.length;
	//recuperamos ancho
		obj = $(".bloques");
		obj2 = obj[0];
		wid = $(obj2).css("width");
		wid = wid.split("px");
		wid = wid[0];
		pages.ancho = wid*1;
	
	pagina = cokk.getCookie("onanai_pagina");
	pages.ira(pagina, true);
});
