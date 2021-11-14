import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import Phylogeny  from './components/Phylogeny';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <FileUpload />
      <Phylogeny />
    </div>
  );
}

export default App;
