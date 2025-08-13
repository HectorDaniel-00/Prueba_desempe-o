import { pool } from '../config/db.js';
import format from 'pg-format';




export  const getTransaction = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transactions;');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'error getting transactions ', error: error.message });
    }
};

export const getTransactionId = async (req, res) => {
    const { id_transaction } = req.params
    
    try {
        const query = format('SELECT * FROM transactions WHERE id_transaction = %L;',id_transaction)
        const result = await pool.query(query);
        console.log('Consulta con la query', result.rows);
        if(result.rows.length === 0) {
            return res.status(404).json({
                method: 'GET',
                status: 404,
                message: 'No transactions with that ID were found',
                error: error.message
            })
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({
            method: 'GET',
            status: 500,
            message: 'Error getting transactions by ID ', 
            error: error.message
        });
    }
};

export const postTransaction = async (req, res) => {
    try {
        const {
                id_transaction,
                date_time,
                id_client,
                invoice_number,
                transaction_amount,
                transaction_type,
                id_statu
            } = req.body

            if(!id_transaction || !date_time || !id_client || !invoice_number || !transaction_amount || !transaction_type || !id_statu) {
                return res.status(400).json({
                    status: 400,
                    method: 'POST',
                    menssage: 'Error missing required fields'
                })
            }
            const query = (`
                INSERT INTO transactions 
                    (id_transaction, date_time, id_client, invoice_number, transaction_amount, transaction_type, id_statu) 
                VALUES 
                    ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING *;`
                );
                const values = [id_transaction, date_time, id_client, invoice_number, transaction_amount, transaction_type, id_statu]
            const result = await pool.query(query, values)
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({
            status: 500,
            method: 'POST',
            message: 'Error creating a new data',
            error: error.message
        })
    }
};


export const updateTransactionID = async (req, res) => {
    const { id_transaction } = req.params;
    const { transaction_amount, id_statu } = req.body

    try {
        const query = format(`UPDATE transactions SET transaction_amount = %s, id_statu = %s WHERE id_transaction = %L RETURNING *;`, transaction_amount, id_statu, id_transaction)
        const result = await pool.query(query)
        if(result.rows.length === 0){
                return res.status(404).json({
                method: 'PUT',
                status: 404,
                message: 'transaction not found.',
            })
        }
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({
            method: 'PUT',
            status: '500',
            message: 'Error editing transaction',
            error: error.message
        })
    }
}


export const deleteTransactionID = async (req, res) => {
    const { id_transaction } = req.params
    try {
        const result = await pool.query('DELETE FROM transactions WHERE id_transaction = $1 RETURNING *', [id_transaction]);
        if(result.rows.length === 0){
            return res.status(404).json({
            method: 'DELETE',
            status: 404,
            message: 'transaction not found.'
            })
        }
        res.status(200).json({message: 'Transaction successfully deleted', deleted: result.rows[0]});
    } catch (error) {
        res.status(500).json({
            method: 'DELETE',
            status: '500',
            message: 'Error deleting transaction',
            error: error.message
        })
    }
}

