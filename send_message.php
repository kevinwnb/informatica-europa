<?php

$json = json_decode(file_get_contents('php://input'));

// The message
$message = $json->msg;

// In case any of our lines are larger than 70 characters, we should use wordwrap()
$message = wordwrap($message, 70, "\r\n");

// Send
mail('info@kevinwnb.com', 'Mensaje', $json->name . " | " . $json->phone . " | " . $json->msg);
