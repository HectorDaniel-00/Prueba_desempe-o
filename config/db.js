import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost", 
    user: "hector",        
    password: "020803", 
    database: "pd_hector_vargas_manglar",  
    port: "5432",         
    max: 10,              
});

const connectionBD = async () => {
    let connection;
    try {
        connection = await pool.connect();
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error(`❌ Error connecting to database: ${error.message}`);
    } finally {
        if (connection) connection.release();
    }
};


connectionBD();


