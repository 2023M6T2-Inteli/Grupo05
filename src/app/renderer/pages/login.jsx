import * as React from 'react';
import { useRouter } from 'next/router';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Link from 'next/link';

function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Função para lidar com o envio do formulário de login
  const handleLogin = (event) => {
    event.preventDefault();
    // Realize a lógica de autenticação aqui

    // Redirecione para a página de início após o login bem-sucedido
    router.push('/inicio');
    
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md p-4">
          <Image src="/image/gerdau-removebg-preview.png" alt="Logo GERDAU" width={150} height={150} />

          <h3 className="text-left">Bem-Vindo</h3>

          <p>Digite os dados de Login para ter acesso:</p>

          <div>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-helper">Profiler</InputLabel>
              <Input id="component-helper" aria-describedby="component-helper-text" />
              <FormHelperText id="component-helper-text">
                Não compartilhe seus dados.
              </FormHelperText>
            </FormControl>
            
            <br />
            <br />

            <FormControl variant="standard" className="w-full">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <br />
          </div>

          <div className="mt-8">
            <Button variant="contained" onClick={handleLogin}>
              <Link href="/inicio">Acessar</Link>
            </Button>
          </div>

        </div>
      </div>

      <footer className="bg-blue-500 w-full h-12 flex items-center justify-center p-3" style={{ marginTop: '-3rem' }}>
        <Image src="/image/gg.png" alt="Logo GERDAU GG" width={60} height={35} style={{ right: '70' }} />
      </footer>

    </div>
  );
}

export default Login;