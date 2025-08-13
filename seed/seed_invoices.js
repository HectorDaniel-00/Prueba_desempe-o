import fs from 'fs'; // es la que me permite leer archivos
import path, { resolve } from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../config/db.js";
import format from 'pg-format';
import { platform } from 'os';



export async function seed_invoice() {
    const routeFile = path.resolve('data/invoices.csv');
    const invoices = []; 

    return new Promise((resolve, reject) => {
        fs.createReadStream(routeFile)
            .pipe(csv())
            .on("data", (row) => {
                invoices.push([
                    row.invoice_number,
                    row.invoice_period,
                    row.invoice_amount,
                    row.amount_paid
                ]);
                
            })
            .on('end', async () => {
                try {
                    if(invoices.length === 0) {
                        console.log('The csv file is empty or has no data');
                        resolve();
                        return;
                    }
                    
                    const sql = format("INSERT INTO invoices(invoice_number, invoice_period, invoice_amount, amount_paid) VALUES %L", invoices);
                    const result = await pool.query(sql);
                    console.log(`✅ They were inserted ${result.rowCount} invoices.`);
                    resolve();
                } catch (err) {
                    console.error('❌ Error inserting statuses:', err.message);
                    reject(err);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error reading CSV file from invoices:', err.message);
                reject(err);
            });
    });
}


seed_invoice()