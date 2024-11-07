const mongoose = require('mongoose')
/* Above is if it's just one model */
/* Below for rmultiple */
/* const { Schema } = require('mongoose') */

const petSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    breed: { type: String, required: true },
  },
  { timestamps: true }
)

/* This won't work for this specific API */
// module.exports = petSchema

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet

/* If there is only one schema, you can do the models index function here */