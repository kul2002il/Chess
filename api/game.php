<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


require_once "logicGame/Game.php";

$game = new Game();


$hist = [
	"0m1twe2-0m1twe4",
	"0m1tbf7-0m1tbf6",
];

$sizeHist = count($hist);
for ($i=0; $i < $sizeHist; $i++)
{
	$log = $game->step($hist[$i]);
	if($log)
	{
		echo "Error (step {$hist[$i]}): $log\n";
	}
}

echo "\n====================================================\n\n";

$outData =
[
	"message" => "Create game",
	"multiverse" => $game->toArray(),
];

echo json_encode($outData);
