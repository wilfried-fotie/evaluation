import React from 'react'
import { useForm } from "react-hook-form";




function Input({ type = "text", name, label, register, required, children}) {
    return (
        <div>
            <div className="table">
                <label >{label}</label>
                <input type="date"{...register(label, { required })}/>
               
            </div>
        </div>
    )
}

export default Input
