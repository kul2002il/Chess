<?php

spl_autoload_register();

$allBoards = [];

class Board{
	private $setPiece = [];
	private $game;
	private $position = [
		"m" => 0,
		"t" => 0,
	];

	public function __construct($game)
	{
		$this->game = $game;
		$game->pushBoard($this);
	}

	public function cont()
	{
		return clone $this;
	}

	public function __get($name)
	{
		if (in_array($name, ["position",]))
		{
			return $this->$name;
		}

		die("Запрещено доставать значение $name.");
	}
}
