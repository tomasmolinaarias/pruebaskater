
const{Pool}=require('pg')
const fs = require('fs')
const path = require('path')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/skatePark'
const opt = {connectionString}

if (process.env.DATABASE_URL)
  opt.ssl = {rejectUnauthorized:false}

const pool = new Pool(opt)

//-- leer index
const getSkatersDB = async() =>{
    return pool.query("SELECT * FROM skaters").then(res => res.rows);
}
// rregistrar
const postUserDB = async ({email,nombre,hash,anos_experiencia,especialidad,pathFoto}) =>{
  /*   const values = [email,nombre,password,anos_experiencia,especialidad,foto]
    return pool.query("INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto) VALUES ($1,$2,$3,$4,$5,$6)", values) */
    const client = await pool.connect();
    const values = [email,nombre,hash,anos_experiencia,especialidad,pathFoto]
    const query = {
        text: "INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        values,
    };

    try {
        const respuesta = await client.query(query);
        const { id } = respuesta.rows[0];
        console.log(id)
        return {
            ok: true,
            id,
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        }
        return {
            ok: false,
            msg: error.message,
        };
    }finally {
        client.release();
    }
}
// llamar para login y para hacer validaciones
const getUserLoginDB=async (email)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM skaters  WHERE email =$1 ",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);

            return {
            ok: true,
            skaters :  respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: error.message,
            }         
        }

    }finally {
        client.release();
    }
}
// leer administracion
const getAdmiDB =async ()=>{
    return pool.query("SELECT foto, nombre, anos_experiencia, especialidad FROM skaters").then(res => res.rows);
}
//eliminar
const deleteUserDB = async(email)=>{
    const client = await pool.connect();

    const query =  ( {
        text:"DELETE FROM skaters WHERE email = $1 RETURNING*",
        values:[email]
    })
    try {

        const respuesta = await client.query(query);

        return {
            ok: true,
            msg:respuesta,
        };
    } catch (error) {
        console.log(error);
    return {
            ok: false,
            msg: error.message,
        };
    }finally {
        client.release();
    }
}
// actualizar
const updateUserDB = async (nombre,anos_experiencia,especialidad,email) =>{
    const client = await pool.connect();
    const values=[nombre,anos_experiencia,especialidad,email]
    const query =  ( {
        text: "UPDATE skaters SET nombre = $1, anos_experiencia = $2, especialidad = $3 WHERE email = $4 RETURNING *",
        values
    })
    try {
        const respuesta = await client.query(query);
        return {
            ok: true,
            msg:respuesta,
        };
    } catch (error) {
        console.log(error);
    return {
            ok: false,
            msg: error.message,
        };
    }finally{
        client.release();
    }
}
// estado 
const editEstadoDB =async(email,estado)=>{
    const client = await pool.connect();
    const query = {
        text: "UPDATE skaters SET estado = $1 WHERE email = $2",
        values:[estado,email]
    }
    try {
        const respuesta = await client.query(query);
        return {ok: true, msg:respuesta}
    } catch (error) {
        return{ok:false, msg:error.message}
    }finally{
        client.release();
    }
}

const migrar = () => {
    const data = fs.readFileSync(path.join(__dirname, 'migracion.sql'), {encoding: "utf-8"})

    pool.query(data)
    .then(() => console.log('listo!'))
    .catch(console.error)
    .finally(() => pool.end())
}

module.exports = {
    getSkatersDB,
    getUserLoginDB,
    getAdmiDB,    
    postUserDB,
    deleteUserDB,
    updateUserDB,
    editEstadoDB,
    migrar,
}