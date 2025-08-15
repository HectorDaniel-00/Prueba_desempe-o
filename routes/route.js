import { Router } from "express";
import { deleteTransactionID, getTransaction, getTransactionId, postTransaction, updateTransactionID, } from "../controllers/consulta.controller.js";

const router = Router();

router.get('/transaction', getTransaction);

router.get('/transaction/:id_transaction', getTransactionId);

router.post('/transaction/create', postTransaction);

router.put('/transaction/update/:id_transaction', updateTransactionID);

router.delete('/transaction/delete/:id_transaction', deleteTransactionID);

export default router;