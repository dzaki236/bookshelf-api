const Bookcontroller = require('./Controllers/BookController')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: Bookcontroller.index
  },
  {
    method: 'GET',
    path: '/books',
    handler: Bookcontroller.getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: Bookcontroller.getBook
  },
  {
    method: 'POST',
    path: '/books',
    handler: Bookcontroller.saveBooks
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: Bookcontroller.updateBooks
  }
]

module.exports = routes
