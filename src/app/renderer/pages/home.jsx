import { useState } from 'react'
import { Nav, Button, Spinner} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



function Home() {
  const [mostrarDados, setMostrarDados] = useState(false);
  const [mostrarCamera, setMostrarCamera] = useState(false);
  const [mostrarVirtual, setMostrarVirtual] = useState(false);

  const aba_dados = () => {
    setMostrarDados(true);
    setMostrarCamera(false);
    setMostrarVirtual(false);
  };

  const aba_camera = () => {
    setMostrarDados(false);
    setMostrarCamera(true);
    setMostrarVirtual(false);
  };

  const aba_virtual = () => {
    setMostrarDados(false);
    setMostrarCamera(false);
    setMostrarVirtual(true);
  };

 const renderizarDados = () => {
  return (
    <div className="p-4 text-white">
      <div className="flex flex-wrap justify-center">
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Concentração de O2</Button>
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Temperatura</Button>
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Iluminação</Button>
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Pressão</Button>
      </div>
    </div>
  );
}
const renderizarCamera = () => {
  return (
    <div className="p-4 text-white">
      <div className="flex flex-wrap justify-center">
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Adicionar bookmark</Button>
        <Button variant="secondary" className="button-nav w-full mb-4 md:mr-2 py-3">Visualizar bookmarks</Button>
      </div>
    </div>
  );
}
  
  return (
    
    <div className='absolute w-full h-full left-0 right-0'  style={{ backgroundColor: '#d9e6fe' }}>

      <div className='Gerbros'>
      <h5>Gerbros</h5>
      </div>


      <div className='loading'>
        <Button variant="primary" disabled>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </Button>{' '}

        <Button variant="primary" disabled>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
        {'  '}carregando...
        </Button>
      </div>


      <div className='button-tela'>
        <Button className='iniciar-rotina' style={{ margin: '10px', backgroundColor: '#E4EEFF', color: 'black' }}>Iniciar rotina</Button>
        <Button className='forca-parada' style={{ margin: '10px', backgroundColor: '#E4EEFF', color: 'black' }}>Forçar Parada</Button>
        <Button className='gerar-relatorio' style={{ margin: '10px', backgroundColor: '#E4EEFF', color: 'black' }}>Gerar Relatório</Button>
      </div>

      
      <div className='absolute w-1/4 h-4/5 left-8 top-8' style={{ backgroundColor: '#044290', borderRadius: '40px', boxShadow: '0 4px 10px rgba(0,0,0,0.6)' }}>
        
        <Nav variant="tabs" className="nav-fill" style={{ backgroundColor: '#E8F1F2' }}  defaultActiveKey="/dados" >
          
          <Nav.Item>
            <Nav.Link className="nav-link-custom" style={{ color: 'black'}} onClick={aba_dados}>
              Dados
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link className="nav-link-custom" style={{ color: 'black'}} onClick={aba_camera}>
              Câmera
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link className="nav-link-custom" style={{ color: 'black'}} onClick={aba_virtual}>
              Virtual
            </Nav.Link>
          </Nav.Item>


        </Nav>

        {mostrarDados && renderizarDados()}

        {mostrarDados && (
          <div className="p-4 text-white">
          </div>
        )}


        {mostrarCamera && renderizarCamera()}

        {mostrarCamera && (
          <div className="p-4 text-white">
          </div>
        )}

        
        {mostrarVirtual && (
          <div className="p-4 text-white">
            <h3>Virtual</h3>
            <p>Informações sobre o ambiente virtual.</p>
          </div>
        )}

      </div>
  
      
    </div>
    
  );
}

export default Home;
