(function($){

	var
		lista_produtos 		= $('#lista_produtos').find('tbody'),
		btnAdd 				= $('#btnAdd'),
		txtId 				= $('#txtId'),
		txtTitle			= $('#txtTitle'),
		txtCategory			= $('#txtCategory'),
		txtTGoogleID		= $('#txtTGoogleID'),
		form_produtos		= $('#form_produtos'),
		tds
	;

	form_produtos.on('submit', function(event){
		event.preventDefault();
		if(txtId.val() > 0){
			atualizar_produto();
		} else {
			incluir_produto();	
		}
	});

	lista_produtos.on('click', '.link_editar', function(event){
		event.preventDefault();
		var link = $(event.currentTarget);
		var tr = $(link.closest('tr'));
		tds = tr.children();
		txtTitle.val($(tds[1]).text());
		txtId.val($(tds[0]).text());
		txtCategory.val($(tds[2]).text());
		txtTGoogleID.val($(tds[3]).text());
		txtTitle.focus();
	});

	lista_produtos.on('click', '.link_excluir', function(event){
		
		var confirm = window.confirm('Tem certeza que deseja excluir o produto selecionado?');

		if(confirm){
			event.preventDefault();
			var link = $(event.currentTarget);
			var tr = $(link.closest('tr'));
			tds = tr.children();
			var id = $(tds[0]).text();
			
			$.ajax({
				url: '/service/produtos/'+id,
				type: 'delete',
				success: function(item){
					tr.fadeOut('slow', function(){
						tr.remove();
						resetar();	
					});
				}
			});	
		}
	});

	var incluir_produto = function(){
		$.ajax({
			url: '/service/produtos',
			type: 'post',
			dataType: 'json',
			data: form_produtos.serialize(),
			success: function(item){
				var html = adicionar_produto_tabela(item);
				lista_produtos.prepend(html);
				resetar();
			}
		});
	};

	var atualizar_produto = function(){
		$.ajax({
			url: '/service/produtos',
			type: 'put',
			data: form_produtos.serialize(),
			dataType: 'json',
			success: function(data){
				if(data){
					$(tds[0]).text(data.id);
					$(tds[1]).text(data.title);
					$(tds[2]).text(data.category);
					$(tds[3]).text(data.google_id);
				}
				resetar();
			}
		});
	};

	var adicionar_produto_tabela = function(item){
		var html = '<tr>';	
			html += '<td>'+item.id+'</td>';
			html += '<td>'+item.title+'</td>';
			html += '<td>'+item.category+'</td>';
			html += '<td>'+item.google_id+'</td>';
			html += '<td>[ <a href="#" class="link_editar">editar</a> | <a href="#" class="link_excluir">excluir</a> ]</td>';
			html += '</tr>';

		return html;
	};

	var resetar = function(){
		txtId.val(0);
		txtTitle.val('');
		txtCategory.val('');
		txtTGoogleID.val('');
		txtTitle.focus();
	};

	var init = function(){
		$.getJSON('/service/produtos', function(data){
			var html = '';
			$(data).each(function(index, item){
				html += adicionar_produto_tabela(item);
			});
			lista_produtos.html( html );
		});
	};

	init();

})(jQuery);