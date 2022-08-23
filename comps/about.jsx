const {Link,Route} = ReactRouterDOM

export class About extends React.Component {
    

    render(){
        return <section> 
        
            <div className="about-container">
            <h1 className="animate__animated animate__backInDown">Who are we?</h1>
            <ul className="animate__animated animate__backInUp">
                <li>Nadav Vazana</li>
                <li>Boris Rejkov</li>
            </ul>
            <h1>Vision:</h1><br />
            <Link to="/about/vision">See our vision!</Link>
            <Route path="/about/vision" component={Vision}/>
            
            </div>
        </section>
    
}}


function Vision(){
    return <p>Our vision is to sell books and that is all</p>

}