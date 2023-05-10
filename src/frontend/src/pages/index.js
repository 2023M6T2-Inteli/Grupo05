import Image from 'next/image'
import { Inter } from 'next/font/google'
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div className='absolute w-full h-full left-0 right-0 bg-white'>
      <div className='absolute w-1/4 h-4/5 left-8 top-8 rounded-xl   bg-blue-500'>
         <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="link-1">Dados</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="link-2">Câmera</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey="link-3">Virtual</Nav.Link>
          </Nav.Item>
        </Nav>
        
      </div>  
     
    </div>
  )
}
