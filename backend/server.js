// Importación de las librerías y módulos necesarios
import express from 'express'; // Importa Express, un marco de aplicación web para Node.js
import mysql from 'mysql'; // Importa MySQL, un sistema de gestión de bases de datos relacional
import cors from 'cors'; // Importa CORS, un paquete que proporciona un middleware Connect/Express para habilitar CORS con varias opciones
import bodyParser from 'body-parser'; // Importa body-parser, un middleware que analiza el cuerpo de las solicitudes entrantes en un middleware y expone el objeto `req.body`

const app = express(); // Inicializa la aplicación Express

app.use(cors()); // Usa CORS como middleware para habilitar solicitudes entre dominios diferentes

app.use(bodyParser.json());  // Usa body-parser para analizar el cuerpo de las solicitudes entrantes con formato JSON

// Configuración de la conexión a la base de datos MySQL Y ALWAYSDATA
const conexion = mysql.createConnection({
    host: 'mysql-ricardojchi.alwaysdata.net',
    user: '336854',
    password: 'UNI10UtRch7$',
    database: 'ricardojchi_medicamentosbd'
});

// Conexión a la base de datos
conexion.connect((error) => {
    if (error) {
        console.log("ERROR DE CONEXIÓN", error)
    } else {
        console.log("CONEXIÓN EXITOSA")
    }
});

// Configuración del servidor para escuchar en el puerto 8082
app.listen(8082, () => {
    console.log('ESCUCHANDO EN EL PUERTO 8082');
});

// Manejo de la solicitud POST para la autenticación de usuarios
app.post('/login', (req, res) => {
    const datos = req.body

    const sql = 'SELECT * FROM users WHERE email = ?'
    const values = [datos.email]

    conexion.query(sql, values, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'ERROR EN LA BASE DE DATOS' });
        } else if (resultados.length === 0 || resultados[0].contrasena !== datos.contrasena) {
            return res.status(401).json({ message: 'CREDENCIALES INCORRECTAS' });

        } else if (resultados[0].contrasena == datos.contrasena)
            res.json(resultados);
        console.log('CONCLUIDO')
    })
});

// Manejo de la solicitud POST para el registro de nuevos usuarios
app.post('/registro', (req, res) => {
    const datos = req.body;

    const insertSQL = 'INSERT INTO users (email, nombre, contrasena) VALUES (?,?,?)';
    const selectSQL = 'SELECT * FROM users WHERE id_user = LAST_INSERT_ID()';

    const values = [datos.email, datos.nombre, datos.contrasena];

    conexion.query(insertSQL, values, (error, resultados) => {
        if (error) {
            console.error('ERROR AL CREAR USUARIO: ' + error.message);
            res.status(500).json({ error: 'ERROR AL CREAR USUARIO:' });
        } else {
            conexion.query(selectSQL, (selectError, selectResult) => {
                if (selectError) {
                    console.error('ERROR AL REPCUPERAR USUARIO: ' + selectError.message);
                    res.status(500).json({ error: 'ERROR AL REPCUPERAR USUARIO:' });
                } else {
                    res.json(selectResult);
                }
            });
        }
    });
});

// Manejo de solicitudes GET para obtener nombres de medicamentos
app.get('/NombresMedicamentos', (req, respuesta) => {
    const user = req.query.user;
    console.log(user);
    const values = [user];
    const sql = "SELECT DISTINCT mn.nombre FROM medicamentos_nombres mn WHERE mn.nombre NOT IN ( SELECT DISTINCT m.nombre_medicamento FROM medicamentos m WHERE m.id_user = ? );"
    conexion.query(sql, values, (error, resultado) => {
        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA PETICIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de la solicitud GET para obtener medicamentos en la tabla Morning asociados a un usuario específico
app.get("/medicamentosMorning", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'Mañana' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;"
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de la solicitud GET para obtener medicamentos en la tabla Noon asociados a un usuario específico
app.get("/medicamentosNoon", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'Medio dia' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de la solicitud GET para obtener medicamentos en la tabla Evening asociados a un usuario específico
app.get("/medicamentosEvening", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'Tarde' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de la solicitud GET para obtener medicamentos en la tabla Night asociados a un usuario específico
app.get("/medicamentosNight", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'Noche' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de la solicitud GET para obtener medicamentos en la tabla Necessary asociados a un usuario específico
app.get("/medicamentosNecessary", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'SiNecesario' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

// Manejo de solicitudes POST para agregar un nuevo medicamento
app.post('/api/agregar', (req, res) => {

    const user = req.query.user;
    const datos = req.body;
    const tomas = datos.Si_es_necesario ? 1 : (datos.veces_a_tomar * 24) / datos.horaVeces_a_tomar;
    const sql = "INSERT INTO medicamentos (nombre_medicamento, dosis, momento_dia, Si_es_necesario, veces_a_tomar, horaVeces_a_tomar, comentarios, id_user) VALUES (?,?,?,?,?,?,?,?)";
    const values = [datos.nombre_medicamento, datos.dosis, datos.momento_dia, datos.Si_es_necesario, tomas, datos.horaVeces_a_tomar, datos.comentarios, user];

    conexion.query(sql, values, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'ERROR EN LA BASE DE DATOS' });
        }
        res.json(resultados);
    });
});

// Manejo de solicitudes DELETE para eliminar un medicamento
app.delete('/api/eliminar/:id_medicamento', (req, res) => {
    const id = req.params.id_medicamento;
    const sql = "DELETE FROM medicamentos WHERE id_medicamento = ?";
    const values = [id];

    conexion.query(sql, values, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'ERROR EN LA BASE DE DATOS' });
        }
        res.json(resultados);
    });
});

// Manejo de solicitudes PUT para actualizar la hora de un medicamento
app.put('/api/hora/:id_medicamento', (req, res) => {
    const id = req.params.id_medicamento;
    const selectSql = "SELECT horaVeces_a_tomar FROM medicamentos WHERE id_medicamento = ?";
    const selectValues = [id];

    conexion.query(selectSql, selectValues, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'ERROR EN LA BASE DE DATOS' });
        }

        if (Array.isArray(resultados) && resultados.length > 0) {
            const horasParaToma = parseInt(resultados[0].horaVeces_a_tomar, 10);

            if (!isNaN(horasParaToma) && horasParaToma >= 0 && horasParaToma <= 23) {
                const horaDes = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
                const formateador = new Intl.DateTimeFormat('en-US', horaDes);
                const currentTime = new Date();

                const newTime = new Date(currentTime.getTime() + horasParaToma * 60 * 60 * 1000);
                const horaNueva = formateador.format(newTime);

                const upd = 'UPDATE medicamentos SET hora = ? WHERE id_medicamento = ?;';
                const updValues = [horaNueva, id];
                conexion.query(upd, updValues, (error, resultados) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: 'ERROR EN LA BASE DE DATOS' });
                    }
                    res.json(resultados);
                });

            } else {
                console.log("EL VALOR NO ES VALIDO");
            }
        }
    });
});
