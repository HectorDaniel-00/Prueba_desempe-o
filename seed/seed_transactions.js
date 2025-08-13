import fs from 'fs'; // es la que me permite leer archivos
import path, { resolve } from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';
import { log } from 'console';



export async function seed_transaction() {
    const routeFile = path.resolve('data/transactions.csv');
    const transaction = []; 

    return new Promise((resolve, reject) => {
        fs.createReadStream(routeFile)
            .pipe(csv())
            .on("data", (row) => {
                transaction.push([
                    row.id_transaction,
                    row.date_time,
                    parseInt(row.id_client),
                    row.invoice_number,
                    row.transaction_amount,
                    row.transaction_type,
                    parseInt(row.id_statu)
                ]);
            })
            .on('end', async () => {
                try {
                    if(transaction.length === 0) {
                        console.log('The csv file is empty or has no data');
                        resolve();
                        return;
                    }
                    
                    const sql = format("INSERT INTO transactions(id_transaction, date_time, id_client, invoice_number, transaction_amount, transaction_type, id_statu) VALUES %L", transaction);
                    const result = await pool.query(sql);
                    console.log(`✅ They were inserted ${result.rowCount} transactions.`);
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