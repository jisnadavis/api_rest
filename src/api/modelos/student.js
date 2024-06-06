const mongoose = require('mongoose')
const { type } = require('os')
const studentschema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    direction: { type: String, required: true },
    studentimg: { type: String, required: true }
  },
  { timeseries: true }
)
const Studentmodel = mongoose.model('students', studentschema, 'students')
module.exports = Studentmodel
