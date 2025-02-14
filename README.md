# Proyecto-10-Full-Stack-JavaScript-Backend

BACKEND
DONE _ Crea un modelo de usuario que almacene información como nombre, correo electrónico y contraseña (hashed).
DONE _ Crea un modelo de evento con información como título, fecha, ubicación y descripción y un array de
asistentes que serán Ids de usuarios.
DONE _ Implementa un Middleware que verifica la presencia y validez del token en las rutas protegidas.
Protege las rutas que permiten acciones exclusivas para usuarios autenticados.
DONE _ Subida de ficheros (por ejemplo: avatares o carteles de eventos)
DONE _ Controladores que ordenen la información bajo algún criterio
DONE _ Controladores que inserten un elemento de una colección en otra

FUTURE =>
Update user no actualiza la img
Probar implementación de la paginación y probar las queries
Revisar en getPadelMatchByDay para filtrar por un dia en concreto con formato DATE
// const findPadelMatch = await PadelMatch.find({ date: new RegExp(date, "i") });
- NO ME GUSTA EL FILTRO POR AUTHOR \* QUITAR - Filtrar por fecha es lo mas común y realmente lo más útil