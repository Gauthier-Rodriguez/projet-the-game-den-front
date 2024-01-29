import './Error.scss'

const Error = () => {

    return (
        <>
          <h1>ERROR 404 ou 500</h1>
          <p>There was a problem</p>
          <img src="https://softwaretested.com/wp-content/uploads/2018/12/System-Error.jpg" alt="error image"/>
          <Link className="error__link" to="/">Back to homepage</Link>
        </>
    )
} 

export default Error