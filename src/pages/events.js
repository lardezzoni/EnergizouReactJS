import axios from 'axios';
import { useState, useEffect,setUpdatedState, useRef, useCallback, useReducer } from 'react';
import { NoSsr } from '@mui/base/NoSsr';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Button } from '@mui/base/Button';
import { useButton } from '@mui/base/useButton';
import { Component, setCustomValidity } from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import {Container, Stack, checkboxClasses} from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { tableHeadClasses } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles, makeStyles} from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/styles";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { TextField } from "@mui/material"; 
import { ClassNames } from '@emotion/react';
import MenuItem from '@mui/material/MenuItem';
import { useFetcher } from 'react-router-dom';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}
const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'senha', headerName: 'Senha', width: 150 },
    { field: 'empresa', headerName: 'Empŕesa', width: 150 },
    { field: 'CNPJ', headerName: 'CNPJ', width: 150 },
    { field: 'CEP', headerName: 'CEP', width: 150 },
    { field: 'endereço', headerName: 'Endereço', width: 150 },
    { field: 'numero', headerName: 'Número', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 }
  ];

const StyledTableCell = withStyles((theme) => ({
    head: {
        color: "white",
        whiteSpace: "nowrap",
        fontPalette: "white"
      },
      body: {
        fontPalette: "white",
        whiteSpace: "nowrap"
      }
    
  }))(TableCell);
  const useStyles = makeStyles({

    root: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "blue"
        },
    }
});
  
  const StyledTableRow = withStyles((theme) => ({

  }))(TableRow);



  
