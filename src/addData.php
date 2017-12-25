<?php
require_once ('config.php');

$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);
$insert_sql = "INSERT INTO messages (name, email, message) VALUES(".$pdo->quote( $name ).", ".$pdo->quote( $email ).", ".$pdo->quote( $message ).")";
if($pdo->query("$insert_sql")){
    $arr = ["status"=>"ok", "message"=>"Your message was successfully sent!"];
} else{
    $arr = ["status"=>"error", "message"=>"Error! Your message has not been sent!"];
}
echo json_encode($arr);