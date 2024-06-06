const mongoose = require('mongoose')
const Studentmodel = require('../../api/modelos/student')
const students = require('../../data/data')
const runseed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://jisnadavis93:V0Fd4vVR5kiggDrw@cluster0.hodxodz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    )
    await Studentmodel.collection.drop()
    console.log('students deleted')
    await Studentmodel.insertMany(students)
    console.log('students inserted')
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}
runseed()
