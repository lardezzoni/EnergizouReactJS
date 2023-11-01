import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import {CiLinkedin} from 'react-icons/ci';
import {GrGithub} from 'react-icons/gr'
const footerTheme = createTheme({
  palette: {
    primary: {
        main: '#FF5733',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
    secondary: {
        main: '#E0C2FF',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
  },
});
function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://github.com/lardezzoni">
        Luiz Ardezzoni
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];
 
const Footer = () => {
    return (
    
        <Typography
        component="footer"
        sx={{ display: 'flex', bgcolor: "#d3d3d3" }}
      >
        <Container sx={{ my: 8, display: 'flex' }}>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                spacing={2}
                sx={{ height: 120 }}
              >
                <Grid item sx={{ display: 'flex' }}>
                   <a href= "https://github.com/lardezzoni">
                   <GrGithub size='40'/>
                   </a>
                  <a href="https://www.linkedin.com/in/luiz-henrique-ardezzoni-a8b71582/">
               
                  <CiLinkedin size="40"/>
                    </a>
                </Grid>
                <Grid item>
                  <Copyright />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" marked="left" gutterBottom>
                Legal
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/premium-themes/onepirate/terms/">Terms</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
                </Box>
              </Box>
            </Grid>

            
          </Grid>
        </Container>
      </Typography>
    );
};
export default Footer;