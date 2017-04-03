subidas = {
	
	aa : 1,

	init : function(){
		this.aa = 0;
	},
	click : function(id){
		if ($('#'+id+' > a > .check').is(":visible") == true){
			$('#'+id+' > a > .check').hide();			
		} else {
			$('#'+id+' > a > .check').show();
		}
	},
	seleccionar: function() {
		$('img.check').each(function(a,b){
			if($(b).is(":visible") == true){
				$(b).hide();
			} else {
				$(b).show();
			}
		})
	},
	subir : function () {
		var arr = '';
		var ids = '';
		$('img.check').each(function(a,b){
			if($(b).is(":visible") == true){
				if(ids){
					ids = ids + ",";
				} 
				ids = ids + $(b).attr('id') + '.';
			}
		})
		if(ids != ''){
			$.ajax({ 
				url: '/album/public/admin/index/procesar2',
				type: "POST", 
				data: {ajax: "si", ids: ids}, 
				success: function(mmm){
					location.reload();
				},
				error: function(){
					$("#msg_subidas").html("problemas en la llamada ajax....");
				}
			})
		}
	}
}
