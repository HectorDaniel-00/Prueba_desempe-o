import fs from 'fs'; // es la que me permite leer archivos
import path, { resolve } from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';
import { log } from 'console';



export async function seed_client() {
    const routeFile = path.resolve('data/client.csv');
    const clients = []; 

    return new Promise((resolve, reject) => {
        fs.createReadStream(routeFile)
            .pipe(csv())
            .on("data", (row) => {
                clients.push([
                    row.full_name,
                    row.indetification,
                    row.direction,
                    row.phone,
                    row.email,
                    row.id_platform?parseInt(row.id_platform):null
                ]);
            })
            .on('end', async () => {
                try {
                    if(clients.length === 0) {
                        console.log('The csv file is empty or has no data');
                        resolve();
                        return;
                    }
                    
                    const sql = format("INSERT INTO client(full_name, indetification, direction, phone, email, id_platform) VALUES %L", clients);
                    const result = await pool.query(sql);
                    console.log(`✅ They were inserted ${result.rowCount} clients.`);
                    resolve();
                } catch (error) {
                    console.error('❌ Error inserting statuses:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from books:', err.message);
                reject(err);
            });
    });
}


seed_client()