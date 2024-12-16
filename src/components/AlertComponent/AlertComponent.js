import React,{useState, useEffect} from "react";
import './AltertComponent.css'

function AlertComponent(props){
    const[modalDispaly,toogleDispaly]=useState('none')
    const openModel=()=>{
        toogleDispaly('block')
    }
    const closeModel=()=>{
        toogleDispaly('none');
        props.hideError(null)
    }
    useEffect(()=>{
        if(props.errorMessage!=null){
            openModel()
        }
        else{
            closeModel()
        }
    })
    return(
        <div className={"alert alert-danger alert-dismissable mt-4"}
        role="alert"
        id="alertPopUp"
        style={{display:modalDispaly}}>
            <div className="d-flex alertMessage">
                <span>{props.errorMessage}</span>
                <button type="button" className="close" aria-label="Close" onclick={()=>{closeModel()}}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    )
}

export default AlertComponent;