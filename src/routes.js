const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router();

const BoxControlller = require('./controller/BoxController')
const FileControlller = require('./controller/FileController')



routes.post("/boxes", BoxControlller.store)
routes.get("/boxes/:id", BoxControlller.show)

routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileControlller.store)

module.exports = routes