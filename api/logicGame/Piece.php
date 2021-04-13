<?php

spl_autoload_register();

class Piece
{
	private $game;
	private $square;
	private $char = "♙";

	public function __construct($game, $square)
	{
		$this->game = $game;
		$this->square = $square;
	}

	public function __get($name)
	{
		if(in_array($name, ["char"]))
		{
			return $this->$name;
		}
		die("Error server: Переменную $name нельзя достать из экземпляра фигуры.");
	}
}
