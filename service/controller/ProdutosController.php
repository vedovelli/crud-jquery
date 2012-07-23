<?php

require_once 'model/ProdutosModel.php';

class ProdutosController{

	public function listarProdutos(){

		$produtos = ProdutosModel::all();

		$retorno = array();

		foreach ($produtos as $key => $value) {
			$produto['id'] = $value->id;
			$produto['category'] = $value->category;
			$produto['title'] = $value->title;
			$produto['google_id'] = $value->google_id;
			$retorno[] = $produto;
		}

		return $retorno;

	}

	public function salvarProduto($produto){
		$produto = ProdutosModel::create($produto);
		return $produto->to_array();
	}

	public function atualizarProduto($produto){
		$model = ProdutosModel::find($produto['id']);
		$model->update_attributes($produto);
		return $model->to_array();
	}

	public function removerProduto($id){
		$model = ProdutosModel::find($id);
		return $model->delete();
	}

}