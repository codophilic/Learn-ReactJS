import React,{useState} from 'react'

export default function TextInput(){
    const [inputUser,SetInputUser]=useState(" ");
    const OnChangeEvent=(event)=>{
        SetInputUser(event.target.value);
    }
    const OnClickEvent=()=>{
        SetInputUser(inputUser.toUpperCase());
    }
    return(
        <div>
        <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Enter your Text Here </label>
        <textarea className="form-control" value={inputUser}  onChange={OnChangeEvent} id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <button type="button" onClick={OnClickEvent} className="btn btn-primary">Convert to UPPERCASE</button>

        <div className="container my-3">
            <p> Number of Words - {inputUser.split(" ").length} , Number of Characters - {inputUser.length}</p>
        </div>

        </div>
    );
}