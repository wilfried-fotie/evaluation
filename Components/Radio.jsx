
export default function Radio({ children, name, data, value, onChange}) {
    return (
        <>

            <div >
                <div >
                    <label htmlFor={name} className="dfs">  {children}</label> </div>
                <div style={{ paddingTop: "20px" }} >


                    {data.map(e => <div key={e}> <input type="radio" value={e} onChange={onChange} name={name} id={e} defaultChecked={e == value} /><label htmlFor={e}>{e}</label></div>)}



                </div>
            </div>
        </>
    )
}