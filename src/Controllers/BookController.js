const { nanoid } = require('nanoid')
const Books = require('../Models/Books')
let [statusCode, bookShelf, bookLists, responses] = [200, [], [], [{}]]
class Bookcontroller {
  async index (request, h) {
    responses = h.response({
      status: 'success'
    })
    statusCode = 200
    responses.code(statusCode)
    return responses
  }

  async getAllBooks (request, h) {
    const { name, reading, finished } = request.query
    if (Books.length === 0) {
      statusCode = 200
    }
    bookShelf = Books

    if (typeof name !== 'undefined') {
      bookShelf = Books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    }

    if (typeof reading !== 'undefined') {
      bookShelf = Books.filter((book) => Number(book.reading) === Number(reading))
    }

    if (typeof finished !== 'undefined') {
      bookShelf = Books.filter((book) => Number(book.finished) === Number(finished))
    }

    bookLists = bookShelf.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }))

    responses = h.response({
      status: 'success',
      data: {
        books: bookLists
      }
    })
    responses.code(statusCode)
    return responses
  }

  async saveBooks (request, h) {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload

    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    }
    if (typeof name === 'undefined') {
      responses = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Nama buku tidak boleh kosong!'
      })
      statusCode = 400
      responses.code(statusCode)
      return responses
    }

    if (readPage > pageCount) {
      responses = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage pada buku tidak boleh lebih besar dari pageCount!'
      })

      statusCode = 400
      responses.code(statusCode)
      return responses
    }

    Books.push(newBook)

    const Success = Books.filter((book) => book.id === id).length > 0

    if (Success) {
      responses = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan!',
        data: {
          bookId: id
        }
      })

      statusCode = 201
      responses.code(statusCode)
      return responses
    }

    responses = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan!'
    })

    statusCode = 500
    responses.code(statusCode)
    return responses
  }

  async getBook (request, h) {
    const { id } = request.params
    const bookLists = Books.filter((n) => n.id === id)[0]
    if (typeof bookLists !== 'undefined') {
      responses = h.response({
        status: 'success',
        data: {
          bookLists
        }
      })
      statusCode = 200
    } else {
      responses = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
      })
      statusCode = 404
    }

    responses.code(statusCode)
    return responses
  }

  async updateBooks (request, h) {
    const { id } = request.params

    const {
      name, year, author, summary, publisher, pageCount, readPage, reading
    } = request.payload
    const updatedAt = new Date().toISOString()
    const index = Books.findIndex((book) => book.id === id)

    if (typeof name === 'undefined') {
      responses = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku'
      })

      statusCode = 400
      responses.code(statusCode)
      return responses
    }

    if (readPage > pageCount) {
      responses = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
      })

      statusCode = 400
      responses.code(statusCode)
      return responses
    }

    if (index !== -1) {
      Books[index] = {
        ...Books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
      }

      responses = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      })

      statusCode = 200
      responses.code(statusCode)
      return responses
    }

    responses = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })

    statusCode = 404
    responses.code(statusCode)
    return responses
  }
}

const BookController = new Bookcontroller()
module.exports = BookController
