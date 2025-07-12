<?php

class Comments{
    //Añadir nuevos comentarios
    public static function addComments($user_id, $post_id, $comment, $conn){
        try{
            $stmt = $conn->prepare("INSERT INTO comments (user_id, post_id, text_comment) VALUES (?, ?, ?)");
            $stmt->execute([$user_id, $post_id, $comment]);

            return [
                "success" => true,
                "message" => "Comentarios agregado exitosamente",
                "comments_id" => $conn->lastInsertId()
            ];
        }catch(PDOException $e){
            return["success" =>true, "message" => "Error al agregar comentario: " . $e->getMessage()];
        }

    }
    //Mostrar comentario de un post
    public static function getComments($post_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT c.comments_id, c.text_comment, c.date_commented, u.user_id AS user_name FROM comments c
                                    JOIN users u ON c.user_id = u.user_id
                                    WHERE post_id = ?
                                    ORDER BY c.date_commented ASC");
            $stmt->execute([$post_id]);
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return [
            "success" => true,
            "comments" => $comments
            ];
        }catch(PDOException $e){
            return [
            "success" => false,
            "message" => "Error al obtener los comentarios: " . $e->getMessage()
            ];
        }
    }

    public static function editComment($comments_id, $user_id, $new_text_comment, $conn){
        try{
            // Verificar que el comentario le pertenezca al usuario
            $stmt = $conn->prepare("SELECT * FROM comments WHERE comments_id = ? AND user_id = ?");
            $stmt->execute([$comments_id, $user_id]);
            if ($stmt->rowCount() === 0){
                return["success" =>false, "message" => "No tenes permiso de editar este comentario"];
            }

            $stmt = $conn->prepare("UPDATE comments set text_comment = ? WHERE comments_id = ?");
            $stmt->execute([$new_text_comment, $comments_id]);
            return ["success" => true, "message" => "Comentario editado."];
        }catch(PDOException $e){
            return["success" => false, "message" => "No se pudo editar el comentario: " . $e->getMessage()];
        }
    }
}