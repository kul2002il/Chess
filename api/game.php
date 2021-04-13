<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


require_once "logicGame/Board.php";
require_once "logicGame/Game.php";


new Game();

$outData =
[
	"message" => "Create game",
	"multiverse" =>
	[
		"0-1" =>
		[
			"a1" => "♖",
			"b1" => "♘",
			"c1" => "♗",
			"d1" => "♕",
			"e1" => "♔",

			"a2" => "♙",

			"a8" => "♜",
			"b8" => "♞",
			"c8" => "♝",
			"d8" => "♛",
			"e8" => "♚",

			"a7" => "♟",
		],
		"0-2" =>
		[
			"a1" => "♖",
			"b1" => "♘",
			"c1" => "♗",
			"d1" => "♕",
			"e1" => "♔",

			"a4" => "♙",

			"a8" => "♜",
			"b8" => "♞",
			"c8" => "♝",
			"d8" => "♛",
			"e8" => "♚",

			"a7" => "♟",
		],
	]
];

echo json_encode($outData);
