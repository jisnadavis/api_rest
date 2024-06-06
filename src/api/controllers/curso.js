const { deletefile } = require('../../utils/delete')
const Curso = require('../modelos/curso')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const getcurso = async (req, res, next) => {
  try {
    const allcurso = await Curso.find().populate('students_details')
    return res.status(200).json(allcurso)
  } catch (error) {
    console.log(error)
    return res.status(400).json('not posssible to display cursos')
  }
}
const createcurso = async (req, res, next) => {
  try {
    const { name_curso, number_students, name_profe, students_details } =
      req.body

    let studentsArray = []
    if (students_details) {
      studentsArray = JSON.parse(students_details)
    }

    studentsArray = studentsArray.map((id) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id)
      } else {
        throw new Error(`Invalid ObjectId: ${id}`)
      }
    })

    const newCurso = new Curso({
      name_curso,
      number_students,
      name_profe,
      profeimg: req.file.path,
      students_details: studentsArray
    })

    await newCurso.save()

    return res.status(201).json(newCurso)
  } catch (error) {
    console.log(error)
    return res.status(400).json('not able to create a curso')
  }
}

const updatecurso = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name_curso, number_students, name_profe, students_details } =
      req.body

    const updatingcourse = await Curso.findById(id)
    if (!updatingcourse) {
      return res.status(400).json('Course not found')
    }

    if (updatingcourse.profeimg && req.file) {
      deletefile(updatingcourse.profeimg)
    }

    const updatefields = {}
    if (name_curso) updatefields.name_curso = name_curso
    if (number_students) updatefields.number_students = number_students
    if (name_profe) updatefields.name_profe = name_profe
    if (req.file) updatefields.profeimg = req.file.path

    let curso = await Curso.findByIdAndUpdate(
      id,
      { $set: updatefields },
      { new: true }
    )

    if (students_details) {
      let studentsArray
      try {
        studentsArray = JSON.parse(students_details)
        studentsArray = studentsArray.map((studentId) => {
          if (mongoose.Types.ObjectId.isValid(studentId)) {
            return new mongoose.Types.ObjectId(studentId)
          } else {
            throw new Error(`Invalid ObjectId: ${studentId}`)
          }
        })

        curso = await Curso.findByIdAndUpdate(
          id,
          { $addToSet: { students_details: { $each: [...studentsArray] } } },
          { new: true, runValidators: true }
        )
      } catch (error) {
        console.error('Error parsing students_details:', error)
        return res.status(400).json('Invalid students_details format')
      }
    }
    curso = await Curso.findById(id).populate('students_details')

    return res.status(200).json({
      message: 'Curso updated successfully',
      element: curso
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json('Cannot update curso')
  }
}
const deletecurso = async (req, res, next) => {
  try {
    const { id } = req.params
    const cursotodelete = await Curso.findByIdAndDelete(id)
    if (cursotodelete) {
      deletefile(cursotodelete.profeimg)
    }
    return res
      .status(200)
      .json({ message: 'curso is deleted', element: cursotodelete })
  } catch (error) {
    console.log(error)
    return res.status(400).json('cant delete curso')
  }
}
module.exports = { getcurso, createcurso, updatecurso, deletecurso }
