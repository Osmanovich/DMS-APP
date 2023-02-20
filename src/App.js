import styles from './App.module.scss';
import {Input} from 'antd';
import { getFiles } from './services/sharepoint.service';

function App() {
  const getFilesOnClick = async() => {
    const files = await getFiles();
    console.log(files);
  }
  return (
  //  <BrowserRouter>
  //   <Routes>
  //     <Route path="/home" element={<h1>Hello</h1>}/>
  //     <Route path="/" element={<Welcome />}/>
  //   </Routes>
  //  </BrowserRouter>
  <div className={styles.container}>
    <h1>DMS app</h1>
    <Input placeholder='Search here'/>
    <button onClick={getFilesOnClick}>GET FILES</button>
  </div>
  );
}

export default App;
