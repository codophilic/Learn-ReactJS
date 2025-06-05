import { useActionState } from "react";

export default function Login() {

  function onClickHandler(prevStateObj,formDataObject){
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
      return errorObject;
    }else{
      return {errors: null};
    }
  }

  const [formActionHandler, onClickHandlerUpdatedFunction] = useActionState(onClickHandler,{errors: null});

  return (
    <form action={onClickHandlerUpdatedFunction}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email"/>
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
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
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
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
