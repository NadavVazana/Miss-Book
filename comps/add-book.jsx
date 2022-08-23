import { bookService } from "../services/book.service.js"
import { SearchedBooks } from "./searched-books.jsx"
import { eventBusService } from "../services/event-bus.service.js"
import { showErrorMsg, showSuccessMsg } from './../services/event-bus.service.js';
export class AddBook extends React.Component{
    state={
        bookName:'',
        booksSearched:[]
    }

    onSearchBook = (ev) =>{
        ev.preventDefault()
        bookService.searchBook(this.state.bookName)
        .then(books => this.setState({booksSearched : [...books]}))
    }

    handleInput = (ev) =>{
        const {value} = ev.target
        this.setState({bookName:value})
    }

    onAddBook = (bookId) =>{
        const book = this.state.booksSearched.find(book=> book.id === bookId)
        bookService.addBook(book)
        .then(()=>{
            bookService.saveLastBookId(bookId)
            showSuccessMsg('Your book has added!')
            this.onGoBookDetails(bookId)
        })
        .catch(showErrorMsg('Error'))
        
        


    }

    onGoBookDetails(bookId){
        this.props.history.push(`/book/${bookId}`)
    }
    render(){

        return <section>
            <form onSubmit={this.onSearchBook} className="search-container" >
            <input onChange={this.handleInput} className="search-books" type="text" placeholder="Search for books..." />
            <button>Search</button>
            </form>
            <div className="searched-books">
                <ul>
                    <SearchedBooks onAddBook={this.onAddBook}  books={this.state.booksSearched} />
                </ul>
            </div>
        </section>
    }
}