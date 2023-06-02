import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

class Component extends React.Component {
    
    map_name = 'Planta 1 - Duto 174-2';
    height = 20;
    width = 20;

    state = {
        divisions: 1,
        x: 0,
        y: 0,
    };
    
    handleInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    render() {
        return (
            <Box
                sx={{
                    width: 190,
                    height: 300,
                    backgroundColor: 'primary.dark',
                    borderRadius: 2,
                }}
            >
                <Grid container spacing={1}>
                <Grid item xs={12}>
                    <InputLabel sx={{color: '#fff'}}>Mapa: {this.map_name}</InputLabel>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel sx={{color: '#fff'}}>Dimensões:</InputLabel>
                    <InputLabel sx={{color: '#fff'}}>Altura {this.height}</InputLabel>
                    <InputLabel sx={{color: '#fff'}}>Largura {this.width}</InputLabel>
                </Grid>
    
                <Grid item xs={9} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                    <img src='' alt='' />
                    <InputLabel sx={{color: '#fff', alignContent: 'center', margin: 'auto'}}>N° de divisões</InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="divisions" label="N° de divisões" variant="outlined" sx={{backgroundColor: '#fff'}}/>
                </Grid>
    
                <Grid item xs={3}>
                    <img src='C:\Users\filip\OneDrive\Documentos\Inteli\Grupo05\media\delivery.png' alt='Robot icon' />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="x-origin" label="X" variant="outlined" sx={{backgroundColor: '#fff'}} size='small'/>
                    <TextField id="y-origin" label="Y" variant="outlined" sx={{backgroundColor: '#fff'}} size='small'/>
                </Grid>
                <Grid item xs={3}>
                    <img src='C:\Users\filip\OneDrive\Documentos\Inteli\Grupo05\media\delivery.png' alt='Target icon' />
                </Grid>
                <Grid item xs={3}>
                    <TextField id="x-destiny" label="X" variant="outlined" sx={{backgroundColor: '#fff'}} size='small'/>
                    <TextField id="y-destiny" label="Y" variant="outlined" sx={{backgroundColor: '#fff'}} size='small'/>
                </Grid>
                </Grid>
            </Box>
        );
    }
};

export default Component;