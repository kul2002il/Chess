<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$outData =
[
	"message" => "Hello",
];


echo json_encode($outData);
