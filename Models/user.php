<?php
class User{
    private $conn;

    public function __construct($dbConn){
        $this->conn = $dbConn;
    }

    public function register($name, $email, $password, $member_num){
        //Para insertar todos los datos a la db manejando los errores:
            try{

                //Verifico que el email no exista

                $check = $this ->conn ->prepare("SELECT user_id FROM user WHERE email = ?");
                $check->execute(['email']);
                //fetch devuelve una fila si es que existe
                if($check->fetch()){
                    return ['error' => 'Este email ya está registrado.'];
                }

                $stmt = $this->conn->prepare("INSERT INTO user (name, email, password, member_num)
                                                VALUES (?, ?, ?, ?)");
                $stmt->execute([$name,$email, password_hash($password, PASSWORD_DEFAULT), $member_num]);
                http_response_code(201);
                return ["success" => "¡Registro exitoso!"];
            }catch(PDOException $e){
                http_response_code(500);
                return ["error" => "Error al registrar: " . $e->getMessage()];
            }
    }
    //login
}

?>