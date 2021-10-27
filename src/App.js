import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Select from "react-select";

class App extends Component{
  constructor(props){
    super(props);
    this.state={
        towns:[],
        cities:[],
        selectedCity:{},
        selectedTown:{},
        studentName:{},
        phoneNumber:{},
        identityNumber:{}
    }
  }

  componentDidMount(){

    Promise.all([
      fetch('http://127.0.0.1:8080/intProject/town/getAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          towns:json,
        })
      }),
      fetch('http://127.0.0.1:8080/intProject/city/getAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          cities:json,
        })
      })
    ])
    
  }

  

  handleChangeCity = (e) => {
    this.setState({selectedCity:e.target.value});
    
  }

  handleChangeTown = (e) => {
    this.setState({selectedTown:e.target.value});
  }

  handleChangeStudentName = (e) => {
    this.setState({studentName:e.target.value})
  }

  handleChangePhoneNumber = (e) => {
    this.setState({phoneNumber:e.target.value})
  }

  handleChangeIdentityNumber =(e) => {
    this.setState({identityNumber:e.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    var name= this.state.studentName
    var cityId=this.state.selectedCity
    var townId=this.state.selectedTown
    var phoneNumber = this.state.phoneNumber
    var identityNumber = this.state.identityNumber

    const url = 'https://localhost:8080/intProject/student/add'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, cityId, townId, phoneNumber, identityNumber })
    };
    fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))
  };

  render(){

    var{towns} = this.state;
    var{cities} = this.state;
    const filteredTowns = towns.filter(
      (o) => o.cityId === this.state.selectedCity.value
    );
    
    return (
      <div className="App">
        <form>
        <div>
        <input type="text" placeholder="Öğrenci Adı" id="studentName"></input>
        </div>
        <div>
        <input type="text" placeholder="Öğrenci Telefon" id="phoneNumber"></input>
        </div>
        <div>
        <input type="text" placeholder="Öğrenci Kimlik No" id="identityNumber"></input>
        </div>
        <div>
        <select placeholder="city" value={this.state.selectedCity}
        onChange={this.handleChangeCity}>
          <option>---Şehir seçiniz---</option>
          {this.state.cities.map((e,key)=>{
            return <option value={e.cityId} key={key}>{e.name}</option>;
          })}
        </select>
        </div>
        <div>
        <select placeholder="town" value= {this.state.selectedTown}
        onChange={this.handleChangeTown}>
          <option>---ilçe seçiniz---</option>
          {this.state.towns.map((e, key)=>{
            return <option value={e.townId} key={key}>{e.name}</option>
          })}
        </select>
        </div>
        <div>
        <button type="submit" onClick={this.handleSubmit}>GÖNDER</button>
        </div>
        </form>
      </div>
    );
    
    
  }


}

export default App;
