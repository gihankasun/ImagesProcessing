import React, { useState } from "react";
import Services from "./../Services";

export default function Home(){
    const [data, setData] = useState({
        "imgFile": {},
        "eff1": false,
        "eff2": false,
        "eff3": false,
        "radious": 0.0,
    });
    const [size, setSize] = useState(0);

    function Handle(e){
        e.preventDefault();
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
        console.log(newData);
    }

    function CheckboxHandle(e){
        e.preventDefault();
        const newData = {...data};
        if( e.target.id == "eff1" ){
            if(newData[e.target.id] == true){
                newData[e.target.id] = false;
            }
            else{
                newData[e.target.id] = true;
            }
        }
        if( e.target.id == "eff2" ){
            if(newData[e.target.id] == true){
                newData[e.target.id] = false;
            }
            else{
                newData[e.target.id] = true;
            }
        }
        if( e.target.id == "eff3" ){
            if(newData[e.target.id] == true){
                newData[e.target.id] = false;
            }
            else{
                newData[e.target.id] = true;
            }
        }
        setData(newData);
        console.log(newData);
    }

    function ImageHandle(e){
        e.preventDefault();
        const newData = {...data};
        newData.imgFile = e.target.files;
        setData(newData);

        if((newData.imgFile) != null){
            var value = 0;
            var dt = (newData.imgFile).length;
            for(var i = 0; i < dt; ++i){
                value =  Number(value) + Number(newData.imgFile[i].size);
            }
            value = Number(value)/1024;
            setSize(Number(value));
            console.log(newData.imgFile);
            console.log(value);
        }
        console.log(newData);
    }

    function ValidateForm(){
        const newData = {...data};
        if(newData["imgFile"].length <= 0){
            alert("Select one or some images!")
            console.log("imgFile");
            return false;
        }
        if(newData["eff1"] === "" || newData["eff1"] === undefined){
            alert("Effect 1 is not validate!");
            console.log("eff1");
            return false;
        }
        else if(newData["eff2"] === "" || newData["eff2"] === undefined){
            alert("Effect 2 is not validate!");
            console.log("eff2");
            return false;
        }
        else if(newData["eff3"] === "" || newData["eff3"] === undefined){
            alert("Effect 3 is not validate!");
            console.log("eff3");
            return false;
        }
        else if(newData["radious"] === "" || newData["radious"] === undefined){
            alert("Radious is not validate!")
            console.log("radious");
            return false;
        }
        else{
            return true;
        }
    }

    function Apply(){
        if(ValidateForm()){
            const transfer = new FormData();
            for(var i = 0; i < (data.imgFile).length; ++i){
                transfer.append('imgFile', data.imgFile[i]);
            }
            transfer.append('eff1', data.eff1);
            transfer.append('eff2', data.eff2);
            transfer.append('eff3', data.eff3);
            transfer.append('radious', data.radious);
    
            Services.postIamges(transfer)
            .then(({data}) =>{
              console.log(data);
              alert("Successfully Uploaded!");
            }).catch(({response})=>{
              console.log(response);
              alert("Request Failed!");
            }) 
        }
    }

    return (
        <div className="bg-light">
            <div className="container">
                <div className="bg-white py-3 px-3" style={{ minHeight: "100vh" }}>
                    <div className="alert alert-primary px-5 py-4 mx-5 my-2">
                        <div className="row">
                            <div className="col-5">
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="imgFile" className="form-label">Select Images</label>
                                        <input className="form-control" type="file" id="imgFile" onChange={(e) => ImageHandle(e)} accept="image/*" multiple/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3 px-4">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultChecked={data.eff1} onChange={(e) => CheckboxHandle(e)} id="eff1" />
                                    <label className="form-check-label" htmlFor="eff1">Effect 01</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultChecked={data.eff2} onChange={(e) => CheckboxHandle(e)} id="eff2" />
                                    <label className="form-check-label" htmlFor="eff2">Effect 02</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultChecked={data.eff3} onChange={(e) => CheckboxHandle(e)} id="eff3" />
                                    <label className="form-check-label" htmlFor="eff3">Effect 03</label>
                                </div>
                            </div>
                            <div className="col-4 px-4">
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="radious" className="form-label">Radius</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="range" className="form-range" value={data.radious} onChange={(e) => Handle(e)} id="radious"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="size" className="form-label">Size(kb)</label>
                                    </div>
                                    <div className="col-8">
                                        <input type="number" className="form-control" id="size" value={size.toFixed(2)} placeholder="" readOnly/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-primary mt-3" onClick={()=>Apply()}>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}