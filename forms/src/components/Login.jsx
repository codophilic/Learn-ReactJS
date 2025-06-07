import { useActionState } from "react";

  async function onClickHandler(prevStateObj,formDataObject){
    const email= formDataObject.get('email');
    const password = formDataObject.get('password');
    const acquisition = formDataObject.getAll('acquisition');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Acquisition:', acquisition); // Array of checked values

    const errorObject = {errors: []};
    if (!email) {
      errorObject.errors.push('Email is required');
    }
    if (!password || password.length < 5) {
      errorObject.errors.push("Password must be at least 5 characters long");
    }
    if(errorObject.errors.length > 0) {
      // Storing the user's entered values in the enteredValues object
      errorObject.enteredValues= {email, password, acquisition}
      return errorObject;
    }else{
      // Setting a timeout to simulate a network request
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted successfully');

      return {errors: null};
    }
  }

export default function Login() {

  function Button1(){
    console.log('Button1 clicked');
  }

  function Button2(){
    console.log('Button2 clicked');
  }

  const [formActionHandler, onClickHandlerUpdatedFunction, pending] = useActionState(onClickHandler,{errors: null});

  return (
    <form action={onClickHandlerUpdatedFunction}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" defaultValue={formActionHandler.enteredValues?.email}/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password"/>
        </div>
      </div>
    <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formActionHandler.enteredValues?.acquisition?.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formActionHandler.enteredValues?.acquisition?.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formActionHandler.enteredValues?.acquisition?.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>
      {formActionHandler.errors && formActionHandler.errors.length > 0 && (
        <div className="error">
          <ul>
            {formActionHandler.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* <p className="form-actions">
      <button formAction={Button1} className="button button-flat">Button 1</button>
      <button formAction={Button2} className="button button-flat">Button 2</button>
      </p> 
      <SubmitBtn/>*/}
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button disabled={pending} className="button">
        {pending ? 'Submitting...' : 'Submit'}
        </button>
        </p>
    </form>
  );
}
