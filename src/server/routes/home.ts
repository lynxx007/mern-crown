import express from 'express'
import populateCategoriesHome from '../controllers/home/categoriesItems'


const router = express.Router()

router.get('/',populateCategoriesHome)


export default router