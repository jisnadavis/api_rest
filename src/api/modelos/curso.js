const mongoose = require('mongoose')
const cursoschema = new mongoose.Schema(
  {
    name_curso: { type: String, required: true },
    number_students: { type: Number, required: true },
    name_profe: { type: String, required: true },
    profeimg: { type: String, required: true },
    students_details: [{ type: mongoose.Types.ObjectId, ref: 'students' }]
  },
  { timeseries: true }
)
const Curso = mongoose.model('cursos', cursoschema, 'curso')
module.exports = Curso
