var tabla;

//funcion que se ejecuta al inicio
function init() {

	listar();
	//cargamos los items al select cliente
	$.post("../ajax/venta.php?op=selectCliente", function (r) {
		$("#idcliente").html(r);
		$('#idcliente').selectpicker('refresh');
	});

}

//funcion listar
function listar() {

	var fecha_inicio = $("#fecha_inicio").val();
	var fecha_fin = $("#fecha_fin").val();
	getTotal(fecha_inicio,fecha_fin)
	tabla = $('#tbllistado').dataTable({
		"aProcessing": true,//activamos el procedimiento del datatable
		"aServerSide": true,//paginacion y filrado realizados por el server
		dom: 'Bfrtip',//definimos los elementos del control de la tabla
		buttons: [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdf'
		],
		"ajax":
		{
			url: '../ajax/consultas.php?op=ventasfechacliente',
			data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin },
			type: "get",
			dataType: "json",
			error: function (e) {
				console.log(e.responseText);
			}
		},
		"bDestroy": true,
		"iDisplayLength": 20,//paginacion
		"order": [[0, "desc"]]//ordenar (columna, orden)
	}).DataTable();

	
}

function getTotal(fecha_inicio,fecha_fin) {
	$.ajax({
		url: '../ajax/consultas.php?op=ventasfechacliente2',
		type: 'GET',
		data: { fecha_inicio: fecha_inicio, fecha_fin: fecha_fin },
		success: function (resp) {
			console.log(resp);
			let inputValor = document.querySelector('#valorTotal');
			inputValor.value = `${resp}`;
		}
	});

}


init();  