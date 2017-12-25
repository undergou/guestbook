<?php
$pdo = new PDO("mysql:host=localhost;dbname=new_db", "root", "");
$sql = "SELECT * FROM messages";
$result = $pdo->query("$sql")->fetchAll(PDO::FETCH_NAMED);
//$ip = $_SERVER['REMOTE_ADDR'];
//$result->ip = $ip;
$obj = json_encode($result);
echo $obj;
?>