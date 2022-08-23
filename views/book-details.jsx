import { LongText } from "../comps/long-text.jsx"
import { bookService } from "../services/book.service.js"
import { Reviews } from "../comps/reviews.jsx"
const {Link} = ReactRouterDOM
export class BookDetails extends React.Component {

    state = {
        book:null
    }

    componentDidMount(){
        
        this.loadBook()
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.bookId !== this.props.match.params.bookId)
            {this.loadBook()
            }
    }

    loadBook =() =>{
        const {bookId} = this.props.match.params
        bookService.getBookById(bookId)
        .then(book =>{
            if(!book) return this.onGoBack()
            this.setState({book})
        })
        
    }

    onGoBack = () =>{
        this.props.history.push('/book')
    }

    classPageCount =() =>{
        const {book} = this.state
        if(book.pageCount >= 500) return 'Long reading'
        else if(book.pageCount >= 200) return 'Decent reading'
        else return 'Light reading'
    }
    
    classPusblished = () =>{
        const {book} = this.state
        const date  = new Date().getFullYear()
        if(+date - +book.publishedDate >= 10) return 'Veteran book'
        else if(+date - +book.publishedDate <= 1) return 'New book!'
    }

    classPrice = () =>{
        const {book} = this.state
      
        const price = book.listPrice.amount
        if(price > 150) return 'red'
        else if(price < 20) return 'green'
    }

    getCurrency = () =>{
        const {book} = this.state
        const currency = book.listPrice.currencyCode
        const price = book.listPrice.amount
        switch (currency){
        case 'ILS': return `${price}₪`
        case 'EUR' : return `${price}€`
        case 'USD' : return `$${price}` }
    }
  
   render(){
       const {book} = this.state
       if(!book) return <div></div>
       const nextBookId = bookService.getNextBookId(book.id)
    if(!book) return <h1>Loading...</h1>
    return <section className="book-details">
        <div className="img-container-details">
           {book.listPrice.isOnSale && <img className="sale" src="./assets/imgs/sale.png"  />}
            <img src={book.thumbnail} />

        </div>
        <div className="book-details-text">
        <h1 className="book-title">{book.title}</h1>
        
        <LongText  bookDesc = {book.description} />
        <hr />
        <div className="middle-details">
            <div className="count">
        <h1 className="page-count">Page count:{book.pageCount}</h1>
        <h1 className="page-count-text">{this.classPageCount()}</h1>
        </div>

        <ul className="authors">
            
            Authors:
            {book.authors.map(author => {
                return <li key={author}>{author}</li>
            })}
        </ul>
        <div className="book-age">
        <h1 className="book-publish">Pusblish date: {book.publishedDate}</h1>
        <h1 className="book-publish-text">{this.classPusblished()}</h1></div>
        <ul className="categories">
            
            Categories:
            {book.categories.map(category => {
                return <li key={category}>{category}</li>
            })}
        </ul>
        <h1 className="lang">Language: {book.language}</h1>
        <Reviews />
        </div>
        <hr />
        <h1 className={`${this.classPrice()} price`}>Price: {this.getCurrency()}</h1>
            <Link to={`/book/${nextBookId}`}>Next book</Link>
        <button className="go-back-button" onClick={this.onGoBack}>Go back</button></div>
    </section>
}}