import { useReducer } from "react";
import axios from "axios";
import "./preferences.scss";

const Preferences = () => {
  const initialFormState = {
    techStack: "",
    moviesGenre: "",
    foodChoices: "",
    tShirtSize: "",
  };

  const formReducer = (currValues, newValues) => ({
    ...currValues,
    ...newValues,
  });

  const [formValues, setFormValues] = useReducer(formReducer, initialFormState);

  const { techStack, moviesGenre, foodChoices, tShirtSize } = formValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Object.values(formValues).every(value => {
      if (value === "") {
        return alert("Please fill in every preference");
      }
      else {
      return axios
          .post("http://localhost:4000/changePreferences", {
            token: localStorage.getItem("nodemongo-api-token"),
            size: formValues.tShirtSize,
            foodhabits: formValues.foodChoices,
            genre: formValues.moviesGenre,
            techstack: formValues.techStack.split(",").map((str) => str.trim()),
          })
          .then(() => {
            alert("changes saved successfully");
          })
          .catch(() => {
            alert("error saving preferences, try again!");
          });
      }
    })
  };
  // movies, hobbies, food choices,tshirt
  //size,sports,tech stack
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="preferencesDiv">
          <div className="innerContainer">
            <div className="selectContainer">
              <label className="prefsLabel">Technologies preference</label>
              <input
                className="prefsInputField"
                name="techStack"
                type="text"
                value={techStack}
                onChange={handleChange}
                placeholder="techStack"
              />
            </div>
            <div className="selectContainer">
              <label className="prefsLabel">Genre of Movies</label>
              <select
                className="selection"
                name="moviesGenre"
                value={moviesGenre}
                onChange={handleChange}
              >
                <option value="none">Select one</option>
                <option name="Thriller">Thriller</option>
                <option name="Drama">Drama</option>
                <option name="SciFi">Sci-Fi</option>
                <option name="Romance">Romance</option>
                <option name="RomCom">Rom-Com</option>
                <option name="Comedy">Comedy</option>
              </select>
            </div>

            <div className="selectContainer" id="label3">
              <label className="prefsLabel">Food Choices</label>
              <select
                className="selection"
                name="foodChoices"
                value={foodChoices}
                onChange={handleChange}
              >
                <option value="none">Select one</option>
                <option name="Indian">Indian</option>
                <option name="Italian">Italian</option>
                <option name="Chinese">Chinese</option>
                <option name="Japanese">Japanese</option>
              </select>
              {/* <span className="focus"></span> */}
            </div>

            <div className="selectContainer" id="label4">
              <label className="prefsLabel">T-Shirt Size</label>
              <select
                className="selection"
                name="tShirtSize"
                value={tShirtSize}
                onChange={handleChange}
              >
                <option value="none">Select one</option>
                <option name="XSmall">X-Small</option>
                <option name="Small">Small</option>
                <option name="Medium">Medium</option>
                <option name="Large">Large</option>
                <option name="XLarge">X-Large</option>
              </select>
            </div>
          </div>
          <button className="prefsbutton" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Preferences;
