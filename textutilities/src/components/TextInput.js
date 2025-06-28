import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TextInput(){
    const [inputUser,SetInputUser]=useState(" ");
    const OnChangeEvent=(event)=>{
        SetInputUser(event.target.value);
    }
    const OnClickEvent=()=>{
        SetInputUser(inputUser.toUpperCase());
    }
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("about");
    };
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

            <button onClick={handleNavigation}>Go to About</button>
        </div>
    );
}