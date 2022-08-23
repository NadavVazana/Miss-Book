export function SearchedBooks(props){

    const {books, onAddBook} = props
    return <ul>
        
        {books.map(book => {
            return <li key={book.id}><button onClick={()=>{onAddBook(book.id)}} className="add-btn">Add</button>
            {book.volumeInfo.title}</li>
            
        }
        
        )
        }
    </ul>
}