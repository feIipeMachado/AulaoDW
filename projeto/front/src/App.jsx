import { useState } from "react"
import { Auth } from "./Auth/Auth"
import axios from 'axios';



function Autenticar({onAutenticado}) {
  const [carregando, setCarregando] = useState(false)
  
  const handleSubmit = (event) => {
    const {usuario, senha} = event.target;
    axios.post('http://localhost:3000/auth', {
      usuario: usuario.value,
      senha: senha.value
    }).then(({data}) => {
        setCarregando(false);
        onAutenticado(data)
    })
    .catch()
    
  }


  return (
    <Auth
      carregando={carregando}
      onSubmit={handleSubmit}
    />
  )
}

function App() {
  const[page, setPage] = useState('auth');
  const[token, setToken] = useState(null);

  const handleOnAutenticado = () => {
    setPage('home');
    setToken(token)
  }

    
  const handleOnSair = () => {
    setPage('auth');
    setToken(null);
  }
  return (
      <div>
      {
        page === 'auth' && <Autenticar onAutenticado={handleOnAutenticado}/>
      }
      {
        page === 'home' && <div>
          <h4>Usuário autenticado</h4>
          <button onClick={handleOnSair}>Sair</button>
        </div>
      }
      
      </div>
    )
}

export default App
