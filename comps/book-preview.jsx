export function BookPreview({book } ){
    const {Link} = ReactRouterDOM
    return <Link to={`/book/${book.id}`}>
         <article  className="book-preview">
        <h1 className="book-title-preview"> {book.title}</h1>
        <div className="img-container">
            <img src={book.thumbnail}  />
        </div>
    </article>
    </Link>
}