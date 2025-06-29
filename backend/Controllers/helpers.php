<?php
$secretKey = "contraseña"; 
$expirationTime = time() + 3600; // 1 hora

    //Funcion que verifica si los input estan completos
    // $campos es un array con los valores de los input 
    function required_fields($data, $campos){
        foreach ($campos as $campo){
            if(empty($data[$campo])){
                return false;
            }
        }
        return true;

    }

    //Validar password
    function validate_password($password, $confirmPassword){
            return $password == $confirmPassword;
    }

    function safe_password($password){
        if(strlen($password) < 8) return "La contraseña debetener al menos 8 caracteres";
        if(!preg_match('/[a-z]/', $password)) return "Debe tener al menos una minuscula";
        if(!preg_match('/[A-Z]/', $password)) return "Debe tener al menos una mayuscula";
        if(!preg_match('/[0-9]/', $password)) return "Debe tener al menos un numero";
        if(!preg_match('/[\W]/', $password)) return "Debe tener al menos un caracter especial";

        return true;
    }

    //Para obtener los headers
    //REutilizable para otros metodos (create_post, edit_profile)
    function getTokensHeader() {
        $headers = [];

        // Si existe apache_request_headers (Apache)
        if (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            foreach ($requestHeaders as $key => $value) {
                $headers[strtolower($key)] = $value;
            }

            if (isset($headers['authorization'])) {
                return trim(str_replace('Bearer', '', $headers['authorization']));
            }
        }

        // Si viene por $_SERVER
        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            return trim(str_replace('Bearer', '', $_SERVER['HTTP_AUTHORIZATION']));
        }

        return null;
    }
?>