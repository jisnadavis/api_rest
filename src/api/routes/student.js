const { uploadfolder } = require('../../middleware/file')
const {
  getstudents,
  createstudent,
  updatestudent,
  deletestudent
} = require('../controllers/student')

const Studentrouter = require('express').Router()
Studentrouter.get('/', getstudents)
Studentrouter.post(
  '/',
  uploadfolder('student').single('studentimg'),
  createstudent
)
Studentrouter.put(
  '/:id',
  uploadfolder('student').single('studentimg'),
  updatestudent
)
Studentrouter.delete('/:id', deletestudent)

module.exports = Studentrouter
