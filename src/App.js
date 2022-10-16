

// import para estados das const
import { useState } from 'react';

// import do icone da lupa
import { FiSearch} from 'react-icons/fi';

//import estilização propria
import './estilo.css';

// import api com a URL padrao do via cep, possibilitando a busca na api deles !! 
import api from './services/api'

function App() {

  // const que guarda o valor inserido pelo usuario 
  const [input, setInput] = useState('');

  // const que guarda o retorno da api 
  const[cep, setCep] = useState({});

  // funcao assincrona que leva o cep e tras os dados da api viacep
  async function buscarCep(){

    // validação se esta vazio o campo 
    if(input == ''){
      alert('Preencha o campo ! ')
      return
    }
  
    
    try{

      // usa a const API , que contem a base de url para fazer a busca na via cep 
      // logo apos insere dois valores complementando, o (input) - valor inserido pelo usuario
      // (input)/json , trata como json esse retorno da api
      const response = await api.get(`${input}/json`);

      // response.DATA , é aonde fica guardado as informaçoes que eu quero da localidade
      setCep(response.data);

      // resetando o campo de inserir dados
      setInput('');

    }catch{
      // caso o cep seja digitado errado exibe um alerta e reseta o campo de inserir
      alert('cep invalido');
      setInput('');
    }


  }

  return (
    <div className="container">
        <h1 className="titulo"> Buscador de cep </h1>
    
    <div className='contInput'>
        
        <input type="text" 
        placeholder="Digite seu cep"

        // atribui um identificador
        value={input}
        // guarda o valor digitado dentro do input
        onChange={(evento) => setInput(evento.target.value)} />

        <button className="btnBuscar" onClick={buscarCep}>
          <FiSearch size={25} color="#fff"/>
        </button>
   
   
    </div> 
      


{Object.keys(cep).length > 0 && (
// essa validação serve para verificar se a dados retornando com a consulta cep, se for verdade ele mostra o molde MAIN

    <main className='main'>

      <h2> CEP: {cep.cep}</h2>

      <span> {cep.logradouro} </span>
      <span> {cep.complemento}  </span>
      <span> {cep.bairro} </span>
      <span> {cep.localidade} - {cep.uf} </span>

    </main>


)};

    </div>

    
  );
}

export default App;
