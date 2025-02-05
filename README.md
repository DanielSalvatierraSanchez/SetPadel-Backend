# Proyecto-10-Full-Stack-JavaScript-Backend

BACKEND
DONE	* Crea un modelo de usuario que almacene información como nombre, correo electrónico y contraseña (hashed).
DONE	* Crea un modelo de evento con información como título, fecha, ubicación y descripción y un array de 
		asistentes que serán Ids de usuarios.
DONE	* Implementa un Middleware que verifica la presencia y validez del token en las rutas protegidas. 
		Protege las rutas que permiten acciones exclusivas para usuarios autenticados.
DONE	* Subida de ficheros (por ejemplo: avatares o carteles de eventos)
DONE	* Controladores que ordenen la información bajo algún criterio
DONE 	* Controladores que inserten un elemento de una colección en otra

FUTURE =>
En CONTROLLER/PADELMATCHES7JOINUSER => Añadir userName al partido
Probar implementación de la paginación y probar las queries
Revisar en getPadelMatchByDay para filtrar por un dia en concreto con formato DATE
// const findPadelMatch = await PadelMatch.find({ date: new RegExp(date, "i") });

* NO ME GUSTA EL FILTRO POR AUTHOR * QUITAR - Filtrar por fecha es lo mas común y realmente lo más útil
* Revisar como gestionar duplicados al crear partido, aunque como solemos hacer un sólo user crea partidos para toda la semana
        // const padelMatchDuplicated = await PadelMatch.find({ $or: [{ day }, { month }, { hour }, { author }] });
        // padelMatchDuplicated ? res.status(400).json({ message: `Ya existe un partido el dia ${day} 
	// a las ${hour} creado por ${author}.` }) : padelMatchDuplicated;
