import express from 'express'
import multer from 'multer'
import profilController from './profil.controller.js'
import { upsertProfil, getProfilByUserId } from './profil.controller.js'
import path from 'path';

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) // .png, .jpg...
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
    cb(null, uniqueName)
  }
})
const upload = multer({ storage: storage })



router.get('/users/:id', profilController.getUserById)



// POST pour créer ou mettre à jour
router.post('/creer/', upload.single('profileImage'), upsertProfil)

// GET pour récupérer par userId
router.get('/recuperer/:userId', getProfilByUserId)


export default router