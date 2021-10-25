import React from 'react'
import Loader from 'react-loader-spinner'
import getFile from './getFile'

function useFile(filename, container, alt = "test", clas = "imgFill") {
    const [state, setState] = React.useState()
    React.useEffect(() => {
        const d = getFile(filename, container).then(setState).catch(() => null)
            // getFile("school-logo-4.png", "schools").then(setState)
        return d
    }, [state])


    return state ? filename.substring(filename.lastIndexOf(".")) == ".mp4" || filename.substring(filename.lastIndexOf(".")) == ".MP4" ? < video src = { state }
    width = "40%"
    controls > La vidéo n 'as pas pu se charger</video> : <img className={clas} src={state} alt={ alt} /> : <Loader
    type = "TailSpin"
    color = "#4a00b4"
    height = { 20 }
    width = { 50 }
    />
}

export default useFile