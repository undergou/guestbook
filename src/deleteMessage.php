<?php
$pdo = new PDO("mysql:host=localhost;dbname=new_db", "root", "");
$ip = $_SERVER['REMOTE_ADDR'];
$id = $_POST['id'];
if($ip='::1') {
    $delete_sql = "DELETE FROM messages WHERE id=".$pdo->quote( $id );
    if($pdo->query("$delete_sql")){
        $arr = ["status" => "ok", "message"=>"Message №".$id." was successfully deleted!"];
    } else{
        $arr = ["status" => "error", "message"=>"Message was not deleted!"];
    }
} else {
    $arr = ["status" => "error", "message"=>"You do not have permission to delete this message"];
}
echo json_encode($arr);