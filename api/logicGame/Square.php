<?php

spl_autoload_register();

class Square
{
	private int $m; // Мультивселенная
	private int $t; // Время
	private bool $stepWhile; // Пренадлежность хода
	private int $y; // Строка
	private int $x; // Столбец

	public static function parse(string $str)
	{
		$square = new Square();
		$matches = [];
		// Пример клетки: 0m1twe2
		preg_match("#(\d)+m(\d)+t(w|b)([a-z])(\d)+#", $str, $matches);
		$square->m = $matches[1], // [Мультивселенная]m
		$square->t = $matches[2], // [Время]t
		$square->stepWhile = $matches[3] === "w" ? true : false, // [w|b — ход]
		$square->y = "a" - $matches[4], // [[a-z] — Столбец]
		$square->x = $matches[5], // [Строка]
		return Square;
	}
}
