import React from "react";
import background from "./../img/frontimg.jpg"
import { Component } from "react";
import { AspectRatio } from 'react-aspect-ratio';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ImagemPrincipal from "../components/imagemPrincipal";

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };
  
  const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'secondary.main',
    fontWeight: 'medium',
  };
  
  const image = {
    height: 55,
    my: 4,
  };
const About = () => {
    return (
        <>

        <ImagemPrincipal>

        </ImagemPrincipal>

    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          Demo para Energizou
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
               
                <Typography variant="h5" align="center">
                    Leia as instruções no README do github e então faça sign-up                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                
                <Typography variant="h5" align="center">
                  Faça seu login e acesse a página Demo na barra de navegação.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
               
                <Typography variant="h5" align="center">
                  {'Realize as operações CRUD no menu que aparecerá'}
                  
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/sign-up/"
          sx={{ mt: 8 }}
        >
          Começar
        </Button>
      </Container>
    </Box>
  

    </>
    );
};
 
export default About;