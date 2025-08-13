import fs from 'fs'; // es la que me permite leer archivos
import path, { resolve } from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';
import { platform } from 'os';



export async function seed_platform() {
    const routeFile = path.resolve('data/platform.csv');
    const platform = []; 

    return new Promise((resolve, reject) => {
        fs.createReadStream(routeFile)
            .pipe(csv())
            .on("data", (row) => {
                platform.push([
                    row.name_platform
                ]);
                
            })
            .on('end', async () => {
                try {
                    if(platform.length === 0) {
                        console.log('The csv file is empty or has no data');
                        resolve();
                        return;
                    }
                    
                    const sql = format("INSERT INTO platform(name_platform) VALUES %L", platform);
                    const result = await pool.query(sql);
                    console.log(`✅ They were inserted ${result.rowCount} platform.`);
                    resolve();
                } catch (err) {
                    console.error('❌ Error inserting statuses:', err.message);
                    reject(err);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from books:', err.message);
                reject(err);
            });
    });
}



seed_platform()
