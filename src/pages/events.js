import axios from 'axios';
import { useState, useEffect,setUpdatedState, useRef, useCallback, useReducer } from 'react';
import { NoSsr } from '@mui/base/NoSsr';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from '../components/Button';
import { useButton } from '@mui/base/useButton';
import { Component, setCustomValidity, Alert } from "react";
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
import {useForm} from 'react-hook-form';

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
    { field: 'endereco', headerName: 'Endereço', width: 150 },
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

const [valueSelect, setvalueSelect] = useState('none')
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
const[errorMessage, seterrorMessage] = useState('')
const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nome: '',
            senha:'',
            empresa:'',
            CNPJ:'',
            CEP:'',
            endereco: '',
            numero:'',
            telefone:'',
            email:''
    }
  });

useEffect(() => {

    if(valueSelect=="getAll"){
        getItems();
    }
    if(valueSelect==''){
        getItems();
    }
}, [valueSelect, errorMessage])


const getItems = useCallback(async() => {
    const res =  await axios.get("http://localhost:3005/api/v1/empresa/test");
    console.log(res.data.response);
    console.log(res)
    setTest(res.data.response)
    console.log(test);
})

const handleChangeForm=(e,name)=> {
    const {value}=e.target
    const regExpCNPJ = /^\d{2}\.\d{3}.\d{3}\/\d{4}\-\d{2}$/gm;
    //CEP de 5 digitos e seguido por 3 digitos
    const regExpCEP = /^\d{5}\-\d{3}$/gm;
    //todos caracteres menos especiais
    const regExpEndereco = /^[a-zA-Z]{0,5}$/gm;
    const regExpNumero = /^\d{3}$/gm;
    //telefone 5 digitos '-' e quatro digitos
    const regExpTelefone=/^\d{5}\-\d{4}$/gm;
    //regex for email
    const regExpEmail =/^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gm;
    if(regExpCEP.test(value)){
        console.log("INSIDE CHANGE EVENT")
        setformValue(prevState=>({
            ...prevState,
            [name]: value
          }))
    }
    else{
        let newStr = value.replace(regExpCEP);
        console.log(newStr)
        setformValue(prevState=>({
            ...prevState,
            [name]: newStr
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

  const formValue = {
    nome: watch("nome"),
          senha:watch("senha"),
          empresa:watch("empresa"),
          CNPJ:watch("CNPJ"),
          CEP:watch("CEP"),
          endereco: watch("endereco"),
          numero: watch("numero"),
          telefone:watch("telefone"),
          email:watch("email")
  }
    await axios.patch("http://localhost:3005/api/v1/empresa/CNPJ", {data:formValue})
    .then(res=>{
        console.log("SUCESS UPDATE");
        setformUpdate({

        })
        setvalueSelect('getAll');
    })
    .catch(err=>{
        handleError("Empresa não encontrada")
        setgetValue('')
    })
}
const handleDelete = async (event)=>{

  let createForm = {
      CNPJ: watch("CNPJ")
    }
    await axios.delete("http://localhost:3005/api/v1/empresa/CNPJ", {data:createForm})
    .then(res=>{    
        if(res.status==304){
            seterrorMessage("CNPJ não encontrado");
        }
        setvalueSelect('getAll');
    })
    .catch(err=>{
        handleError("Empresa não encontrada")
        setgetValue('')
    })
}
const handleGet = async (event) => {
    console.log("INSIDE HANDLE GET")
    console.log(watch("CNPJ"))
    console.log(watch("email"))
    const createBody = {
      CNPJ: watch("CNPJ"),
    }
    await axios.post("http://localhost:3005/api/v1/empresa/CNPJ", createBody)
    .then(res=>{   
        console.log("HERE")
        console.log(res);
        setTest(res.data.response)
        console.log(item.current)
    }) 
    .catch(err=>{
        handleError("Empresa não encontrada")
        //setgetValue('')
    }) 
    ;}
const handleError = (error) => {

    seterrorMessage(error);
    alert(error)
    seterrorMessage('')
    
}
const handleSubmit2 = async (data) =>{
    console.log(watch("endereço"));
    
    const formValue = {
      nome: watch("nome"),
            senha:watch("senha"),
            empresa:watch("empresa"),
            CNPJ:watch("CNPJ"),
            CEP:watch("CEP"),
            endereço: watch("endereco"),
            numero: watch("numero"),
            telefone:watch("telefone"),
            email:watch("email")
    }

    await axios.post("http://localhost:3005/api/v1/empresa/test",formValue)
    .then(res=>{    
        console.log("HERE")
        console.log('success')
        setvalueSelect('getAll');
    })
    .catch(err=>{
        console.log(err)
    })    
}

const bodySelect = () =>{
    if(valueSelect=="add"){
      return (        
      <div>
      <form onSubmit={handleSubmit((data) => handleSubmit2(data))}>
      <TextField
            {...register("nome")}
            id="nome"
            name="nome"
            type="nome"
            label="Nome"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.nome && dirtyFields.nome && "!bg-green-50"
            }`}
          />
        
        <span>{errors.nome?.message}</span>
        <TextField
            {...register("senha")}
            id="senha"
            name="senha"
            type="senha"
            label="Senha"
            required
            autoComplete="off"
            
          />
          <TextField
            {...register("empresa")}
            id="empresa"
            name="empresa"
            type="empresa"
            label="Empresa"
            required
            autoComplete="off"
            
          />
          <TextField
            {...register("CNPJ", {
              pattern: {
                value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/,
                message: "Por favor, use o formato XX.XXX.XXX/XXXX-XX"
              }
            })}
            id="CNPJ"
            name="CNPJ"
            type="CNPJ"
            label="CNPJ"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.CNPJ && dirtyFields.CNPJ && "!bg-green-50"
            }`}
          />
          <span>{errors.CNPJ?.message}</span>
          <TextField
            {...register("CEP", {
              pattern: {
                value: /^[0-9]{5}\-[0-9]{3}$/,
                message: "Por favor, use o formato XXXXX-XXX"
              }
            })}
            id="CEP"
            name="CEP"
            type="CEP"
            label="CEP"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.CEP && dirtyFields.CEP && "!bg-green-50"
            }`}
          />
                  <span>{errors.CEP?.message}</span>

          <TextField
            {...register("endereco", {
              pattern: {
                value: /^[a-zA-Z]{0,5}$/,
                message: "Por favor, escreva até 5 letras no formato XXXXX"
              }
            })}
            id="endereco"
            name="endereco"
            type="endereco"
            label="Endereço"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.endereço && dirtyFields.endereço && "!bg-green-50"
            }`}
          />
          <span>{errors.endereço?.message}</span>

          <TextField
            {...register("numero", {
              pattern: {
                value: /^[0-9]{3}$/,
                message: "Por favor, use o formato XXX"
              }
            })}
            id="numero"
            name="numero"
            type="numero"
            label="numero"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.numero && dirtyFields.numero && "!bg-green-50"
            }`}
          />
          <span>{errors.numero?.message}</span>

          <TextField
            {...register("telefone", {
              pattern: {
                value: /^[0-9]{5}\-[0-9]{4}$/,
                message: "Por favor, use o formato XXXXX-XXXX"
              }
            })}
            id="telefone"
            name="telefone"
            type="telefone"
            label="Telefone"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.telefone && dirtyFields.telefone && "!bg-green-50"
            }`}
          />
          <span>{errors.telefone?.message}</span>
       
          <TextField
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Por favor, escreva um email válido"
              }
            })}
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.email && dirtyFields.email && "!bg-green-50"
            }`}
          />
          <span>{errors.email?.message}</span>

        <Button style={{ display: "block" }} onClick={handleSubmit2}>submit</Button>
    </form> </div>)
    }
    if(valueSelect=="delete"){
      return(<div>
        <form onSubmit={handleSubmit((data)=>handleDelete(data))}>  
        <TextField
      {...register("CNPJ", {
        pattern: {
          value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/,
          message: "Por favor, use o formato XX.XXX.XXX/XXXX-XX"
        }
      })}
      id="CNPJ"
      name="CNPJ"
      type="CNPJ"
      label="CNPJ"
      required
      autoComplete="off"
      className={`input w-full ${
        !errors.CNPJ && dirtyFields.CNPJ && "!bg-green-50"
      }`}
    />
    <span>{errors.CNPJ?.message}</span>
      
      <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}label="Submit">Submit</Button></form>
      </div>)
    }
    if(valueSelect=="update"){
      return (        
        <div>
        <form onSubmit={handleSubmit((data) => handleUpdate(data))}>
        <TextField
              {...register("nome")}
              id="nome"
              name="nome"
              type="nome"
              label="Nome"
              
              autoComplete="off"
              className={`input w-full ${
                !errors.nome && dirtyFields.nome && "!bg-green-50"
              }`}
            />
          
          <span>{errors.nome?.message}</span>
          <TextField
              {...register("senha")}
              id="senha"
              name="senha"
              type="senha"
              label="Senha"
              
              autoComplete="off"
              
            />
            <TextField
              {...register("empresa")}
              id="empresa"
              name="empresa"
              type="empresa"
              label="Empresa"
              required
              autoComplete="off"
              
            />
            <TextField
              {...register("CNPJ", {
                pattern: {
                  value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/,
                  message: "Por favor, use o formato XX.XXX.XXX/XXXX-XX"
                }
              })}
              id="CNPJ"
              name="CNPJ"
              type="CNPJ"
              label="CNPJ"
              required
              autoComplete="off"
              className={`input w-full ${
                !errors.CNPJ && dirtyFields.CNPJ && "!bg-green-50"
              }`}
            />
            <span>{errors.CNPJ?.message}</span>
            <TextField
              {...register("CEP", {
                pattern: {
                  value: /^[0-9]{5}\-[0-9]{3}$/,
                  message: "Por favor, use o formato XXXXX-XXX"
                }
              })}
              id="CEP"
              name="CEP"
              type="CEP"
              label="CEP"
              
              autoComplete="off"
              className={`input w-full ${
                !errors.CEP && dirtyFields.CEP && "!bg-green-50"
              }`}
            />
                    <span>{errors.CEP?.message}</span>
  
            <TextField
              {...register("endereco", {
                pattern: {
                  value: /^[a-zA-Z]{0,5}$/,
                  message: "Por favor, escreva até 5 letras no formato XXXXX"
                }
              })}
              id="endereco"
              name="endereco"
              type="endereco"
              label="Endereço"
              
              autoComplete="off"
              className={`input w-full ${
                !errors.endereço && dirtyFields.endereço && "!bg-green-50"
              }`}
            />
            <span>{errors.endereço?.message}</span>
  
            <TextField
              {...register("numero", {
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: "Por favor, use o formato XXX"
                }
              })}
              id="numero"
              name="numero"
              type="numero"
              label="numero"
              
              autoComplete="off"
              className={`input w-full ${
                !errors.numero && dirtyFields.numero && "!bg-green-50"
              }`}
            />
            <span>{errors.numero?.message}</span>
  
            <TextField
              {...register("telefone", {
                pattern: {
                  value: /^[0-9]{5}\-[0-9]{4}$/,
                  message: "Por favor, use o formato XXXXX-XXXX"
                }
              })}
              id="telefone"
              name="telefone"
              type="telefone"
              label="Telefone"
              required
              autoComplete="off"
              className={`input w-full ${
                !errors.telefone && dirtyFields.telefone && "!bg-green-50"
              }`}
            />
            <span>{errors.telefone?.message}</span>
         
            <TextField
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Por favor, escreva um email válido"
                }
              })}
              id="email"
              name="email"
              type="email"
              label="Email"
              
              autoComplete="off"
              className={`input w-full ${
                !errors.email && dirtyFields.email && "!bg-green-50"
              }`}
            />
            <span>{errors.email?.message}</span>
  
          <Button style={{ display: "block" }} onClick={handleUpdate}>submit</Button>
      </form> </div>)
    }
    if(valueSelect=="get"){
            return(<div>
              <form onSubmit={handleSubmit((data)=>handleGet(data))}>  
              <TextField
            {...register("CNPJ", {
              pattern: {
                value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/,
                message: "Por favor, use o formato XX.XXX.XXX/XXXX-XX"
              }
            })}
            id="CNPJ"
            name="CNPJ"
            type="CNPJ"
            label="CNPJ"
            required
            autoComplete="off"
            className={`input w-full ${
              !errors.CNPJ && dirtyFields.CNPJ && "!bg-green-50"
            }`}
          />
          <span>{errors.CNPJ?.message}</span>
            
            <Button type="submit" style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}label="Submit">Submit</Button></form>
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
                       value={valueSelect}
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
                    >     <MenuItem value="none" disabled hidden>Selecione uma opção</MenuItem>
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
