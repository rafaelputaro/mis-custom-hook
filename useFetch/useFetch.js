import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch'

export const useFetch = (url) => {
    //mantiene la referencia cuando este componente esta vivo o
    //cuando el componente que lo usa sigue montado.
    const isMounted = useRef(true);

    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        //cuando se desmonte
        return () => {
            isMounted.current=false;
        }
    }, [])

    useEffect(() => {
        setState( {data:null, loading:true, error:null});
        fetch(url)
        .then(resp => resp.json())
        .then(data => {
            if(isMounted){
                setState({
                    loading: false,
                    error: null,
                    data: data
                })
            }
        })
        .catch((error) => {
            setState({
                data: null,
                loading: false,
                error: 'no se pudo cargar la información'
            })
        })
    }, [url])
    return state;
}

useFetch.protoType = {
    url: PropTypes.string.isRequired,
}
