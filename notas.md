1 Validar datos del formulario
    Numero de miembro: SOLO Numero y solo 11 digitos
    Contraseñas seguras
    nombre usuario no repetido
    
2.Encapsular algunas funciones en otro archivo

3. pedir en el register fecha de nacimiento para mandar alertas de cumpleaños
-------------------------------------------------------------------------
get_post:

    Objetivo: Obtener una sola publicación específica usando su post_id.

    Ejemplo de uso:

    Cuando un usuario entra a ver los detalles de un solo post.

    Para cargar comentarios de ese post.

getAllPosts:

    Objetivo: Obtener todas las publicaciones del sistema.

    Ejemplo de uso:

    Página principal o timeline general.

    Explorar publicaciones públicas.

getUserPosts:

    Objetivo: Obtener todos los posts de un usuario en particular (por ejemplo, su perfil).

    Ejemplo de uso:

    Cuando un usuario entra al perfil de otro.

    Mostrar publicaciones propias.

---
Método: POST

-Ruta: /FaceSud/Controllers/userController.php

-Endpoints (action) y descripción:


|action  |Descripción|
|------------|------------------|
|register|   un nuevo usuario|
|login| Inicia sesión, devuelve un JWT|
|profile| Obtiene perfil del usuario desde el JWT|

***

postController.php

Método: POST

Ruta: /FaceSud/Controllers/postController.php

Endpoints (action) y descripción:

|action  |Descripción|
|------------|------------------|
|create_post|   Crear una publicación (solo texto)	|
|create_post_with_image| Crear una publicación con imagen (multipart/form-data)|
|get_post| Obtener un post por su ID|
|getUserPosts|Obtener todos los posts de un usuario específico|
|getAllPosts|Obtener todos los posts del sistema, con datos de autor, likes, etc
