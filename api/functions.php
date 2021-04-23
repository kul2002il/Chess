<?php

function splitStep($step)
{
	$matches = [];
	preg_match("#(\d)+m(\d)+t(w|b)([a-z])(\d)+-(\d)+m(\d)+t(w|b)([a-z])(\d)+#", $step, $matches);
	return
	[
		"in" =>
		[
			"mult" => $matches[1],
			"time" => $matches[2],
			"color"=> $matches[3],
			"vert" => $matches[4],
			"horz" => $matches[5],
		],
		"out" =>
		[
			"mult" => $matches[6],
			"time" => $matches[7],
			"color"=> $matches[8],
			"vert" => $matches[9],
			"horz" => $matches[10],
		],
	];
}

function errorCheckGlobalStep($multiverse, $step)
{
	if($step["in"]["color"] !== $step["out"]["color"])
	{
		return "Ход возможно совершить только на доску своего цвета.";
	}

	$boardIn = "{$step["in"]["mult"]}m{$step["in"]["time"]}t{$step["in"]["color"]}";
	if (!array_key_exists($boardIn, $multiverse))
	{
		return "Ход возможно совершить только с существующей доски.";
	}

	if($step["in"]["color"] === "w")
	{
		$boardInNext = "{$step["in"]["mult"]}m{$step["in"]["time"]}tb";
	}
	else
	{
		$nextTime = $step["in"]["time"] + 1;
		$boardInNext = "{$step["in"]["mult"]}m{$nextTime}tw";
	}
	if (array_key_exists($boardInNext, $multiverse))
	{
		return "Ход возможно совершить только с конечной доски.";
	}
}
