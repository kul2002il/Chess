<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "functions.php";
/*
require_once "logicGame/Board.php";
require_once "logicGame/Game.php";

new Game();
*/

$hist = [
	"0m1twe2-0m1twe4",
	"0m1tbf7-0m1tbf6",
];

$multiverse = [
	"0m1tw" =>
	[
		"a1" => "♖",
		"b1" => "♘",
		"c1" => "♗",
		"d1" => "♕",
		"e1" => "♔",
		"f1" => "♗",
		"g1" => "♘",
		"h1" => "♖",

		"a2" => "♙",
		"b2" => "♙",
		"c2" => "♙",
		"d2" => "♙",
		"e2" => "♙",
		"f2" => "♙",
		"g2" => "♙",
		"h2" => "♙",

		"a7" => "♟",
		"b7" => "♟",
		"c7" => "♟",
		"d7" => "♟",
		"e7" => "♟",
		"f7" => "♟",
		"g7" => "♟",
		"h7" => "♟",

		"a8" => "♜",
		"b8" => "♞",
		"c8" => "♝",
		"d8" => "♛",
		"e8" => "♚",
		"f8" => "♝",
		"g8" => "♞",
		"h8" => "♜",
	]
];

function step($multiverse, string $stepStr)
{
	$step = splitStep($stepStr);

	$error = errorCheckGlobalStep($multiverse, $step);
	if($error)
	{
		return $error;
	}

	//$boardIn = "{$step["in"]["mult"]}m{$step["in"]["time"]}t{$step["in"]["color"]}";
	//$boardOut = "{$step["out"]["mult"]}m{$step["out"]["time"]}t{$step["out"]["color"]}";
	$checkEdentityBoard =
		$step["in"]["mult"] == $step["out"]["mult"] &&
		$step["in"]["time"] == $step["out"]["time"];
	if ($checkEdentityBoard)
	{
		return "Нереалезован переход внутри одной доски.";
	}
	else
	{
		return "Нереалезован переход с одной доски на другую.";
	}
}

$sizeHist = count($hist);
for ($i=0; $i < $sizeHist; $i++)
{
	$log = step($multiverse, $hist[$i]);
	if($log)
	{
		echo "Error (step {$hist[$i]}): $log\n";
	}
}

echo "\n====================================================\n\n";

$outData =
[
	"message" => "Create game",
	"multiverse" => $multiverse,
];

echo json_encode($outData);
