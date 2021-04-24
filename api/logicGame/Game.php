<?php

require_once "Board.php";

class Game{
	private $multiverse = [];

	public function __construct()
	{
		Board::init($this);
	}

	public function pushBoard(Board $board)
	{
		$this->multiverse[$board->coordToStr()] = $board;
	}

	public function toArray()
	{
		$out = [];
		foreach ($this->multiverse as $key => $board)
		{
			$out[$key] = $board->toArray();
		}
		return $out;
	}

	public function step($strStep)
	{
	}
}
