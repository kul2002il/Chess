<?php

spl_autoload_register();

$allBoards = [];

class Board{
	private $setPiece = [];
	private $multiverse;
	private $position = [
		"m" => 0,
		"t" => 0,
		"step"
	];

	public function __construct($game)
	{
		$this->game = $game;
		$this->game->pushBoard($this);
	}

	public function coordToStr()
	{
		return $this->position["m"] ."m". $this->position["t"] . "t";
	}

	public function toArray()
	{
		return $this->setPiece;
	}

	public static function init($game)
	{
		$out = new Board($game);
		$out->setPiece = [
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
		];
	}
}
