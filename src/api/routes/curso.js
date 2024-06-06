const { uploadfolder } = require('../../middleware/file')
const {
  getcurso,
  createcurso,
  updatecurso,
  deletecurso
} = require('../controllers/curso')

const Cursorouter = require('express').Router()
Cursorouter.get('/', getcurso)
Cursorouter.post('/', uploadfolder('curso').single('profeimg'), createcurso)
Cursorouter.put('/:id', uploadfolder('curso').single('profeimg'), updatecurso)
Cursorouter.delete('/:id', deletecurso)
module.exports = Cursorouter
