<?php

set_include_path( implode(PATH_SEPARATOR, array( realpath(dirname(__FILE__) . '/library'), 	get_include_path() ) ) );

require_once 'Slim/Slim.php';
require_once 'controller/ProdutosController.php';

$app = new Slim();
$pcontroller = new ProdutosController();


$app->get('/produtos', function() use ($pcontroller){
	echo json_encode($pcontroller->listarProdutos());
});

$app->post('/produtos', function() use ($pcontroller, $app){
	$produto = $app->request()->post();
	echo json_encode($pcontroller->salvarProduto($produto));
});

$app->put('/produtos', function() use ($pcontroller, $app){
	$produto = $app->request()->put();
	echo json_encode($pcontroller->atualizarProduto($produto));
});

$app->delete('/produtos/:id', function($id) use ($pcontroller){
	echo $pcontroller->removerProduto($id);
});

$app->run();