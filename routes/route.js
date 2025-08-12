import { Router } from "express";
import { getLoans, getLoanId, postLoands, updateLoandsID } from "../controllers/consulta_pg.controller.js";

const router = Router();

// Colocar cada una de las rutas a usar

router.get('/transaction', getLoans);

router.get('/transaction/:isbn', getLoanId);



router.post('/createuser', postLoands);

router.put('/prestamos/:id', updateLoandsID);

router.delete('/transaction/:id')