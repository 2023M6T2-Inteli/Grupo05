import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import Navbar from './components/Navbar';


function ResponsiveAppBar() {
  //-----------------------Funções usadas para o Dropdown
  const [mapa, setMapa] = React.useState('');

  const handleChange = (event) => {
    setMapa(event.target.value);
  }; 

  //-------------------------------Função usada para o Backdrop
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);

  const settingsRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setOpenSettings(false);
    }

    if (mapRef.current && !mapRef.current.contains(event.target)) {
      setOpenMap(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  return (
    <div className='bg-white'>

      <Navbar />

        <div className='flex flex-row p-4'>
            <div className='flex flex-col w-60 space-y-5 p-4'>

            <div>
              <Button variant="contained" startIcon={<SettingsIcon />} onClick={handleOpenSettings}>Configurações</Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openSettings}
                onClick={handleClickOutside}>
                  <div ref={settingsRef} className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3'>
                      <Button variant="link" startIcon={<SettingsIcon />} disable>Configurações</Button>
                      <FormGroup className='space-y-2'>
                        <FormControlLabel control={<Switch defaultChecked />} label="Baixar Relatório Automaticamente" />
                        <FormControlLabel control={<Switch defaultChecked/>} label="Modo de Acessibilidade" />
                        <FormControlLabel control={<Switch defaultChecked/>} label="Modo Escuro" />
                        <FormControlLabel control={<Switch defaultChecked/>} label="Notificações do Robô" />
                      </FormGroup>
                  </div>
              </Backdrop>
            </div>

            <div>
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenMap}>Adicionar Mapa</Button>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openMap}
                onClick={handleClickOutside}>
                  <div ref={mapRef}className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3'>
                      <Button variant="link" startIcon={<AddIcon />} disable>Adicionar Mapa</Button>
                      <input type="file" className="w-full h-full border-none" />
                  </div>
              </Backdrop>
            </div>
            

            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mapas</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mapa}
                label="Mapa"
                onChange={handleChange}
                >
                <MenuItem value={10}>Mapa 1</MenuItem>
                <MenuItem value={20}>Mapa 2</MenuItem>
                </Select>
            </FormControl>
            </Box>
            </div>

        <div className='flex flex-col w-full border h-screen border-gray-800 justify-center items-center bg-white rounded-lg shadow-md'>
        </div>
        </div>
    </div>
  );
}
export default ResponsiveAppBar;