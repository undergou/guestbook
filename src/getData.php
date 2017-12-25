<?php
require_once ('config.php');
$sql = "SELECT * FROM messages";
$result = $pdo->query("$sql")->fetchAll(PDO::FETCH_NAMED);
//$ip = $_SERVER['REMOTE_ADDR'];
//$result->ip = $ip;
$obj = json_encode($result);
echo $obj;
?>