# SetPadel Backend

## Descripción:
Creación del Backend de la app SetPadel, la cual se basa en una app donde podras registrarte y loguearte.
Una vez hecho ello puedes consultar los partidos que hay creados por ti y por otros usuarios ademas de poder filtrar los partidos que no estan completos.
Tambien existe una pagina donde poder crear los partidos y otra donde poder accedera varias opciones:
Actualizar el perfil del usuario, Consultar los partidos que has creado y cerrar sesion.


[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/mongoDB.png)](https://nodesource.com/products/nsolid)
[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkucnJUfKnyTgCTQ-XEp_CbYIDzXJ_1b4BafS7alYn8v8duI9DMcv3zQvb_WF11dX-95M&usqp=CAU)](https://nodesource.com/products/nsolid)
[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/node-JS.png)](https://nodesource.com/products/nsolid)

### Requisitos mínimos:

- Crear un modelo de usuario que almacene información como nombre, correo electrónico y contraseña (hashed).
- Crear un modelo de evento con información como título, fecha, ubicación y descripción y un array de
asistentes que serán Ids de usuarios.
- Implementar un Middleware que verifica la presencia y validez del token en las rutas protegidas.
- Proteger las rutas que permiten acciones exclusivas para usuarios autenticados.
- Subida de ficheros (por ejemplo: avatares o carteles de eventos).
- Crear controladores que ordenen la información bajo algún criterio.
- Crear controladores que inserten un elemento de una colección en otra.


# Clonación del Proyecto:
```sh
https://github.com/DanielSalvatierraSanchez/SetPadel-Backend.git
```

### Middlewares:
>``` uploadFolders ```
(Permite la subida de imagenes de varios formatos ("jpg", "png", "jpeg", "gif", "webp", "avif") en carpetas sepadaras de Cloudinary y las transforma en formato "webp" y con una calidad optimizada.)

>``` isAuth ```
(Verifica si el usuario tiene creado el Token para darle acceso a la app.)

>``` isAdmin ```
(Verifica si el usuario tiene el "role" de "admin" para darle permisos de administrador.)


### Dependencias del proyecto:
```
npm i -D nodemon
npm i express mongoose dotenv jsonwebtoken bcrypt cloudinary multer multer-storage-cloudinary cors
```

### Scripts del proyecto:
```
npm run start ("node index.js")
npm run dev ("nodemon index.js")
```

# Endpoints de los Users

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER USER | POST | /api/v1/setpadel/users/register | { **name**, **email**, **password**, **phone**, image } | uploadFolders |
| LOGIN USER | POST | /api/v1/setpadel/users/login | { **email**, **password** } |
| ALL USERS | GET | /api/v1/setpadel/users/ | --- | isAuth |
| USERS BY NAME | GET | /api/v1/setpadel/users/getByName/:name | { **name** } | isAuth |
| USER BY PHONE | GET | /api/v1/setpadel/users/getByPhone/:phone | { **phone** } | isAuth |
| UPDATE USER | PUT | /api/v1/setpadel/users/update/:id | { name, password, phone, image } | isAuth, uploadFolders |
| DELETE USER | DELETE | /api/v1/setpadel/users/delete/:id | --- | isAuth |


## Resumen de los Endpoints de los Users

##### POST /api/v1/setpadel/users/register
- Para la creación de un User se crea un Schema, en el que requerimos 4 campos obligatorios, "name", "email", "password" y "phone", también tendremos otro extra que será "image".
```
    {      
        name: { type: String, required: true, trim: true, minLength: 2, maxLength: 20 },
        email: { type: String, required: true, trim: true, match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/] },
        password: { type: String, required: true, trim: true, minLength: 8, maxLength: 16 },
        phone: { type: String, required: true, trim: true, match: [/^[0-9]{9}$/] },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        image: { type: String },
        padelMatches: [{ type: mongoose.Types.ObjectId, ref: "padelMatches" }]
    }
```
##### POST /api/v1/setpadel/users/login
- Para acceder a la app el User deberá hacer login mediante 2 campos obligatorios, "email" y "password".

##### GET /api/v1/setpadel/users/
-  Para obtener un listado de todos los Users.

##### GET /api/v1/setpadel/users/getByName/:name
-  Para obtener un listado de Users por nombre será necesario introducir algún caracter.

##### GET /api/v1/setpadel/users/getByPhone/:phone
-  Para obtener un Users mediante su teléfono.

##### PUT /api/v1/setpadel/users/update/:id
-  Para la actualización de un User mediante su ID.

##### DELETE /api/v1/setpadel/users/delete/:id
-  Para eliminar al User por completo mediante su ID.


## Endpoints de los Padel Matches

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER PADEL MATCH | POST | /api/v1/setpadel/matches/register | { **title**, **location**, **date**, **place**, image } | isAuth, uploadFolders |
| ALL PADEL MATCHES | GET | /api/v1/setpadel/matches/ | --- | isAuth |
| PADEL MATCHES UNCOMPLETED | GET | /api/v1/setpadel/matches/getUncompleted/ | --- | isAuth |
| PADEL MATCHES BY DAY | GET | /api/v1/setpadel/matches/getByDate/:name | { **date** } | isAuth |
| PADEL MATCHES BY AUTHOR | GET | /api/v1/setpadel/matches/getByAuthor/:author | { **author** } | isAuth |
| JOIN USER TO PADEL MATCH | PUT | /api/v1/setpadel/matches/join/:id | --- | isAuth |
| DELETE USER OF PADEL MATCH | PUT | /api/v1/setpadel/matches/deleteUserOfPadelMatch/:id | --- | isAuth |
| DELETE PADEL MATCH | DELETE | /api/v1/setpadel/matches/delete/:id | --- | isAuth |


## Resumen de los Endpoints de los Padel Matches

##### POST /api/v1/setpadel/matches/register
- Para la creación de un Padel Match se crea un Schema, en el que requerimos 4 campos obligatorios, "title", "location", "date" y "place", también tendremos otro extra que será "image".
```
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true, trim: true },
        place: { type: String, required: false, enum: ["Indoor", "Outdoor"] },
        image: { type: String, default: "../../assets/pista.jpg" },
        author: { type: mongoose.Types.ObjectId, ref: "users" },
        players: [{ userId: { type: mongoose.Types.ObjectId, ref: "users" }, userName: { type: String, required: true } }], // participantes max: 4
        isCompleted: { type: Boolean, default: false }
    }
```

##### GET /api/v1/setpadel/matches/
-  Para obtener un listado de todos los Padel Matches.

##### GET /api/v1/setpadel/matches/getUncompleted
-  Para obtener un listado de los Padel Matches que no se hayan completado con 4 Users.

##### GET /api/v1/setpadel/matches/getByDay/:date
-  Para obtener un listado de los Padel Matches por "date" será necesario introducir algún caracter.

##### GET /api/v1/setpadel/matches/getByAuthor/:author
-  Para obtener un listado de los Padel Matches por "author" será necesario introducir algún caracter.

##### PUT /api/v1/setpadel/matches/join/:id
-  Para añadir a un User al Padel Match mediante su ID.

##### PUT /api/v1/setpadel/matches/update/:id
-  Para la actualización de un Padel Match mediante su ID.

##### PUT /api/v1/setpadel/matches/deleteUserOfPadelMatch/:id
-  Para eliminar a un User del Padel Match mediante su ID.

##### DELETE /api/v1/setpadel/matches/delete/:id
-  Para eliminar un Padel Match por completo mediante su ID.
