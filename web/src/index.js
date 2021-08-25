import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import CustomizedSlider from './Slider';
import IconLabelButtons from './ButtonType';
import ImageUploadCard from './ImgReader';
import reportWebVitals from './reportWebVitals';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
        label="Secondary"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel control={<Checkbox name="checkedC" />} label="Uncontrolled" />
      <FormControlLabel disabled control={<Checkbox name="checkedD" />} label="Disabled" />
      <FormControlLabel disabled control={<Checkbox checked name="checkedE" />} label="Disabled" />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedF}
            onChange={handleChange}
            name="checkedF"
            indeterminate
          />
        }
        label="Indeterminate"
      />
      <FormControlLabel
        control={<GreenCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
        label="Custom color"
      />
      <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
        label="Custom icon"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="checkedI"
          />
        }
        label="Custom size"
      />
    </FormGroup>
  );
}

const Flask = () => {
  const [error, setError] = useState(null)
  const [items, setitems] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/api/v1.0/test")
      .then(res => res.json()) // res == result
      .then(
        (result) => {
          setitems(
            result.items,
          );
          console.log("result", result)
        },
        (error) => {
          setError(
            true,
          )
        }
      )
  }, [])


  const renderCheckbox = () => {
    return (
      <CheckboxLabels />
    )
  }

  const renderSlider = () => {
    return (
      <CustomizedSlider />
    )
  }

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {items.length === 0 && <div>Loading...</div>}
      {!error && <div className="Flask">
        <header className="Flask-header">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.id} {item.img}
              </li>
            ))}
            <div className="checkbox">
              {renderCheckbox}
            </div>
            <div className="slider">
              {<CustomizedSlider />}
            </div>
            <div className="imgreader">
              {<ImageUploadCard />}
            </div>
            <div className="button_t">
              {<IconLabelButtons />}
            </div>
          </ul>
        </header>
      </div>
      }
    </div>
  )

}

ReactDOM.render(
  //<React.StrictMode>
//    <App />
  //</React.StrictMode>,
  <Flask />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