const Events = () => {

let item = useRef([])

const [valueSelect, setvalueSelect] = useState('')
const optionsSelect = {

}
const [getValue, setgetValue]= useState('')
const [test, setTest] = useState([])
const [update, setUpdate] = useState(0);
const [formValue, setformValue]=useState({
    nome: '',
    senha:'',
    empresa:'',
    CNPJ:0,
    CEP:0,
    endereço: '',
    numero: 0,
    telefone:0,
    email:''
})
const[formUpdate, setformUpdate] = useState({

    
})


useEffect(() => {
    if(valueSelect=="getAll"){
        getItems();
    }
    if(valueSelect==''){
        getItems();
    }
}, [valueSelect])


const getItems = useCallback(async() => {
    const res =  await axios.get("http://localhost:3005/api/v1/empresa/test");
    
    setTest(res.data.data.data)
})

const handleChangeForm=(e,name)=> {
    const {value}=e.target
    if(e.target.value.match("^[a-zA-Z ]*$")!=null){
        e.target.setCustomValidity("Input inválido")
    }
    else{
        setformValue(prevState=>({
            ...prevState,
            [name]: value
          }))
    }
    
    console.log(formValue)
  }
const handleUpdateForm=(e,name)=> {
    const {value}=e.target
    setformUpdate(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(formValue)
  }

const handleChange = (event) => {
    setvalueSelect(event.target.value);
  };
const handleAdd = async(event)=>{
    await axios.post("http://localhost:3005/api/v1/empresa/test",formValue)
    .then(res=>{    
        console.log("HERE")
        console.log('success')
        setformValue({
            nome: '',
            senha:'',
            empresa:'',
            CNPJ:0,
            CEP:0,
            endereço: '',
            numero: 0,
            telefone:0,
            email:''
        })
        setvalueSelect('getAll');
    })
    .catch(err=>{
        setformValue({
            nome: '',
            senha:'',
            empresa:'',
            CNPJ:0,
            CEP:0,
            endereço: '',
            numero: 0,
            telefone:0,
            email:''
        })
    })
}

const handleUpdate = async(event)=>{
    const URL = "http://localhost:3005/api/v1/empresa/" + getValue;
    await axios.patch(URL, formUpdate)
    .then(res=>{
        console.log("SUCESS UPDATE");
        setformUpdate({

        })
        setvalueSelect('getAll');
    })
}
const handleDelete = async (event)=>{
    await axios({
        method: 'DELETE',
        url: "http://localhost:3005/api/v1/empresa/" + getValue,
      })
    .then(res=>{    

        setvalueSelect('getAll');
    })
    .catch(err=>{
        if(err.status==404){

        }
    })
}
const handleGet = async (event) => {
    const reqBodyCNPJ = {
        CNPJ: getValue
    }
    await axios({
        method: 'GET',
        url: "http://localhost:3005/api/v1/empresa/" + getValue,
      })
    .then(res=>{    
        console.log("HERE")
        setTest(res.data.data.empresa)
        console.log(item.current)
    })  
    ;}

const bodySelect = () =>{
    if(valueSelect=="add"){
      return (  <div>
                     <TextField
                        label="Nome"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => {
                            
                                handleChangeForm(e, "nome")
                             }}
                        style={{ marginRight: 10 }}
                        required
                        onInvalid={(e)=>{e.target.setCustomValidity("error msg:  Nome inválido.")}}
                    />
                    <TextField
                        label="Senha"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "senha") }
                        style={{ marginRight: 10 }}
                        required
                    />
                    <TextField
                        label="Empresa"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "empresa") }
                        style={{ marginRight: 10 }}
                        required
                    />
                     <TextField
                        label="CNPJ"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "CNPJ") }
                        style={{ marginRight: 10 }}
                        required
                    />
                     <TextField
                        label="CEP"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "CEP") }
                        style={{ marginRight: 10 }}
                        required
                    />
                     <TextField
                        label="Endereço"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "endereço") }
                        style={{ marginRight: 10 }}
                        required
                    />
                     <TextField
                        label="Número"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "numero") }
                        style={{ marginRight: 10 }}
                        required
                    />
                     <TextField
                        label="Telefone"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e, "telefone") }
                        required
                     
                    />
                     <TextField
                        label="Email"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleChangeForm(e,"email") }
                        style={{ marginRight: 10 }}
                        required
                    />
                    <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}label="Submit" onClick={handleAdd}></Button>
                    <br /></div> )
    }
    if(valueSelect=="delete"){
        return(<div>
            <FormControl onSubmit={handleDelete}>  
              <TextField
              label="CNPJ"
              variant="filled"
              color="secondary"
              onInput={e=>setgetValue(e.target.value)}
              style={{ marginRight: 10 }}
          />
          <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px',
           minHeight: '30px'}}label="Submit" onClick={handleDelete}></Button></FormControl>
          </div>)
    }
    if(valueSelect=="update"){
           return(  
           
           <div>
             <FormControl onSubmit={handleUpdate}>  
              <TextField
              label="CNPJ"
              variant="filled"
              color="secondary"
              onInput={e=>setgetValue(e.target.value)}
              style={{ marginRight: 10 }}
          />
          </FormControl>
            
          <TextField
                        label="Nome"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "nome") }
                        style={{ marginRight: 10 }}
                    />
                    <TextField
                        label="Senha"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "senha") }
                        style={{ marginRight: 10 }}
                    />
                    <TextField
                        label="Empresa"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "empresa") }
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="CEP"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "CEP") }
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Endereço"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "endereço") }
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Número"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "numero") }
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Telefone"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e, "telefone") }
                        style={{ marginRight: 10 }}
                    />
                     <TextField
                        label="Email"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => handleUpdateForm(e,"email") }
                        style={{ marginRight: 10 }}
                    />
                    <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', 
                    minWidth: '30px', minHeight: '30px'}}label="Submit" onClick={handleUpdate}></Button>

                    <br /></div> )
    }
    if(valueSelect=="get"){
            return(<div>
              <FormControl onSubmit={handleGet}>  
                <TextField
                label="CNPJ"
                variant="filled"
                color="secondary"
                onInput={e=>setgetValue(e.target.value)}
                style={{ marginRight: 10 }}
            />
            <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}label="Submit" onClick={handleGet}></Button></FormControl>
            </div>)
    }
    if(valueSelect=="getAll"){
        return <div></div>
    }
    else{
        return <div></div>
    }
}
const body = () => {

            console.log(item.current);
            console.log("inside body")
        return(
            <div>
                        <DataGrid
                    columns={columns}  
                    autoHeight ={true}
                    rows={test}
                    getRowId={(row) => Math.random()}
                    
                    />
                </div> )
        }
        return(
          
            <>
            <div>
                <div>
                    <div>
                    <Select
                       onChange={handleChange}
                       label={"select"}
                       value={optionsSelect}
                       onOpen={() => {
                              document.querySelector(".MuiModal-backdrop")?.click();
                        }}
                       onClose={() => {
                            setTimeout(() => {
                           document.activeElement.blur();
                             }, 0);
                           }}
                        sx={{
                        "&:hover": {
                            backgroundColor: "#b34b4b"
                        },
                        "&.Mui-focused": {
                            backgroundColor: "#b34b4b"
                        }
                        }}
                    >
                            <MenuItem value={'add'}>Adicionar</MenuItem>
                            <MenuItem value={'delete'}>Deletar por CNPJ</MenuItem>
                            <MenuItem value={"update"}>Modificar empresa</MenuItem>
                            <MenuItem value={"get"}>Consultar por CNPJ</MenuItem>
                            <MenuItem value={"getAll"}>Todas empresas</MenuItem>

                            
                    </Select>
                    </div>
                        {bodySelect()}
                    <div>
                        <div>
                            <div>
                         
                                    <tbody>
                                        {body()}
                                    </tbody>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }


export default Events;
