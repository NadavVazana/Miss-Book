 const {Link} = ReactRouterDOM
import {BookPreview} from './book-preview.jsx'

export function BookList ({books }){
       
        return <React.Fragment>
               <Link to="/addbook"> <button>Add books</button></Link>
        <section className='book-list'>
            {books.map(book => <BookPreview
                key ={book.id}
                book = {book}
                
                />)}

        </section>
        </React.Fragment>

    
}