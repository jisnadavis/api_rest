const { deletefile } = require('../../utils/delete')
const Studentmodel = require('../modelos/student')

const getstudents = async (req, res, next) => {
  try {
    const students = await Studentmodel.find()
    return res.status(200).json(students)
  } catch (error) {
    console.log(error)
    return res.status(400).json('not possible to  dispaly students')
  }
}
const createstudent = async (req, res, next) => {
  try {
    const newstudent = new Studentmodel(req.body)
    if (req.file) {
      newstudent.studentimg = req.file.path
    }
    const savestudent = await newstudent.save()
    return res.status(200).json(savestudent)
  } catch (error) {
    console.log(error)
    return res.status(400).json('not able to create the student')
  }
}
const updatestudent = async (req, res, next) => {
  try {
    const { id } = req.params
    const newstudent = new Studentmodel(req.body)
    newstudent._id = id
    if (req.file) {
      newstudent.studentimg = req.file.path
      const oldstudent = await Studentmodel.findById(id)
      deletefile(oldstudent.studentimg)
    }
    const studentupdated = await Studentmodel.findByIdAndUpdate(
      id,
      newstudent,
      { new: true }
    )
    return res.status(200).json(studentupdated)
  } catch (error) {
    console.log(error)
    return res.status(400).json('cant update student')
  }
}
const deletestudent = async (req, res, next) => {
  try {
    const { id } = req.params
    const studenttodelete = await Studentmodel.findByIdAndDelete(id)
    if (!studenttodelete) {
      return res.status(400).json('student not found')
    } else {
      deletefile(studenttodelete.studentimg)
      return res.status(200).json(studenttodelete)
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json('cant delete student')
  }
}
module.exports = { getstudents, createstudent, updatestudent, deletestudent }
