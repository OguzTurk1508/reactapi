import './App.css';
import { Component } from 'react';
import PhoneInput from 'react-phone-number-input/input'
import './style.css'


class App extends Component{
  constructor(props){
    super(props);
    this.state={
        towns:[],
        cities:[],
        students:[],
        selectedCity:1,
        selectedTown:'',
        studentName:'',
        phoneNumber:'',
        identityNumber:'',
        silinecekStudentId:null,
        filteredTowns:[],
        isTownSelected:true,
        studentId:'',
        disabledArea:true,
        searchCategory:"name",
        searchKey:"",
        searchStudents:[],
        buttonDisable:true,
        errors:{
          studentIdError:'',
          nameError:'',
          identityNumberError:'',
          phoneNumberError:'',
          cityIdError:'',
          townIdError:''
        },
        disableSubmit:false,
        submitError:''
    }
    
  }

  componentDidMount(){

    Promise.all([
      fetch('http://127.0.0.1:8080/intProject/town/findAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          towns:json,
          filteredTowns:json
        })
      }),
      fetch('http://127.0.0.1:8080/intProject/city/findAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          cities:json,
        })
      }),
      fetch('http://127.0.0.1:8080/intProject/student/findAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json,
        })
      }),
    ])
    
  }

  handleChangeStudentId = (e) => {
    this.setState({studentId:e.target.value})
    if(e.target.value==''){
      this.setState({studentIdError:'Öğrenci no boş bırakılamaz!'})
      this.setState({disableSubmit:!this.state.disableSubmit})
      this.setState({disableSubmit:true})
    }else{
      this.setState({studentIdError:''})
      this.setState({disableSubmit:false})
    }

  }

  handleChangeCity = (e) => {
    this.setState({selectedCity:e.target.value});
    if(e.target.value==''){
      this.setState({cityIdError:'İl seçimi yapınız!'})
    }else{
      this.setState({cityIdError:''})
    }
  }

  handleChangeTown = (e) => {
    this.setState({selectedTown:e.target.value});
    if(e.target.value==''){
      this.setState({townIdError:'İlçe seçimi yapınız!'})
    }else{
      this.setState({townIdError:''})
    }
  }

  handleChangeStudentName = (e) => {
    this.setState({studentName:e.target.value})
    if(e.target.value==''){
      this.setState({nameError:'Öğrenci adı boş bırakılamaz!'})
    }else{
      this.setState({nameError:''})
    }
  }

  handleChangePhoneNumber = (e) => {
    this.setState({phoneNumber:e.target.value})
    if(e.target.value==''){
      this.setState({phoneNumberError:'Telefon numarası boş bırakılamaz!'})
    }else{
      this.setState({phoneNumberError:''})
    }
  }

  handleChangeIdentityNumber =(e) => {
    this.setState({identityNumber:e.target.value})
    var str = e.target.value
    if(e.target.value==''){
      this.setState({identityNumberError:'Kimlik numarası boş bırakılamaz!'})
    }else if(e.target.value.length<11){
      this.setState({identityNumberError:'Kimlik numarası 11 haneli olmalıdır!'})
    }else{
      this.setState({identityNumberError:''})
    }

    if(isNaN(+e.target.value)){
      this.setState({identityNumberError:'Kimlik numarası harf içeremez!'})
    }
  }

  handleUpdateButton = (e) => {
    this.setState({disabledArea:!this.state.disabledArea})
    this.setState({studentIdError:""})
    this.setState({disableSubmit:!this.state.disableSubmit})
  }  

  handleChangeSearch = (e) => {
    this.setState({searchCategory:e.target.value})
  }

  handleChangeSearchKey = (e) => {
    this.setState({searchKey:e.target.value})
    this.setState({buttonDisable:false})
  }

  handleSubmit = event => {
    event.preventDefault();
    var dstudentId = this.state.studentId
    var dname= this.state.studentName
    var dcityId=this.state.selectedCity
    var dtownId=this.state.selectedTown
    var dphoneNumber = this.state.phoneNumber
    var didentityNumber = this.state.identityNumber   

    if(this.state.identityNumber=='' ||
    this.state.studentName=='' ||
    this.state.phoneNumber=='' ||
    this.state.townId=='' ||
    this.state.cityId==''  ){
      this.setState({submitError:"Kayıt formunda boş alan kalmamalıdır!"})
    }else{
      const url = 'http://localhost:8080/intProject/student/save'
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ studentId:dstudentId,
                                name:dname,
                                cityId:dcityId,
                                townId:dtownId,
                                phoneNumber:dphoneNumber,
                                identityNumber:didentityNumber })
    };
    fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))

    }

  };

  handleSearchSubmit = event => {
    event.preventDefault();
    var searchCat = this.state.searchCategory
    var key = String(this.state.searchKey)
    if(searchCat==="name"){
      fetch('http://127.0.0.1:8080/intProject/student/findByName/'+key)
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json
        })
      })
      console.log(this.state.searchStudents)
    }else if(searchCat==="identityNumber"){
      fetch('http://127.0.0.1:8080/intProject/student/findByIdentityNo/'+key)
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json
        })
      })
      this.setState({students:this.state.searchStudents})
      console.log(this.state.students)
    }else if(searchCat==="phoneNumber"){
      fetch('http://127.0.0.1:8080/intProject/student/findByPhoneNumber/'+key)
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json
        })
      })
    }else if(searchCat==="cityId"){
      fetch('http://127.0.0.1:8080/intProject/student/findByCityId/'+key)
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json
        })
      })
    }else if(searchCat==="townId"){
      fetch('http://127.0.0.1:8080/intProject/student/findByTownId/'+key)
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json
        })
      })
      console.log(this.state.students)
    }
  }

  handleResetTable = (e) => {
    fetch('http://127.0.0.1:8080/intProject/student/findAll')
      .then(res =>res.json())
      .then(json=>{
        this.setState({
          students:json,
        })
      })
      this.setState({
        buttonDisable:true
      })
  }

  render(){    
    
    return (
      <div className="App">
        <div id="formDiv" className="float-container" style={{
          marginTop:'40px',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div>
        <form>
          <div>
            <input type="text" disabled={this.state.disabledArea} placeholder="Öğrenci No" id="studentId" onChange={this.handleChangeStudentId}></input>
          </div>
          <div><text id="studentIdError" style={{color:'red', fontSize:12}}>{this.state.studentIdError}</text></div>
          <div>
            <input type="text" maxLength='20' placeholder="Öğrenci Adı" id="studentName" onChange={this.handleChangeStudentName}></input>
          </div>
          <div><text id="studentNameError" style={{color:'red', fontSize:12}}>{this.state.nameError}</text></div>
          <div>
            <input type="text" maxLength='11' placeholder="Öğrenci Telefon" id="phoneNumber" onChange={this.handleChangePhoneNumber}></input>
          </div>
          <div><text id="phoneNumberError" style={{color:'red', fontSize:12}}>{this.state.phoneNumberError}</text></div>
          <div>
            <input type="text" maxLength='11' placeholder="Öğrenci Kimlik No" id="identityNumber" onChange={this.handleChangeIdentityNumber}></input>
          </div>
          <div><text id="identityNumberError" style={{color:'red', fontSize:12}}>{this.state.identityNumberError}</text></div>
          <div>
            <select id="citySelect" placeholder="city" value={this.state.selectedCity}
              onChange={this.handleChangeCity}>
                <option>---Şehir seçiniz---</option>
                  {this.state.cities.map((e,key)=>{
                    return <option value={e.cityId} key={key}>{e.name}</option>;
                  })}
            </select>
          </div>
          <div><text id="cityIdError" style={{color:'red', fontSize:12}}>{this.state.cityIdError}</text></div>
          <div>
            <select placeholder="town" value= {this.state.selectedTown}
              onChange={this.handleChangeTown}>
                <option>---ilçe seçiniz---</option>
                  {this.state.towns.map((e, key)=>{
                    if(e.cityId==this.state.selectedCity){
                      return <option value={e.townId} key={key}>{e.name}</option>
                    }
                    return null
                  })}
            </select>
          </div>
          <div><text id="townIdError" style={{color:'red', fontSize:12}}>{this.state.townIdError}</text></div>
          <div>
          <button type="submit" onClick={this.handleSubmit} disabled={this.state.disableSubmit}>GÖNDER</button>
          <button type="button" onClick={this.handleUpdateButton}>Düzenle</button>
          </div>
          <div id="errorDiv">   
          <div><text id="submitError" style={{color:'red', fontSize:12}}>{this.state.submitError}</text></div>      
          </div>
        </form>
        </div>
        </div>
        <div style={{marginTop:'40px'}}>
            <select onChange={this.handleChangeSearch} value={this.state.searchCategory}>
              <option value="name">Öğrenci ad</option>
              <option value="identityNumber">Kimlik no</option>
              <option value="phoneNumber">Telefon no</option>
              <option value="cityId">İl no</option>
              <option value="townId">İlçe no</option>
            </select>
            <input type="text" placeholder="Öğrenci arama" onChange={this.handleChangeSearchKey}></input>
            <button type="button" onClick={this.handleSearchSubmit} disabled={this.state.buttonDisable}>Ara</button>
            <button type="button" onClick={this.handleResetTable}>Sıfırla</button>
          </div>
        <div id="listDiv" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          
          <div>
          <table>
            <thead 
              style={{
                borderBottom: 'solid 3px blue',
                color: 'Blue',
                fontWeight: 'bold',
              }}>
              <tr>
                <th>No</th>
                <th>Ad</th>
                <th>Kimlik no</th>
                <th>Telefon no</th>
                <th>İl no</th>
                <th>İlçe no</th>
              </tr>
            </thead>
            <tbody>
                {this.state.students.map(mapStud =>
                  <tr key={mapStud.studentId}>
                    <td name="studentId" value={mapStud.studentId}>{mapStud.studentId}</td>
                    <td name="name" value={mapStud.name}>{mapStud.name}</td>
                    <td name="identityNumber" value={mapStud.identityNumber}>{mapStud.identityNumber}</td>
                    <td name="phoneNumber" value={mapStud.phoneNumber}>{mapStud.phoneNumber}</td>
                    <td name="cityId" value={mapStud.cityId}>{mapStud.cityId}</td>
                    <td name="townId" value={mapStud.townId}>{mapStud.townId}</td>   
                    </tr>)}
              </tbody>
          </table>
          </div>
        </div>
        <div style={{
          marginTop:'40px',
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <form>
          <label>Silmek istediğiniz öğrenicinin numarasını giriniz:</label>
          <input type="text" onChange={this.handleChangeDeleteText}></input>
          <button type="button" onClick={this.deleteStudentButton}>Sil</button>
          </form>
        </div>
      </div>
    );
    
    
  }

  handleChangeDeleteText = (e) =>{
    this.setState({silinecekStudentId:e.target.value})
  }

  deleteStudentButton = (e)=>{
    var studentId = this.state.silinecekStudentId
    const url = 'http://localhost:8080/intProject/student/deleteByStudentId/'+studentId
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({studentId})
    };
    fetch(url, requestOptions)
      .then(response => console.log('Deleted succesfully'))
      .catch(error => console.log('Could not delete student', error))
  };

}



export default App;
