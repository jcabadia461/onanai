$(document).ready(function(){
	$(".tree_arbol_mes").hide();
	$(".tree_arbol_anio").hide();
	
	fec2 = $("#fecha").val();
	grp2 = $("#grupo").val();

	if(!(fec2==null)){
		exp = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{2,4}$/;
		if(fec2.match(exp)){
			if(grp2 != ""){
				treeShowGrupo(fec2,grp2);
			} else {
				treeShow(fec2);
			}
		}
	}
	
});

treeShowHide = function(nombre){
		z = $("#"+nombre);
		if(z.is(":hidden")){
			z.show();
		} else {
			z.hide();
		}
		return false;
}

treeShow = function(fecha){
	fecha = fecha.split('-');
	$("#tree_arbol_anio_"+fecha[2]).show();
	$("#tree_arbol_anio_"+fecha[2]+"_mes_"+fecha[1]).show();
	$("#tree_arbol_anio_"+fecha[2]+"_mes_"+fecha[1]+"_dia_"+fecha[0]).addClass("tree_select");
}
treeShowGrupo = function(fecha, grupo){
	fecha = fecha.split('-');
	$("#tree_arbol_anio_"+fecha[2]).show();
	$("#tree_arbol_anio_"+fecha[2]+"_mes_"+fecha[1]).show();
	$("#tree_arbol_anio_"+fecha[2]+"_mes_"+fecha[1]+"_dia_"+fecha[0]+"_grupo_"+grupo).addClass("tree_select");
}