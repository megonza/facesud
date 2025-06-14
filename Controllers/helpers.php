<?php
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

?>