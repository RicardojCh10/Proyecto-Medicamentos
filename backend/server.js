const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();  // Crea la instancia de Express

app.use(bodyParser.json());

const conexion=mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'medicamentosBD'
});

conexion.connect((error)=>{
   if(error){
      console.log("Error de conexion", error)
   } else {
      console.log("Conexión realizada")
   }
});

app.listen(8082, () => {
    console.log('Escuchando servidor 8082');
});


app.use(cors())


app.get("/medicamentos", (peticion, respuesta) => {
    const sql = "SELECT * FROM Medicamentos WHERE veces_a_tomar > 0 ";

    conexion.query(sql, (error, resultado) => {
        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});

app.get('/listaMedicamentos', (req, respuesta) => {
    const user = req.query.user;
    console.log(user);
    const values = [user];
    const sql = "SELECT DISTINCT mn.nombre FROM Medicamentos_nombres mn WHERE mn.nombre NOT IN ( SELECT DISTINCT m.nombre_medicamento FROM Medicamentos m WHERE m.id_user = ?  );";
    conexion.query(sql, values, (error, resultado) => {
        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});

app.get("/medicamentosMorning", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM Medicamentos WHERE momento_dia = 'Mañana' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});

app.get("/medicamentosMedio", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM Medicamentos WHERE momento_dia = 'Medio dia' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});

app.get("/medicamentosTarde", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM Medicamentos WHERE momento_dia = 'Tarde' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});
app.get("/medicamentosNecesario", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM Medicamentos WHERE momento_dia = 'Cuando sea necesario' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});

app.get("/medicamentosNoche", (req, respuesta) => {
    const user = req.query.user;
    const sql = "SELECT * FROM Medicamentos WHERE momento_dia = 'Noche' AND veces_a_tomar > 0 AND id_user = ? ORDER BY hora;";
    const values = [user];
    conexion.query(sql, values, (error, resultado) => {

        if (error) {
            return respuesta.json({ Error: "ERROR" });
        } else {
            return respuesta.json({ Estatus: "Ok", medicamentos: resultado });
        }
    });
});


app.post('/api/agregar', (req, res) => {

    const horaDes = { timeZone: 'America/Cancun', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formateador = new Intl.DateTimeFormat('en-US', horaDes);
    const currentTimeInCancun = new Date();
    const formattedTime = formateador.format(currentTimeInCancun);

    const user = req.query.user;
    const datos = req.body;
    const tomas = datos.Si_es_necesario ? 1 : (datos.veces_a_tomar * 24) / datos.horaVeces_a_tomar;
    const sql = "INSERT INTO Medicamentos (nombre_medicamento, dosis, hora, momento_dia, Si_es_necesario, veces_a_tomar, horaVeces_a_tomar, comentarios, id_user) VALUES (?,?,?,?,?,?,?,?,?)";
    const values = [datos.nombre_medicamento, datos.dosis, formattedTime.hora, datos.momento_dia, datos.Si_es_necesario, tomas, datos.horaVeces_a_tomar, datos.comentarios, user];

    conexion.query(sql, values, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error de la bd' });
        }
        res.json(resultados);
    });
});


app.delete('/api/eliminar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM Medicamentos WHERE id_medicamento = ?";
    const values = [id];

    conexion.query(sql, values, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error de la bd' });
        }
        res.json(resultados);
    });
});
app.put('/api/hora/:id', (req, res) => {
    const id = req.params.id;
    const selectSql = "SELECT veces_a_tomar, horaVeces_a_tomar FROM Medicamentos WHERE id_medicamento = ?";
    const selectValues = [id];

    conexion.query(selectSql, selectValues, (error, resultados) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error de la bd' });
        }

        // Check if resultados is an array and has at least one object
        if (Array.isArray(resultados) && resultados.length > 0) {
            const horasParaToma = parseInt(resultados[0].horaVeces_a_tomar, 10); // Convert to a number
            const tomasRes = (parseInt(resultados[0].veces_a_tomar, 10) - 1);
            console.log("Horas entre dosis:", horasParaToma);

            // Check if algo is a valid number of hours
            if (!isNaN(horasParaToma) && horasParaToma >= 0 && horasParaToma <= 23) {

                const horaDes = { timeZone: 'America/Cancun', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }; // Use '2-digit' for 24-hour format
                const formateador = new Intl.DateTimeFormat('en-US', horaDes);
                const currentTimeInCancun = new Date();

                const formattedTime = formateador.format(currentTimeInCancun);

                // Add the value of algo to the current time
                const newTimeInCancun = new Date(currentTimeInCancun);
                newTimeInCancun.setHours(newTimeInCancun.getHours() + horasParaToma);

                const days = new Date(newTimeInCancun.getTime() + horasParaToma * 60 * 60 * 1000);
                const fecha = `${days.getFullYear()}-${days.getMonth() + 1}-${days.getDate()}`;
                const horaNueva = formateador.format(newTimeInCancun);

                console.log("Current time in Cancun:", formattedTime);
                console.log("Time in Cancun + Algo hours:", horaNueva);

                const upd = 'UPDATE Medicamentos SET hora = ?, veces_a_tomar = ?, fecha = ? WHERE id_medicamento = ?;';
                const updValues = [horaNueva, tomasRes, fecha, id];
                conexion.query(upd, updValues, (error, resultados) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ message: 'Error de la bd' });
                    }
                    res.json(resultados);
                });

            } else {
                console.log("Invalid value.");
            }
        } else {
            console.log("No data found for the given ID.");
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
            return res.status(500).json({ message: 'Error de la bd' });
        } else if (resultados.length === 0 || resultados[0].contrasena !== datos.contrasena) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });

        } else if (resultados[0].contrasena == datos.contrasena)
            res.json(resultados);
        console.log('terminado')
    })
});

app.post('/registro', (req, res) => {
    const datos = req.body;

    const insertSQL = 'INSERT INTO users (email, nombre, contrasena) VALUES (?,?,?)';
    const selectSQL = 'SELECT * FROM users WHERE id_user = LAST_INSERT_ID()'; // Assuming 'id_user' is the auto-increment primary key

    const values = [datos.email, datos.nombre, datos.contrasena];

    conexion.query(insertSQL, values, (error, resultados) => {
        if (error) {
            console.error('Error al intentar crear usuario: ' + error.message);
            res.status(500).json({ error: 'Error al intentar crear el usuario' });
        } else {
            // After inserting the user, retrieve the newly inserted user's information
            conexion.query(selectSQL, (selectError, selectResult) => {
                if (selectError) {
                    console.error('Error al intentar recuperar el usuario: ' + selectError.message);
                    res.status(500).json({ error: 'Error al intentar recuperar el usuario' });
                } else {
                    // Assuming selectResult contains the user information
                    res.json(selectResult);
                }
            });
        }
    });
});

app.get('/api/perfil', (req, res) => {
    const sql = 'SELECT * FROM perfil WHERE id_user = 1;';

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error('Error al intentar obtener perfil: ' + error.message);
            res.status(500).json({ error: 'Error al intentar obtener el perfil' });
        } else {
            res.json(resultados);
        }
    })
});