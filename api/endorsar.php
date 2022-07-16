<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = $data['nombre'];
    $email = !empty($data['email']) ? $data['email'] : "nada";
    $comentario = !empty($data['comentario']) ? $data['comentario'] : "nada";
    $tipo = $data['tipo'];

    $msg = 'Nombre: ' . $nombre . ', Email: ' . $email . ', Comentario: ' . $comentario . ', Endorsment Type: ' . $tipo . PHP_EOL;


        // the message
    //$msg = "First line of text\nSecond line of text";

    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);

    // send email
    mail("endorses@kevinwnb.com","Endorse",$msg);

    echo json_encode(["msg" => "Éxito"]);

    exit;
}
 ?>
