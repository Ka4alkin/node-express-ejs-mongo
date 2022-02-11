const createPath = require('../helpers/create-path')
const Contact = require("../models/contacts");

const getContacts = ((req, res) => {
    Contact
        .find()
        .then((contacts) => res.render(createPath('contacts'), {contacts}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

})

module.exports = {
    getContacts
}