import { useReducer } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const { setIsRegistered } = props;

  const initialFormState = {
    email: "",
    password: "",
  };

  const formReducer = (currValues, newValues) => ({
    ...currValues,
    ...newValues,
  });

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const { email, password } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let emailRegEx = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const enteredEmail=emailRegEx.test(formValues.email)
    if(enteredEmail===false){
    alert("Enter a valid emaiL_ID");
    }
    else{
      return axios
      .post("http://localhost:4000/verify", formValues)
      .then((res) => {
        localStorage.setItem("nodemongo-api-token", res.data.token);
        console.log("logged in");
        alert("logged in");
        location.reload();
      })
      .catch(() => {
        console.log("not logged in");
        alert("incorrect email or password");
      });}
  };

  return (
    <div>
      <form className="formDiv" onSubmit={handleSubmit}>
        <div className="segment">
          <h1>Sign In</h1>
        </div>
        <label>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Email Address"
          />
        </label>
        <label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="Password"
          />
        </label>
        <button className="red" type="submit">
          {" "}
          SignIn
        </button>
        <span
          className="anchorTag"
          onClick={() => {
            setIsRegistered(false);
          }}
        >
          {" "}
          <Link to="/SignUp">Create a new account</Link>
        
        </span>
      </form>
    </div>
  );
};

export default SignIn;
