import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();  // Crea la instancia de Express

app.use(bodyParser.json());

const conexion = mysql.createConnection({
    host: 'mysql-ricardojchi.alwaysdata.net',
    user: '336854',
    password: 'UNI10UtRch7$',
    database: 'ricardojchi_medicamentosbd'
});

conexion.connect((error) => {
    if (error) {
        console.log("ERROR DE CONEXIÓN", error)
    } else {
        console.log("CONEXIÓN EXITOSA")
    }
});

app.listen(8082, () => {
    console.log('ESCUCHANDO EN EL PUERTO 8082');
});


app.use(cors())


app.get("/medicamentos", (peticion, respuesta) => {
    const sql = "SELECT * FROM medicamentos WHERE veces_a_tomar > 0 ";

    conexion.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA PETICIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});

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

app.get("/medicamentosNecessary", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM medicamentos WHERE momento_dia = 'Cuando sea necesario' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR AL REALIZAR LA CONEXIÓN" });
        } else {
            return respuesta.json({ Estatus: "PETICIÓN EXITOSA", medicamentos: resultado });
        }
    });
});


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
                        return res.status(500).json({ message: 'Error de la bd' });
                    }
                    res.json(resultados);
                });

            } else {
                console.log("EL VALOR NO ES VALIDO");
            }
        }
    });
});



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

app.post('/registro', (req, res) => {
    const datos = req.body;

    const insertSQL = 'INSERT INTO users (email, nombre, contrasena) VALUES (?,?,?)';
    const selectSQL = 'SELECT * FROM users WHERE id_user = LAST_INSERT_ID()'; // Assuming 'id_user' is the auto-increment primary key

    const values = [datos.email, datos.nombre, datos.contrasena];

    conexion.query(insertSQL, values, (error, resultados) => {
        if (error) {
            console.error('ERROR AL CREAR USUARIO: ' + error.message);
            res.status(500).json({ error: 'ERROR AL CREAR USUARIO:' });
        } else {
            // After inserting the user, retrieve the newly inserted user's information
            conexion.query(selectSQL, (selectError, selectResult) => {
                if (selectError) {
                    console.error('ERROR AL REPCUPERAR USUARIO: ' + selectError.message);
                    res.status(500).json({ error: 'ERROR AL REPCUPERAR USUARIO:' });
                } else {
                    // Assuming selectResult contains the user information
                    res.json(selectResult);
                }
            });
        }
    });
});

