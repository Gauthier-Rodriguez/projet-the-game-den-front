import './Loader.scss'
import {Puff} from 'react-loader-spinner'

const Loader = () => {

    return(
        <div className='loader'>
            <Puff height="80"
                        width="80"
                        radius={1}
                        color="#b5bac0"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}/>
        </div>
    )
}

export default Loader