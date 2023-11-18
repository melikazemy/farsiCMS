
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import {useRoutes } from 'react-router-dom'
import routesArray from './routes';

function App() {
  const router = useRoutes(routesArray)
  return (
    <>

      <Sidebar />
      <div className='main'>
        <Header />
        {router}
      </div>

    </>
  );
}

export default App;
