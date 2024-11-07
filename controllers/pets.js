// controllers/pets.js

const Pet = require('../models/pet.js')
const express = require('express')
const router = express.Router()

/* write out controller functions here */

/* The index-slash ('/') is being used because we are ALREADY inside of '/pets' */

// CREATE - POST - /pets
// Creates a new pet object for the API
router.post('/', async (req, res) => {
    // res.json({ message: 'Create route'})
    let newPetObject = req.body
    try {
        // Create a new pet with the data from req.body
        const createdPet = await Pet.create(newPetObject)
        res.status(201).json(createdPet) // 201 Created
    } catch (error) { // Error handling
        res.status(500).json({ error: error.message })
    }
})

// READ - GET - /pets
// Reads the contents of the route. a GET route
router.get('/', async (req, res) => {
    // res.json({ message: 'Index route'})
    try {
        const foundPets = await Pet.find() // Locates and spits out ALL pet objects
        res.status(200).json(foundPets)
    } catch (error) {
        res.status(500).json({ error: error.message }) // 500 Internal Server Error
    }
})

// READ - GET - /pets/:petId
// SHOW route, shows a specific pet
router.get('/:petId', async (req, res) => {
    // res.json({ message: `Show route for param ${req.params.petId}`})
    let targetPetID = req.params.petId

    try {
        // Add query to find a single pet
        const foundPet = await Pet.findById(targetPetID)

        // If no pet, show an error
        if (!foundPet) {
            res.status(404)
            throw new Error(`Pet with ID of ${targetPetID} not found, therefore, cannot be shown`)
          }
        res.status(200).json(foundPet) // 200 OK

      } catch (error) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ error: error.message })
          } else {
            // Add else statement to handle all other errors
            res.status(500).json({ error: error.message })
          }
      }
})

// DELETE - DELETE - /pets/:petId
// Deletes the given pet by targetting its ID
router.delete('/:petId', async (req, res) => {

    /* res.json({ message: `DELETE route for param ${req.params.petId}`}) */

    let targetPetID = req.params.petId

    try {
        // Add query to find a single pet
        const deletionTargetPet = await Pet.findByIdAndDelete(targetPetID)

        // If no pet, show an error
        if (!deletionTargetPet) {
            res.status(404)
            throw new Error(`Pet with ID of ${targetPetID} not found, therefore, cannot be deleted`)
          }
        res.status(200).json(`Pet with ID of ${targetPetID} has been DELETED`) // 200 OK

      } catch (error) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ error: error.message })
          } else {
            // Add else statement to handle all other errors
            res.status(500).json({ error: error.message })
          }
      }
})

// UPDATE - PUT - /pets/:petId
// Updates the information of an existing pet
router.put('/:petId', async (req, res) => {
    // res.json({ message: `UPDATE route for param ${req.params.petId}`})
    let targetPetID = req.params.petId
    let newPetData = req.body

    try {
        // Add { new: true } as the third argument, to reload the updated pet object
        const updatedPet = await Pet.findByIdAndUpdate(targetPetID, newPetData, { new: true, })
        if (!updatedPet) {
            res.status(404)
            throw new Error(`Pet with ID of ${targetPetID} not found, therefore, cannot be UPDATED`)
        }
        res.status(200).json(updatedPet)
    } catch (error) {
        // Add code for errors
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
  })




// Export the router at the bottom of the file
module.exports = router