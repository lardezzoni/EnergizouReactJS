import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ImagemLayout from './imagemLayout';

const backgroundImage =
  'https://plus.unsplash.com/premium_photo-1678743133495-49199baeb582?auto=format&fit=crop&w=1400';

export default function ImagemPrincipal() {
  return (
    <ImagemLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
                Desafio Energizou 
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        Website criado com NodeJS, ReactJS e MongoDB (NoSQL)
      </Typography>
      
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Desenvolvido por Luiz Ardezzoni
      </Typography>
    </ImagemLayout>
  );
}