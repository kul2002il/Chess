<?php

require_once "Square.php";

class Move
{
	private Square $start;
	private Square $end;
	private $multiverse;

	public function __construct($multiverse)
	{
		$this->multiverse = $multiverse;
	}

	public static function parse($str)
	{
		$matches = [];
		$out = new Move();
		preg_match("#.+-.+#", $str, $matches);
		$out->start = $matches[1];
		$out->start = $matches[2];
		return $out;
	}
}
