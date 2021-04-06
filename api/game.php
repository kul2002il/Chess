<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


require_once "logicGame/Board.php";
require_once "logicGame/Game.php";


new Game();

$outData =
[
	"message" => "Create game",
	"board" =>
	[
		["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
		["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", ""],
		["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
		["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
	]
];

echo json_encode($outData);
