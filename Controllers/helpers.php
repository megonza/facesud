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

?>