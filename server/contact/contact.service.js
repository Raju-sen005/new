module.exports = {
  createContact,
  getAllContacts,
  getByIdDelete,
  updateById
};

function getContactModel() {
  const db = require("../_helpers/db.js"); // force fresh require
  return db.Contact;
}

async function createContact(contactData) {
  const Contact = getContactModel();
  return await Contact.create(contactData);
}

async function getAllContacts() {
  const Contact = getContactModel();
  return await Contact.findAll();
}
async function getByIdDelete(id) {
  try {
    const Contact = getContactModel();
    const product = await Contact.findByPk(id);
    if (!product) throw "Contact not found";
    await product.destroy();
    // return await 
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
}
async function updateById(id, contactData) {
  try {
    const Contact = getContactModel();
    const contact = await Contact.findByPk(id);
    if (!contact) throw "Contact not found";
    await contact.update(contactData);
    return contact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
}
