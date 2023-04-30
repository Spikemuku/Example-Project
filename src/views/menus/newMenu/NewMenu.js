import { CButton, CCol, CInput, CRow,CSelect } from "@coreui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { emailChk, nullChk, numberChk, validateName } from "../../common/CommonValidation";
import SuccessError from "../../common/SuccessError";
import ResultClickModel from "./ResultClickModel";
import Confirmation from "../../common/Confirmation";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Dropzone from "react-dropzone";

const NewMenu=()=>{
     let history = useHistory();
    const [userNmae, setUserName] = useState(""); 
    const [age, setAge] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [phoneNumber, setPhoneNumber] = useState(""); 
    const [success, setSuccess] = useState([]); 
    const [error, setError] = useState([]); 
    const [email, setEmail] = useState(""); 
    const [japaneseSkill, setJapaneseSkill] = useState([
      { id: "1", name: "N1" },
      { id: "2", name: "N2" },
      { id: "3", name: "N3" },
      { id: "4", name: "N4" },
      { id: "5", name: "N5" }
    ]); 
    const [selectedJapaneseSkill, setSelectedJapaneseSkill] = useState(""); 
    const [popUpShow, setPopUpShow] = useState(false); 
    const [confirmationModal, setConfirmationModal] = useState(false); 
    const [content, setContent] = useState("");
    const [confirmType, setConfirmType] = useState("");
    const [dateselected,setDateselected] = useState("");
    const [file,setfile] = useState([]);
    const [image,setimage] = useState("");

    const userNamgeChange = (e)=>{
        setUserName(e.target.value);
    }
    const passwordChange = (e)=>{
        setPassword(e.target.value);
    }
    const ageChange = (e)=>{
        setAge(e.target.value);
    }
    const phChange = (e)=>{
        setPhoneNumber(e.target.value);
    }
    const emailChange = (e)=>{
      setEmail(e.target.value);
  }
  const JapaneseSkillSelectChange = (e)=>{
    setSelectedJapaneseSkill(e.target.value);
    console.log("japanez",selectedJapaneseSkill)
}
  

    const saveClick =() =>{
      let errMsg= []
      if (!nullChk(userNmae)) {
        errMsg.push("Please fill Username");
      }else  if (!validateName(userNmae)) {
        errMsg.push("Please fill Character Only in Username");
      }

      if (!nullChk(password)) {
        errMsg.push("Please fill Password");
      } 
      if (!nullChk(age)) {
        errMsg.push("Please fill age");
      } else  if (!nullChk(age)) {
        errMsg.push("Please fill number only age");
      } 

      if (!nullChk(phoneNumber)) {
        errMsg.push("Please fill ph");
      }else  if (!numberChk(phoneNumber)) {
        errMsg.push("Please fill number only in Phone Number");
      }

      if (!nullChk(email)) {
        errMsg.push("Please fill Email");
      }else  if (!emailChk(email)) {
        errMsg.push("Please fill Email Format");
      }

      if(selectedJapaneseSkill == ""){
        errMsg.push("Please select value in Japannese Skill");
      }

      if (errMsg.length <= 0) {
        setConfirmationModal(true);
        setContent("Are you sure want to save");
        setConfirmType("save");
      }else{
        setError(errMsg)
      }
    }

    const saveOK = () => {
      setError([])
      setSuccess(["Data Saved Successful"])
     history.push(`/menus/Result`)
     localStorage.setItem("USERNAME",userNmae);
     localStorage.setItem("AGE",age);
     localStorage.setItem("PASSWORD",password);
     localStorage.setItem("EMAIL",email);
     localStorage.setItem("PHONE",phoneNumber);
     localStorage.setItem("JAPAN",selectedJapaneseSkill);
     localStorage.setItem("DATE",dateselected);
     localStorage.setItem("FILE",file);
     localStorage.setItem("IMAGE",image);
    }
    

   const resetClick = () =>{
    setConfirmationModal(true);
    setContent("Are you sure want Reset?");
    setConfirmType("confirm");
   }

   const confirmOK = () =>{
        setError([]);
        setUserName("");
        setAge("");
        setPhoneNumber("");
        setEmail("");
        setSelectedJapaneseSkill("");
        setPassword("");
        setDateselected("");
        setfile([])
        setimage('')
        setConfirmationModal(false);

   }
     
   const popUpClick = () => {
    setPopUpShow(true);
   }
  
   const deleteClick = () =>{
    setConfirmationModal(true);
    setContent("Are you sure want Delete?");
    setConfirmType("delete");
   }

   const deleteOK = () => {
    setConfirmationModal(false);
    alert("Delete");
   }

   const selectedDate = (val) => {
    let date = ""
    if (val != null){
      date = moment(val).format("YYYY-MM-DD");
    }
    setDateselected(date)
   }

   const HandleDrop = (selectedfile) => {
     setfile(selectedfile)
   }

   const removeFile = () => {
     setfile([]);
   }

   const HandleDropImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setimage(dataUrl.split(',')[1]);
    };
    reader.readAsDataURL(acceptedFiles[0]);
   }
   
    return(
        <>
        <SuccessError success={success} error={error} />
        <CRow><h1>User Registeration</h1></CRow>
        <br></br>
        <CRow>
            <CCol lg="6">
               <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="3">UserName <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <CInput type ="text" value={userNmae
                    } onChange={userNamgeChange}/>
                </CCol>
               </CRow>
               <br></br>
               <CRow>
               <CCol lg="1"></CCol>
                <CCol lg="3">Age <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <CInput type ="text" value={age
                    } onChange={ageChange}/>
                </CCol>
               </CRow>
               <br></br>

               <CRow>
               <CCol lg="1"></CCol>
                <CCol lg="3">Email <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <CInput type ="text" value={email} onChange={emailChange}/>
                </CCol>
               </CRow>
               <br></br>
                <CRow>
                  <CCol lg="1"></CCol>
                  <CCol lg="3">Select Date <span style={{color:"red"}}>*</span></CCol>
                  <CCol lg="8">
                  <MuiPickersUtilsProvider
                    utils={DateFnsUtils}
                    libInstance={moment}
                  >
                    <KeyboardDatePicker
                    InputProps={{
                      readOnly: true,
                      disableUnderline: true,
                    }}
                    clearable
                    format="yyyy/MM/dd"
                    style={{
                      borderRadius: "5px",
                      overflow: "hidden",
                      borderBottom: "1px solid #98847e",
                      width:"100%"
                    }}
                      value = {
                        dateselected == "" ||
                        dateselected == null
                        ? null
                        :dateselected
                      }
                      onChange={(val) => selectedDate(val)}
                    />
               </MuiPickersUtilsProvider>
               </CCol>
               </CRow>
                <br/><br/>

               <CRow>
                <CCol lg="1"></CCol>
                <CCol lg="3">Select Image</CCol>
                <CCol lg="8">
                  <CRow>
                  <Dropzone onDrop={HandleDropImage}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <CButton className="btn-behance">Select Photo</CButton>
                        </div>
                      )}
                  </Dropzone>

                  {image && (
                    <img 
                    style={{ width: "100px",marginLeft:"20px" }}
                    src={`data:image/jpeg;base64,${image}`} alt="Uploaded image"/>
                  )}
                  </CRow>
                </CCol>
               </CRow>
               </CCol>

            <CCol lg="6">
            <CRow>
            <CCol lg="1"></CCol>
                <CCol lg="3">Password <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <CInput type ="password" 
                    value={password
                    } onChange={passwordChange}/>
                </CCol>
               </CRow>
               <br></br>
               <CRow>
               <CCol lg="1"></CCol>
                <CCol lg="3">Phone Number <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <CInput type ="text" value={phoneNumber
                    } onChange={phChange}/>
                </CCol>
               </CRow>
               <br></br>


               <CRow>
               <CCol lg="1"></CCol>
                <CCol lg="3">Japanese Skill <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                <CSelect
                value={selectedJapaneseSkill}
                onChange={JapaneseSkillSelectChange}
              >
                <option value="">-- Select --</option>
                {japaneseSkill.map((data, index) => {
                  return (
                    <option
                      key={index}
                      value={data.name}
                    >
                      {data.name}
                    </option>
                  )
                }
                )}
              </CSelect>
                </CCol>
               </CRow>
               <br></br>
              
               <CRow>
               <CCol lg="1"></CCol>
                <CCol lg="3">File Upload <span style={{color:"red"}}>*</span></CCol>
                <CCol lg="8">
                    <Dropzone onDrop={HandleDrop}>
                    {({getRootProps, getInputProps}) => (
                        <CRow>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <CButton className="btn-behance">Select File</CButton>
                          </div>
                          { file.map((k)=>(
                            <>
                            <li style={{ marginLeft: "20px" }} key={k.name} >{k.name}</li>
                            <CButton className="btn btn-danger" onClick={removeFile} style={{ marginLeft: "20px" }}> Remove File</CButton>
                            </>
                          ))}
                        </CRow>
                      )}
                    </Dropzone>
                </CCol>
               </CRow>
               <br></br>

            </CCol>

        </CRow>
  <br></br>
  <br></br>
        <CRow style={{justifyContent:"center"}}> 

            <CButton onClick={saveClick} className="btn btn-success">Save</CButton>
            <CButton onClick={resetClick} 
             style={{marginLeft:"20px"}}
            className="btn btn-primary">Reset</CButton>
        </CRow>
        <CRow style={{justifyContent:"left"}}>
        <CButton onClick={popUpClick} className="btn btn-success">PopUp</CButton>
        </CRow>

        <CRow style={{justifyContent:"right"}}>
        <CButton onClick={deleteClick} className="btn btn-danger">Delete</CButton>
        </CRow>


        <ResultClickModel 
        popUpShow={popUpShow} 
        closeBtn={() => setPopUpShow(false)} 
        userName = {userNmae}
        />

          <Confirmation
            show={confirmationModal}
            content={content}
            type={confirmType}
            saveOK={saveOK}
            confirmOK={confirmOK}
            deleteOK={deleteOK}
            cancel={() => setConfirmationModal(false)}
            cancelButton="Cancel"
            okButton="Yes"
          />
                
        </>
     
    )
}
export default NewMenu;