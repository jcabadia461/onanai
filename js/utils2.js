	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '&#x3c;Año Anterio',
		nextText: 'Siguiente Año&#x3e;',
		currentText: 'Courant',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
		dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};


$(document).ready(function(){
	$("#subir_todo").change(function(){
		subirTodas();
	});
	$("#eliminar_todo").change(function(){
		eliminarTodas();
	});
	$("#etiquetar_todo").change(function(){
		etiquetarTodas();
	});
	$("#derecha_todo").change(function(){
		derechaTodas();
	});
	$("#izquierda_todo").change(function(){
		izquierdaTodas();
	});

	$("#etiquetar_todo").change(function(){
			etiquetarTodas();
	});

	$("#fecha_all").change(function(){
			fechaTodas();
	});
	
	$("#form_listado #procesar").click(function(){
		validarFormulario();
		return false;
	});

	$("#form_subidas #procesar").click(function(){
		alert('procesar');
		return true;
	});

	$.datepicker.setDefaults($.datepicker.regional['fr']);
	    // $("#foto_fecha_tree__29").datepicker();
    $(".fecha_imagen").datepicker();
    $("#fecha_all").datepicker();

});


function subirTodas(){
   flag = $("#subir_todo").is(":checked");
   $("input").each(function(a,b){
      id = b.id;
      if(id.substr(0,3) == "one"){
         $(b).attr("checked", flag);
      }
   });
}

function eliminarTodas(){
   flag = $("#eliminar_todo").is(":checked");
   $("input").each(function(a,b){
      id = b.id;
      if(id.substr(0,3) == "two"){
         $(b).attr("checked", flag);
      }
   });
}

function derechaTodas(){
   flag = $("#derecha_todo").is(":checked");
   $("input").each(function(a,b){
      id = b.id;
      if(id.substr(0,3) == "one"){
         $(b).attr("checked", flag);
      }
   });
}

function izquierdaTodas(){
   flag = $("#izquierda_todo").is(":checked");
   $("input").each(function(a,b){
      id = b.id;
      if(id.substr(0,4) == "tree"){
         $(b).attr("checked", flag);
      }
   });
}

function etiquetarTodas(){
   flag = $("#etiquetar_todo").is(":checked");
   $("input").each(function(a,b){
      id = b.id;
      if(id.substr(0,4) == "tree"){
         $(b).attr("checked", flag);
      }
   });
}

function fechaTodas(){
   fecha = $("#fecha_all").val();
   if(fecha){
	   flag = true;
   } else {
	   flag = false;
   }
   $("input").each(function(a,b){
      id = b.id;
	  idNum = id.split('_');
      if(id.substr(0,4) == "five"){
         $(b).attr("checked", flag);
         $("#foto_fecha_"+idNum[2]).val(fecha);
      }
   });
}

function etiquetarTodas(){
   eti = $("#etiquetar_todo").val();
   if(eti){
	   flag = true;
   } else {
	   flag = false;
   }
   $("input").each(function(a,b){
      id = b.id;
	  idNum = id.split('_');
      if(id.substr(0,3) == "six"){
         $(b).attr("checked", flag);
      }
   });
}


function validarFormulario(){
	elim = 0;

	$("input").each(function(a,b){
		id = b.id;
	 	if(id.substr(0,3) == "two"){
			if($(b).is(":checked")){
				elim++;
			}
		}
	});

	if(elim > 0){
		if(confirm("Estas a punto de eliminar "+ elim +" imagenes, estas seguro?")){
			$("form").submit();
		}
	}
}
