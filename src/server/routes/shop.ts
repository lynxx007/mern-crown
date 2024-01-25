import express from 'express'
import categoriesPreview from '../controllers/categoriesPreview/categoriesPreview'
const router = express.Router()

router.get('/:category?',categoriesPreview)
export default router