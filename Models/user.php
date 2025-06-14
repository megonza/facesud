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

                $check = $this ->conn ->prepare("SELECT user_id FROM users WHERE email = ?");
                $check->execute([$email]);
                //fetch devuelve una fila si es que existe
                if($check->fetch()){
                    return ['error' => 'Este email ya está registrado.'];
                }

                $stmt = $this->conn->prepare("INSERT INTO users (name, email, password, member_num)
                                                VALUES (?, ?, ?, ?)");
                $stmt->execute([$name,$email, password_hash($password, PASSWORD_DEFAULT), $member_num]);
                return ["success" => "¡Registro exitoso!"];
            }catch(PDOException $e){
                http_response_code(500);
                return ["error" => "Error al registrar: " . $e->getMessage()];
            }
    }
    //login
    public function login($email, $password){
        
        try{
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ['error' => 'Usuario no encontrado'];
            }

            if(password_verify($password,$user['password'])){
                return [
                    'success' => 'Inicio de sesión exitoso',
                    'user' => [
                        'user_id' => $user['user_id'],
                        'name' => $user['name'],
                        'email' => $user['email']
                    ]
                ];
            } else {
                return ['error' => 'Contraseña incorrecta'];
            }
    }catch (PDOException $e) {
        return ['error' => 'Error al iniciar sesión: ' . $e->getMessage()];
        }
    }

    public static function getUserByID($id, $conn){
        try{
            $stmt = $conn->prepare('SELECT * FROM users WHERE user_id = ?');
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user){
                unset($user['password']); //Para no devolver la contraseña
                return ['success' => true, 'data' => $user];
            } else {
                return ["success" => false, "message" => "Usuario no encontrado"];
            } 
        } catch (PDOException $e) {
        return ["success" => false, "message" => "Error en base de datos"];
        }
    }

}
?>