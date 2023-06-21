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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import ViewWindow from './components/ViewWindow';
import PostButton from './components/PostButton';
import Component from './components/InputMap';
import axios from 'axios';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";
import {Data} from '../utils/Data';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WebSocket from './components/Websocket';

Chart.register(CategoryScale);

function ResponsiveAppBar() {

  function loadComponent(){
    if (mostrarCamera) {
      return <WebSocket />;
    }

    else if (mostrarDados){
      return <LineChart chartData={chartData} />;
    }

    else if (mostrarMapa){
      return <ViewWindow className='w-full h-full' filename={filename} />;
    }

    else {
      return <div>Escolha uma aba</div>
    }
  };

  const [chartData, setChartData] = React.useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "white",
        borderWidth: 1
      }
    ]
  });

  let filename = null;
  // const video_1 = require('./aaa.mp4');
  const pages = ['Mapas', 'Dados', 'Câmeras'];
  const settings = ['Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mostrarMapa, setMostrarMapa] = React.useState(false);
  const [mostrarDados, setMostrarDados] = React.useState(false);
  const [mostrarCamera, setMostrarCamera] = React.useState(false);
  const [mapa, setMapa] = React.useState('');
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openMap, setOpenMap] = React.useState(false);

  const settingsRef = React.useRef(null);
  const mapRef = React.useRef(null);

  const handleChange = (event) => {
    setMapa(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

    if (videoRef.current && !videoRef.current.contains(event.target)) {
      setOpenVideo(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMapasButtonClick = (page) => {
    console.log(`Clicou na página: ${page}`);
    console.log('buuu mapas!');
    setMostrarMapa(true);
    setMostrarDados(false);
    setMostrarCamera(false);
    setOpenMap(false);
  };

  const handleDadosButtonClick = (page) => {
    console.log(`Clicou na página: ${page}`);
    console.log('buuu dados!')
    setMostrarMapa(false); 
    setMostrarDados(true); 
    setMostrarCamera(false);
    setOpenMap(false);
  };
  
  const handleCamerasButtonClick = (page) => {
    console.log(`Clicou na página: ${page}`);
    console.log('buuu cameras!')
    setMostrarMapa(false); 
    setMostrarDados(false); 
    setMostrarCamera(true);
    setOpenMap(false);
  };
//________________________________________________________Upload de imagem________________________________________________________
  const handleFileUpload = (event) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const encodedImage = reader.result.split(',')[1]; // Extrai apenas a parte base64 da string
        const formData = new FormData();
        formData.append('imagem', encodedImage);
        const imagem = {
          "imagem": formData.get('imagem').toString(),
        }
        console.log(imagem);

        fetch('http://localhost:3000/salvar-imagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          //  body: JSON.stringify({ "image": formData.get('image').toString()}),
          body: JSON.stringify(imagem),
        })
        .then((response) => response.json())
        .then((data) => {
          filename = data.file;
          console.log(data); // Resultado da requisição

          // Após a conclusão da primeira rota, fazer a chamada para a segunda rota
          axios.get('http://localhost:3000/test/' + data.file)
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Resultado da segunda rota
            console.log('Imagem salva com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao fazer a chamada para a segunda rota:', error);
          });
        })
        .catch((error) => {
          console.error('Erro ao enviar o formulário:', error);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const [videos, setVideos] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState('');

  React.useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/videos');
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error('Erro ao buscar a lista de vídeos:', error);
      }
    };

    fetchVideos();
  }, []);

  //______________________________________________________BackDrop (Kil e Alysson)______________________________________________________

  const Chamada = (event) => {
    setSelectedVideo(event.target.value);
    handleOpenVideo();
  };

  const [openVideo, setOpenVideo] = React.useState(false);
  const videoRef = React.useRef(null);

  const handleOpenVideo = () => {
    setOpenVideo(!openVideo);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
  <div className='style{{background: #E8F1F2}}'> {/*background central*/}

    {/*Início da Navbar*/}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="a" href="/" sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              GERBROS
            </Typography>
  

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
  
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <Button onClick={() => handleMapasButtonClick('Mapas')} sx={{ my: 1, color: 'grey', display: 'block' }}>
                  Mapas
                </Button>
                <Button onClick={() => handleDadosButtonClick('Dados')} sx={{ my: 1, color: 'grey', display: 'block' }}>
                  Dados
                </Button>
                <Button onClick={() => handleCamerasButtonClick('Câmeras')} sx={{ my: 1, color: 'grey', display: 'block' }}>
                  Câmeras
                </Button>
              </Menu>
            </Box>
  
            <Typography variant="h5" noWrap component="a" href="" sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
              GERBROS
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={() => handleMapasButtonClick('Mapas')} sx={{ my: 2, color: 'white', display: 'block' }}>
                Mapas
              </Button>
              <Button onClick={() => handleDadosButtonClick('Dados')} sx={{ my: 2, color: 'white', display: 'block' }}>
                Dados
              </Button>
              <Button onClick={() => handleCamerasButtonClick('Câmeras')} sx={{ my: 2, color: 'white', display: 'block' }}>
              Câmeras
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/*final da Navbar*/}

    <div className='flex flex-row p-4'>

      {mostrarMapa && (
        <div className='flex flex-col w-60 space-y-5 p-4'> {/*background responsável pelos botões do lado */}
          <div>
            <Button variant="contained" startIcon={<SettingsIcon/>} onClick={handleOpenSettings}>Configurações</Button>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openSettings} onClick={handleClickOutside}>
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

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openMap} onClick={handleClickOutside}>

            <div ref={mapRef} className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3'>
                  <Button variant="link" startIcon={<AddIcon />} disable>
                    Adicionar Mapa
                  </Button>
                    <input type="file" className="w-full h-full border-none" onChange={handleFileUpload}/>
            </div>

            </Backdrop>

          </div>
          
          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Mapas</InputLabel>

              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={mapa} label="Mapa" onChange={handleChange}>
                <MenuItem value={10}>Mapa 1</MenuItem>
                <MenuItem value={20}>Mapa 2</MenuItem>
              </Select>

            </FormControl>

          </Box>

          <Component className='w-full'></Component>

          <PostButton></PostButton>

        </div>
      )}



      {mostrarDados && (
        <div className='flex flex-col w-60 space-y-5 p-4'>
          <div>

            <Button variant="contained" startIcon={<SettingsIcon/>} onClick={handleOpenSettings}>Configurações</Button>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openSettings} onClick={handleClickOutside}>
              <div ref={settingsRef} className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3'>

                <Button variant="link" startIcon={<SettingsIcon />} disable>Configurações</Button>
                <FormGroup className='space-y-2'>
                  <FormControlLabel control={<Switch defaultChecked/>} label="Baixar Relatório Automaticamente" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Modo de Acessibilidade" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Modo Escuro" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Notificações do Robô" />
                </FormGroup>

              </div>
            </Backdrop>
          </div>


          <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Dados</InputLabel>

              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={mapa} label="Mapa" onChange={handleChange}>
                <MenuItem value={10}>Planta 1 - Duto 2</MenuItem>
                <MenuItem value={20}>Planta 2 - Duto 3</MenuItem>
                <MenuItem value={20}>Planta 13 - Silo 3</MenuItem>
                <MenuItem value={20}>Planta 9 - Bueiro 11</MenuItem>
              </Select>

            </FormControl>

          </Box>

          <PostButton></PostButton>

        </div>
      )}

      {mostrarCamera && (
        <div className='flex flex-col w-60 space-y-5 p-4'>
          <div>

            <Button variant="contained" startIcon={<SettingsIcon/>} onClick={handleOpenSettings}>Configurações</Button>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openSettings} onClick={handleClickOutside}>
              <div ref={settingsRef} className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3'>

                <Button variant="link" startIcon={<SettingsIcon />} disable>Configurações</Button>
                <FormGroup className='space-y-2'>
                  <FormControlLabel control={<Switch defaultChecked/>} label="Baixar Relatório Automaticamente" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Modo de Acessibilidade" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Modo Escuro" />
                  <FormControlLabel control={<Switch defaultChecked/>} label="Notificações do Robô" />
                </FormGroup>

              </div>
            </Backdrop>
          </div>

          <div>
              <p>Selecione um vídeo:</p>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="video-select-label">Vídeo</InputLabel>
                  <Select
                    labelId="video-select-label"
                    id="video-select"
                    value={selectedVideo}
                    onChange={Chamada}
                    onClick={handleOpenVideo}
                  >
                    {videos.length === 0 ? (
                      <MenuItem disabled>Nenhum vídeo disponível</MenuItem>
                    ) : (
                      videos.map((video, index) => (
                        <MenuItem key={index} value={video}>
                          {video}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Box>
              <div>

                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openVideo} onClick={handleClickOutside}>
                  <div ref={videoRef} className='flex flex-col justify-center items-center bg-slate-600 rounded-lg shadow-md p-4 space-y-3 h-3/4 w-3/4'>
                    <Button variant="link" startIcon={<PlayArrowIcon />} disable>Videos</Button>
                    {openVideo ?(
                      <video controls autoPlay loop>
                      <source src={selectedVideo}/>
                    </video>):
                    (
                    <div>
                      <h1>Loading...</h1>
                    </div>
                    )};
                  </div>
                </Backdrop>

              </div>

            </div>

          <PostButton></PostButton>

        </div>
      )}
      

          <div className='flex flex-col w-full h-full border h-screen border-gray-800 justify-center items-center bg-black rounded-lg shadow-md'>
            {loadComponent()}
          </div>
      </div>
  </div>

);
}
export default ResponsiveAppBar;