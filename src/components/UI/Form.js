import useInput from "../../hooks/use-input";
import classes from "./Form.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;
const isEmail = (value) => value.includes("@");

const Form = (props) => {
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(isFiveChars);

  let formIsValid = false;

  if (props.isSignin && emailIsValid && passwordIsValid) formIsValid = true;

  if (
    props.isSignup &&
    nameIsValid &&
    streetIsValid &&
    postalIsValid &&
    cityIsValid &&
    emailIsValid &&
    passwordIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    let dataToSend = {
      name: nameValue,
      city: cityValue,
      street: streetValue,
      postal: postalValue,
    };

    if (props.isSignup)
      dataToSend = {
        ...dataToSend,
        email: emailValue,
        password: passwordValue,
      };
    if (props.isSignin)
      dataToSend = { email: emailValue, password: passwordValue };

    props.onConfirm(dataToSend);

    resetEmail();
    resetPassword();
    resetName();
    resetCity();
    resetPostal();
    resetStreet();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      {(props.isSignup || props.isSignin) && (
        <>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={emailValue}
            />
            {emailHasError && (
              <p className="error-text">Please enter a valid email.</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue}
            />
            {passwordHasError && <p>Please enter a valid password!</p>}
          </div>
        </>
      )}
      {(props.isCheckout || props.isSignup) && (
        <>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={nameValue}
            />
            {nameHasError && <p className="error-text">Please enter a name.</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              onChange={streetChangeHandler}
              onBlur={streetBlurHandler}
              value={streetValue}
            />
            {streetHasError && <p>Please enter a valid street!</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              onChange={postalChangeHandler}
              onBlur={postalBlurHandler}
              value={postalValue}
            />
            {postalHasError && (
              <p>Please enter a valid postal code (5 characters long)!</p>
            )}
          </div>
          <div className={classes.control}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
              value={cityValue}
            />
            {cityHasError && <p>Please enter a valid city!</p>}
          </div>
        </>
      )}
      <div className={classes.actions}>
        {props.isCheckout && (
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Form;
