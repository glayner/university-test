import { Router } from "express";
import { UniversityController } from "../controllers/university.controller";

const universityController = new UniversityController()

const router = Router();

router.get('/universities', universityController.list)
router.post('/universities', universityController.create)
router.get('/universities/:id', universityController.show)
router.put('/universities/:id', universityController.update)
router.delete('/universities/:id', universityController.delete)

export { router };
