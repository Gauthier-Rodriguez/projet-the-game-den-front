import './Home.scss'

const Home = () => {

    // affichage des recommandations - si utilisateur connecté
    //possibilité de filtrer en cliquant sur les boutons plaform/genre/noteMC 
    // if(isAuthenticated){
    //     return(
    //         <div className="home__container">
    //             <select className="home__filter" name="platform" onChange="" >
    //                 <option className="filter__default"value="">Platform</option>
    //                 <option className="filter__list"value="nom-dynamique">nom-dynamique</option>
    //             </select>
    //             <select className="home__filter" name="genre" onChange="" >
    //                 <option className="filter__default" value="">Genre</option>
    //                 <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
    //             </select>
    //             <select className="home__filter" name="noteMC" onChange="">
    //                 <option className="filter__default" value="">Note MC</option>
    //                 <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
    //             </select>

    //             <h1 className="home__title">Recommendation</h1>
    //             <div className="home__list">
    //                 <div className="card">
    //                     <img className="card__img"src="" alt="" />
    //                     <div className="card__list-logo">
    //                     {/* plateforme sous forme de logo/dynamique en fonction des jeux */}
    //                         <img className="card__logo" src="" alt="" /> 
    //                     </div>
    //                     <h2 className="card__title">Titre du jeu</h2>
    //                     <div className="card__information">
    //                         <p className="card__genre">Genre</p>
    //                         <div className="card__meta">note meta</div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
     // sinon affichage des jeux populaires
     //possibilité de filtrer en cliquant sur les boutons plaform/genre/noteMC     
    // else{
   
        return(
            <div className="home__container">
                <select className="home__filter" name="platform" onChange="" >
                    <option className="filter__default"value="">Platform</option>
                    <option className="filter__list"value="nom-dynamique">nom-dynamique</option>
                </select>
                <select className="home__filter" name="genre" onChange="" >
                    <option className="filter__default" value="">Genre</option>
                    <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
                </select>
                <select className="home__filter" name="noteMC" onChange="">
                    <option className="filter__default" value="">Note MC</option>
                    <option className="filter__list" value="nom-dynamique">nom-dynamique</option>
                </select>

                <h1 className="home__title">Popular</h1>
                <div className="home__list">
                    <div className="card">
                        <img className="card__img"src="" alt="" />
                        <div className="card__list-logo">
                        {/* plateforme sous forme de logo (récupérer le logo de chaque plateforme/dynamique en fonction des jeux */}
                            <img className="card__logo" src="" alt="" /> 
                        </div>
                        <h2 className="card__title">Titre du jeu</h2>
                        <div className="card__information">
                            <p className="card__genre">Genre</p>
                            <div className="card__meta">note meta</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
// }

export default Home