import './Error.scss'

const Error = () => {

    return (
        <>
          <h1>ERROR 404 ou 500</h1>
          <p>il y a eu un problème</p>
          <img src="https://softwaretested.com/wp-content/uploads/2018/12/System-Error.jpg" alt="error image"/>
          <Link className="error__link" to="/">retour acceuil</Link>
        </>
    )
} 

export default Error