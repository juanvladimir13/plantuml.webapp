<?php
require '../vendor/autoload.php';
use function Jawira\PlantUml\encodep;

function encodePlantUML($plant)
{
  $encode = encodep($plant);
  return "http://localhost:8080/plantuml/svg/{$encode}";
}

echo encodePlantUML($_POST['m'] ?? '');