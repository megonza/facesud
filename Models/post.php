<?php 
class Post {
    public static function createPost($user_id, $text, $conn) {
        try {
            if (trim($text) === '') {
                return [
                    "success" => false,
                    "message" => "El contenido del post no puede estar vacío"
                ];
            }

            $stmt = $conn->prepare("INSERT INTO posts (user_id, text) VALUES (?, ?)");
            $stmt->execute([$user_id, $text]);

            return [
                "success" => true,
                "message" => "Post creado con éxito",
                "post_id" => $conn->lastInsertId()
            ];
        } catch (PDOException $e) {
            return [
                "success" => false,
                "message" => "Error al crear el post: " . $e->getMessage()
            ];
        }
    }

    public function get_post($post_id, $conn){

    }
}
?>
