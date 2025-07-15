<?php 
class Post {
    //Crear posts
    public static function createPost($user_id, $text, $conn, $image_path = null) {
        try {
            if (trim($text) === '') {
                return [
                    "success" => false,
                    "message" => "El contenido del post no puede estar vacío"
                ];
            }

            $stmt = $conn->prepare("INSERT INTO posts (user_id, text, image_path) VALUES (?, ?, ?)");
            $stmt->execute([$user_id, $text, $image_path]);

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
    //obtener un post de un usuario
    public static function get_post($post_id, $conn, $user_id){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.name AS Author_name, 
                                    COUNT(DISTINCT pl.like_id) AS likes_count,
                                    COUNT(DISTINCT c.comments_id) AS comments_count ,
                                    EXISTS (
                                            SELECT 1 FROM post_likes 
                                            WHERE post_id = p.post_id AND user_id = ?
                                            ) AS has_liked
                                    FROM posts p 
                                    JOIN users u ON p.user_id = u.user_id 
                                    LEFT JOIN post_likes pl ON p.post_id = pl.post_id
                                    LEFT JOIN comments c ON p.post_id = c.post_id
                                    WHERE p.post_id = ?
                                    GROUP BY p.post_id");
                                    
            $stmt->execute([$user_id, $post_id]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);

            if($post){
                return[
                    "success" => true,
                    "data" => $post
                ];
            }else {
            return [
                "success" => false,
                "message" => "Post no encontrado"
            ];
        }
        }catch(PDOException $e){
            return [
            "success" => false,
            "message" => "Error al obtener el post: " . $e->getMessage()
        ];
        }
    }
    //obtener todos los post de un usuario
    public static function getUserPost($user_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.user_id, u.name AS Author_name,
                                    COUNT(DISTINCT pl.like_id) AS likes_count,
                                    COUNT(DISTINCT c.comments_id) AS comments_count,
                                    EXISTS (
                                        SELECT 1 FROM post_likes 
                                        WHERE post_id = p.post_id AND user_id = ?
                                        ) AS has_liked
                                    FROM posts p
                                    JOIN users u ON p.user_id=u.user_id
                                    LEFT JOIN post_likes pl ON p.post_id = pl.post_id
                                    LEFT JOIN comments c ON p.post_id = c.post_id
                                    WHERE p.user_id = ?
                                    GROUP BY p.post_id
                                    ORDER BY p.date_posted DESC");
            $stmt->execute([$user_id, $user_id]);
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return [
            "success" => true,
            "data" => $posts
        ];
        }catch(PDOException $e){
            return [
                "success" => false,
                "message" => "Error al obtener los posts del usuario: " . $e->getMessage()
            ];
        }
    }
    //mostrar todos los posts de todos los usuarios
    public static function getAllPost($conn, $user_id){
        try{
            $stmt = $conn->prepare("SELECT p.post_id, p.text, p.date_posted, u.user_id, u.name AS Author_name,
                                    COUNT(DISTINCT pl.like_id) AS likes_count,
                                    COUNT(DISTINCT c.comments_id) AS comments_count,
                                    EXISTS (
                                            SELECT 1 FROM post_likes 
                                            WHERE post_id = p.post_id AND user_id = ?
                                            ) AS has_liked
                                    FROM posts p
                                    JOIN users u ON p.user_id = u.user_id
                                    LEFT JOIN post_likes pl ON p.post_id = pl.post_id
                                    LEFT JOIN comments c ON p.post_id = c.post_id
                                    GROUP BY p.post_id
                                    ORDER BY p.date_posted DESC");

            $stmt->execute([$user_id]);
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return [
            "success" => true,
            "data" => $posts
        ];
        }catch(PDOException $e){
            return [
            "success" => false,
            "message" => "Error al obtener los posts: " . $e->getMessage()
            ];
        }
    }
    //editar los posteos
    public static function editPost($post_id,$user_id, $text, $image_path, $conn){
        try{
            //Se verifica que el usuario sea autor del post
            $stmt = $conn->prepare("SELECT * FROM posts WHERE post_id = ? AND user_id=?");
            $stmt->execute([$post_id, $user_id]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);

            if(!$post){
                return ["success" => false, "message" => "No tenés permiso para editar este post"];
            }

            //Editar post
            $query = "UPDATE posts SET text =?, image_path = ? WHERE post_id=?";
            $stmt = $conn->prepare($query);
            $stmt->execute([$text, $image_path, $post_id]);
            return ["success" => true, "message" => "Post editado correctamente"];
        }catch(PDOException $e){
            return ["success" => false, "message" => "Error al editar el post: " . $e->getMessage()];
        }
    }
    //elkiminar los posteos
    public static function deletePost($post_id, $user_id, $conn){
        try{
            $stmt = $conn->prepare("SELECT post_id, user_id FROM posts WHERE post_id =? AND user_id=?");
            $stmt->execute([$post_id, $user_id]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if(!$post){
                return ["success" => false, "message" => "No tenés permiso para eliminar este post"];
            }

            //por si el post tiene imagen
            if(!empty($post['image_path'])){
                $imageFullPath = __DIR__ . '/../' . $post['image_path'];
                if(file_exists($imageFullPath)){
                    unlink($imageFullPath);
                }
            }
            //eliminar post
            $stmt = $conn->prepare("DELETE FROM posts WHERE post_id = ?");
            $stmt->execute([$post_id]);
            return ["success" => true, "message" => "Post eliminado exitosamente"];
        }catch(PDOException $e){
            return ["success" => false, "message" => "Error al eliminar el post: " . $e->getMessage()];
        }
    }
}
?>
