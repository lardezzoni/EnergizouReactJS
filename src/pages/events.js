import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Select from '@mui/material/Select';

import Box from "@mui/material/Box";
import Button from '../components/Button';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField } from "@mui/material"; 
import MenuItem from '@mui/material/MenuItem';
import {useForm} from 'react-hook-form';
import Grid from '@mui/material/Grid';


const columns: GridColDef[] = [
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'senha', headerName: 'Senha', width: 150 },
    { field: 'empresa', headerName: 'Empŕesa', width: 150 },
    { field: 'CNPJ', headerName: 'CNPJ', width: 150 },
    { field: 'CEP', headerName: 'CEP', width: 150 },
    { field: 'endereco', headerName: 'Endereço', width: 150 },
    { field: 'numero', headerName: 'Número', width: 100 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 }
  ];

  
const Events = () => {

let item = useRef([])

const [valueSelect, setvalueSelect] = useState('none')

const [test, setTest] = useState([])

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

    if(valueSelect==="getAll"){
        getItems();
    }
    if(valueSelect===''){
        getItems();
    }
}, [valueSelect, errorMessage])


const getItems = async() => {
    const res =  await axios.get("http://localhost:3005/api/v1/empresa/test");
    
    setTest(res.data.response)
   
}



const handleChange = (event) => {
    setvalueSelect(event.target.value);
  };


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
        
        setvalueSelect('getAll');
    })
    .catch(err=>{
        handleError("Empresa não encontrada")
    })
}
const handleDelete = async (event)=>{

  let createForm = {
      CNPJ: watch("CNPJ")
    }
    await axios.delete("http://localhost:3005/api/v1/empresa/CNPJ", {data:createForm})
    .then(res=>{    
        if(res.status===304){
            seterrorMessage("CNPJ não encontrado");
        }
        setvalueSelect('getAll');
    })
    .catch(err=>{
        handleError("Empresa não encontrada")
    })
}
const handleGet = async (event) => {
    

    const createBody = {
      CNPJ: watch("CNPJ"),
    }
    await axios.post("http://localhost:3005/api/v1/empresa/CNPJ", createBody)
    .then(res=>{   
        
        setTest(res.data.response)
    }) 
    .catch(err=>{
        handleError("Empresa não encontrada")

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
    if(valueSelect==="add"){
      return (        
      <div>
      <form onSubmit={handleSubmit((data) => handleSubmit2(data))}>
      <Box ml={4} pt={2}> 
      <Grid item xs={12} sm={6} spacing={2}>

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
                value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
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
      </Grid>
      <br/>
      <span>{errors.CNPJ?.message}</span>
      <br/>

      <br/>
      <Grid item xs={12} sm={6} spacing={2}>

          <TextField
            {...register("CEP", {
              pattern: {
                value: /^[0-9]{5}-[0-9]{3}$/,
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

          <TextField
            {...register("telefone", {
              pattern: {
                value: /^[0-9]{5}-[0-9]{4}$/,
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
        </Grid>
        <br/>
        <span>{errors.CEP?.message}</span>

        <span>{errors.endereco?.message}</span>

        <span>{errors.numero?.message}</span>
        <span>{errors.telefone?.message}</span>

          <span>{errors.email?.message}</span>
            <br/>
            <br/>
          <Button color='secondary'sx={{border:"2px solid"}}type="submit" label="Submit" onClick={handleSubmit}>Submit</Button>
          </Box>
    </form> </div>)
    }
    if(valueSelect==="delete"){
      return(<div>
        <form onSubmit={handleSubmit((data)=>handleDelete(data))}>
        <Box ml={4} pt={2} > 
        <Grid item xs={12} sm={6} spacing={2}>
        <TextField
      {...register("CNPJ", {
        pattern: {
          value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
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
    <br/>
    <span>{errors.CNPJ?.message}</span>
    <br/>
    <Button color='secondary'sx={{border:"2px solid"}}type="submit" label="Submit">Submit</Button>
      </Grid>
      </Box>

      </form>
      </div>)
    }
    if(valueSelect==="update"){
      return (        
        <div>
        <form onSubmit={handleSubmit((data) => handleUpdate(data))}>
        <Box ml={4} pt={2} > 
        <Grid item xs={12} sm={6} spacing={2}>

        <TextField
              {...register("CNPJ", {
                pattern: {
                  value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
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
            </Grid>
               <br/>

      <span>{errors.CNPJ?.message}</span>
              <br/>
            <br/>
      <Grid item xs={12} sm={6} spacing={2}>
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
              {...register("CEP", {
                pattern: {
                  value: /^[0-9]{5}-[0-9]{3}$/,
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
             </Grid>
      <br/>
      <span>{errors.CEP?.message}</span>
      <br/>

      <br/>
      <Grid item xs={12} sm={6} spacing={2}>
            
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
  
            <TextField
              {...register("telefone", {
                pattern: {
                  value: /^[0-9]{5}-[0-9]{4}$/,
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
            </Grid>
        <br/>

        <span>{errors.endereco?.message}</span>

        <span>{errors.numero?.message}</span>
        <span>{errors.telefone?.message}</span>

          <span>{errors.email?.message}</span>
            <br/>
            <br/>
            <Button color='secondary'sx={{border:"2px solid"}}type="submit" label="Submit" onClick={handleSubmit}>Submit</Button>
          </Box>
      </form> </div>)
    }
    if(valueSelect==="get"){
            return(<div>
              <form onSubmit={handleSubmit((data)=>handleGet(data))}>  
              <Box ml={4} pt={2} > 
        <Grid item xs={12} sm={6} spacing={2}>
              <TextField
            {...register("CNPJ", {
              pattern: {
                value: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
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
              <br/>

          <span>{errors.CNPJ?.message}</span>
          <br/>
            
          <Button color='secondary'sx={{border:"2px solid"}}type="submit" label="Submit">Submit</Button>
          </Grid>
          </Box>
            </form>
            </div>)
    }
    if(valueSelect==="getAll"){
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
              <Box ml={4} pt={2} b={10} > 
                      <DataGrid
                    columns={columns}  
                    autoHeight ={true}
                    rows={test}
                    sx={{width: "100%",
                   "& .MuiDataGrid-columnHeader":{
                      color: "#ffffff",
                      backgroundColor:"#000000"
                    },
                  }}
                  
                    getRowId={(row) => Math.random()}
                    
                    />
              </Box>
                </div> )
        
}
        return(
          
            <>
            <div>
                <div>
                    <div>
                    <Box ml={4} pt={2} > 

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
                  </Box>
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
