<?php

require_once "Board.php";

class Game{
	private $allBoard = [];

	public function __construct()
	{
		new Board($this);
	}

	public function pushBoard($board)
	{
		array_push($this->allBoard, [
			$board->position["m"] ."_". $board->position["t"] => $board
		]);
	}
}

