import  {useEffect} from 'react';
import axios from 'axios';

function App() {

useEffect(() => {
  axios.patch('http://172.16.58.153:2600/').then((response) => {
    console.log(response);
  })
});

  return (
    <div className="App">
      My Life App
    </div>
  );
}

export default App;
