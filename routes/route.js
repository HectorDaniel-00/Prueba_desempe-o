import { Router } from "express";
import { deleteTransactionID, getTransaction, getTransactionId, postTransaction, updateTransactionID, } from "../controllers/consulta.controller.js";

const router = Router();

router.get('/transaction', getTransaction);

router.get('/transaction/:isbn', getTransactionId);

router.post('/transaction/createe', postTransaction);

router.put('/transaction/update/:id_transaction', updateTransactionID);

router.delete('/transaction/delete/:id_transaction', deleteTransactionID);

