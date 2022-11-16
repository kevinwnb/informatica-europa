<?php

$json = json_decode(file_get_contents('php://input'));

function CallAPI($method, $url, $data = [])
{
    $curl = curl_init();

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, 1);

            if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, 1);
            break;
        default:
            if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
    }

    // Optional Authentication:
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    $result = curl_exec($curl);

    curl_close($curl);

    return $result;
}

echo json_encode(CallAPI("POST", "https://www.google.com/recaptcha/api/siteverify", ["secret" => "6LcX-AwjAAAAABxXB_0d3xi053dohFHxGAL2CvJ0", "response" => $json->token]));
