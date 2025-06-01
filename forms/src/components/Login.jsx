export default function Login() {

  function onClickHandler(event){
    event.preventDefault();
    console.log('Login button clicked');

    const formDataValues = new FormData(event.target);
    console.log('Email:', formDataValues.get('email'));
    console.log('Password:', formDataValues.get('password'));

    // If you want to log all form data as an object
    const AllFormData=Object.fromEntries(formDataValues.entries());

    const CheckBoxes = formDataValues.getAll('acquisition');
    AllFormData.acquisition = CheckBoxes;
    console.log('All Form Data:', AllFormData);
    // You can now use AllFormData to send to your server or process further
  }

  return (
    <form onSubmit={onClickHandler}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required/>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" minLength={5} required/>
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
      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
