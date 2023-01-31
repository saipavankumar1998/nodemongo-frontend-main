import "./profile.scss";
import { useReducer } from "react";
import axios from "axios";

const Profile = () => {
  const initialFormState = {
    height: "",
    weight: "",
    dob: "",
    language: "",
  };

  const formReducer = (currValues, newValues) => ({
    ...currValues,
    ...newValues,
  });

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const { height, weight, dob, language } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.values(formValues).every(value => {
      if (value === "") {
        return alert("Please fill every field");
      }
      else{
        console.log(formValues);
        axios
          .post("http://localhost:4000/changeProfile", {
            token: localStorage.getItem("nodemongo-api-token"),
            ...formValues,
          })
          .then(() => {
            alert("values updated successfully");
          })
          .catch(() => {
            alert("some error occured, please try again!");
          });
      }
    })   
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="profileDiv">
          <div className="innerContainer">
            <input
              className="profinputField"
              name="height"
              type="number"
              value={height}
              onChange={handleChange}
              placeholder="Height in cms"
            />
            <input
              className="profinputField"
              name="weight"
              type="number"
              value={weight}
              onChange={handleChange}
              placeholder="Weight in kgs"
            />
            <input
              className="profinputField"
              name="dob"
              type="text"
              value={dob}
              onChange={handleChange}
              placeholder="Date of Birth"
            />
            <input
              className="profinputField"
              name="language"
              type="text"
              value={language}
              onChange={handleChange}
              placeholder="Mother Tounge"
            />
          </div>
          <span className="profbuttonSpanDiv">
            <button className="profbutton" type="submit">
              Save
            </button>
            <button className="profbutton" id="editButton" type="button">
              Edit
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Profile;
