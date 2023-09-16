import mysql from "mysql2"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "password",
    database: "KitchenWorks"
}).promise() // promise helps use the promise api feature a.k.a async await

export async function getItems(){
    const result = await pool.query("SELECT * FROM Items")
    const rows = result[0]
    return rows
}



export async function getItem(id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM Items
    WHERE id = ?
    `, [id])
    return rows[0]
}

export async function createItem(food, date){
    const [result] = await pool.query(`
    INSERT INTO items (item, expiry_date)
    VALUES (?,?)
    `, [food, date])
    const newId = result.insertId
    return getItem(newId)
}

