import { bookService } from "../services/book.service.js"
import { BookList } from "../comps/book-list.jsx"
import { BookFilter } from "../comps/book-filter.jsx"


const { Link } = ReactRouterDOM



export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,
        

    }

    componentDidMount() {
        this.loadBook()
    }
    loadBook = () => {
        bookService.query(this.state.filterBy)
            .then(bookList => this.setState({ books: bookList }))


    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy },
            () => { this.loadBook() })
    }

    

    render() {
        const { books} = this.state
        return <section className="book-app main-layout">
            

         
                <h1 className="page-title">Welcome to Miss Book!</h1>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} />
      

            
        </section>
    }
}