import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';

class Component extends React.Component {
    
    map_name = 'Planta 1 - Duto 174-2';
    height = 20;
    width = 23;


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
                        <InputLabel sx={{color: '#fff', marginLeft: '3px', marginY: '7px'}}>Mapa: {this.map_name}</InputLabel>
                    </Grid>
                
               
                    <Grid item xs={'auto'}>
                        <InputLabel sx={{color: '#fff', marginLeft: '3px'}}>Dimensões: </InputLabel>
                        <InputLabel sx={{color: '#fff', marginLeft: '3px'}}>Altura: {this.height}</InputLabel>
                        <InputLabel sx={{color: '#fff', marginLeft: '3px'}}>Largura: {this.width}</InputLabel>
                    </Grid>
    

                    <Grid item xs={9} sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        
                        <InputLabel sx={{color: '#fff', alignContent: 'center', marginLeft: '3px' }}>N° de divisões:</InputLabel>

                        <Grid item xs={2}>
                        <TextField variant="standard" sx={{backgroundColor: 'primary.dark', marginLeft: '7px', color: '#fff'}}/>
                        </Grid>
                        
                    </Grid>

               
                    <Grid container spacing={1}></Grid>

                    <Grid item xs={3}>
                    <img src="../../../images/turtlebot3-simulation3.png" alt="Robot"/>
                    </Grid>

                
                    <Grid item xs={3}>
                        <TextField id="x-origin" label="X" variant="outlined"  sx={{backgroundColor: '#fff', borderRadius: '7px', marginTop: '12px', marginRight: '5px'}} size='small'/>
                        <TextField id="y-origin" label="Y" variant="outlined" sx={{backgroundColor: '#fff', borderRadius: '7px', marginTop: '13px', marginRight: '5px'}} size='small'/>
                    </Grid>

                    <Grid item xs={3}>
                       <img src='C:\Users\filip\OneDrive\Documentos\Inteli\Grupo05\media\delivery.png' alt='Target icon' />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="x-destiny" label="X" variant="outlined" sx={{backgroundColor: '#fff', borderRadius: '7px', marginTop: '12px', marginRight: '5px'}} size='small'/>
                        <TextField id="y-destiny" label="Y" variant="outlined" sx={{backgroundColor: '#fff', borderRadius: '7px', marginTop: '13px', marginRight: '5px'}} size='small'/>
                    </Grid>
                </Grid>
            </Box>
        );
    }
};

export default Component;