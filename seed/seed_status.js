import fs from 'fs'; // es la que me permite leer archivos
import path, { resolve } from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';



export async function seed_transaction() {
    const routeFile = path.resolve('data/statuses.csv');
    const statuses = []; 

    return new Promise((resolve, reject) => {
        fs.createReadStream(routeFile)
            .pipe(csv())
            .on("data", (row) => {
                statuses.push([
                    row.name_statu
                ]);
            })
            .on('end', async () => {
                try {
                    if(statuses.length === 0) {
                        console.log('The csv file is empty or has no data');
                        resolve();
                        return;
                    }
                    
                    const sql = format("INSERT INTO statuses(name_statu) VALUES %L", statuses);
                    const result = await pool.query(sql);
                    console.log(`✅ They were inserted ${result.rowCount} statuses.`);
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


seed_transaction()
