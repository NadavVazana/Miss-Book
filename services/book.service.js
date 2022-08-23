import {dataService} from '../data.js'
import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'
const KEY = 'booksDB'
export const bookService = {
    query,
    getBookById,
    addReview,
    removeReview,
    searchBook,
    addBook,
    saveLastBookId,
    getLastBookId,
    getNextBookId
}


function query(filter){
    let books = _loadBooksFromStorage(KEY)
    if(!books){
        books = _createBooks()
        _saveBookToStorage(KEY,books)
    }

    if(filter){
        let {title,price} = filter
        if(!price) price= 0 
        books = books.filter(book =>{
           return  book.title.toUpperCase().includes(title.toUpperCase()) &&
            
            book.listPrice.amount >= price
        })

       
    }


    return Promise.resolve(books)

   
}

function addReview(bookId,rate,name,area,date){

    const books = _loadBooksFromStorage(KEY)
    const bookIdx = books.findIndex(book =>{ return book.id === bookId})
    if(!books[bookIdx].reviews){
        books[bookIdx].reviews = []
    }
    // if(books[bookIdx].reviews.find(review=> review.name === name)){
    //     return Promise.resolve()
    // }
    
    books[bookIdx].reviews.push( {name,rate,area,date,id:utilService.makeId()})

    _saveBookToStorage(KEY,books)
    return Promise.resolve(books[bookIdx].reviews)

    
}

function removeReview(bookId,reviewId){
    const books = _loadBooksFromStorage(KEY)
    const bookIdx = books.findIndex(book => book.id === bookId)
    const reviewIdx = books[bookIdx].reviews.findIndex(review => review.id === reviewId)
    books[bookIdx].reviews.splice(reviewIdx,1)
    _saveBookToStorage(KEY,books)
    return Promise.resolve(books[bookIdx].reviews)
}

function getBookById(bookId){
    if(!bookId) return Promise.resolve(null)
    let books = _loadBooksFromStorage(KEY)
    let book = books.find(book =>book.id === bookId)
    return Promise.resolve(book)
}

function searchBook(bookName){
   return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`)
   .then(book => book.data.items)
   
}

function getLastBookId(){
    const id = _loadBooksFromStorage('lastBook')
    return id
}

function getNextBookId  (bookId){
        const books = _loadBooksFromStorage(KEY)
        const bookIdx = books.findIndex(book => book.id === bookId)
        const nextBookIdx = bookIdx + 1 === books.length ? 0 : bookIdx + 1
        return books[nextBookIdx].id

}

function addBook(book){
    const books = _loadBooksFromStorage(KEY)
    const newBook = _createBook(book)
    books.push(newBook)
    _saveBookToStorage(KEY,books)
    return Promise.resolve()
    
}
function saveLastBookId(bookId){
    _saveBookToStorage('lastBook',bookId)
}

function _createBook(book){
    return {
        id:book.id || utilService.makeId(),
        title:book.volumeInfo.title || 'Unknown',
        description:book.volumeInfo.subtitle || 'Unknow' ,
        authors:book.volumeInfo.authors || [],
        publishedDate: book.volumeInfo.publishedDate || 'Unknown',
        categories:book.volumeInfo.categories || [],
        pageCount: book.volumeInfo.pageCount || 'Unknown',
        thumbnail: !book.volumeInfo.imageLinks? 'https://static.thenounproject.com/png/132226-200.png' : book.volumeInfo.imageLinks.thumbnail ,
        language : book.volumeInfo.language || 'Unknown',
        listPrice:{amount:70,currencyCode:'EUR',isOnSale:true}



    }

}

function _saveBookToStorage(key,value){
    storageService.saveToStorage(key,value)
}






function _loadBooksFromStorage(key){
    return storageService.loadFromStorage(key)
    
}


function _createBooks(){
    return dataService.getData()
}

