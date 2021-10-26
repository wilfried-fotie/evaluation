import React from 'react'
import Loader from 'react-loader-spinner'

function Media({ photo = false, video = false, file = false, children, state, name, onChange, mult }) {
    const [loader,setLoader] = React.useState(false)
    const ref = React.useRef(null)
    const handleClick = () => {
        ref.current.click()
    }
   


    

    return (
        <div>
            <label htmlFor={name}>{children}</label>
            <input name="logo"  multiple={file || mult} id="logoData" type="file"
                accept={video ? ".mp4,.MP4" : photo ? "image/*" : file ? ".doc,.docx,.PDF,.pdf":null}
                ref={ref} className="none"  onChange={onChange} />
            {photo && !mult ?
            <>
                    {loader && <Loader
                        type="TailSpin"
                        color="white"
                        height={20}
                        width={50}
                    />}
                    {state && <center>  <img src={state.logo} alt="" id="logo" /> </center> }
                    <div className="rad" onClick={handleClick}>

                     <center>   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                            </center>
                    </div>
            </>
                : null}
            {photo && mult ?
                <>
                    {state && state.portfolio && "dfvdsvf" && <center> {[...state.portfolio].map(e => <><span>{e.name}</span><br /></>)}  </center>}
                    <div className="rad" onClick={handleClick}>

                        <center>   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                        </center>
                    </div>
                </>
                : null}
            {video ?
                <>

                    {state && state.pres && <center> <video controls preload="none" height="200px" poster="https://cdn.pixabay.com/photo/2018/05/18/03/28/video-3410270_960_720.jpg"  >
                        <source id='mp4' src={state.pres} type='video/mp4' />
                    </video> </center>}
                    
                    <div className="rad" onClick={handleClick}>

                        <center> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-reels-fill" viewBox="0 0 16 16">
                            <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
                        </svg>
                        </center>
                    </div>
                </>
                : null}
            {file ?
                <>

                    {state && state.files && <center> {[...state.files].map(e => <><span>{e.name}</span><br/></>)} </center>}
                    <div className="rad" onClick={handleClick}>
                        <center> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-capslock-fill" viewBox="0 0 16 16">
                            <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1z" />
                        </svg>
                        </center>
                    </div>
                </>
                : null}

           
        </div>
        
    )
}

export default Media
