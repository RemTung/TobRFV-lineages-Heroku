import React, {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PlacementStat(props) {
  const [stat, setStat] = useState('');

  const viewStat = () => {
    fetch('http://localhost:7000/stat')
    .then(res => {return res.json()})
    .catch(err => {toast.error('Please upload a file first')})
    .then(result => {
      if (!result) return;
      const resultArray = Object.values(result);
      setStat(
        <table>
          <tr>
            <th>id</th>
            <th>Parsimony score</th>
            <th>Number of parsimony-optimal placements</th>
          </tr>
          {resultArray.map(x => (
            <tr>
              <td>{x.id}</td>
              <td>{x.parsimony_score}</td>
              <td>{x.num_parsimony_optimal_placements}</td>
            </tr>
          ))}
        </table>
      );  
    });
  }

  return (
    <div className="container">
      <ToastContainer />
      <h3>My data</h3>
      <button type="button" 
              className="btn btn-primary btn-block"
              onClick={viewStat}>
        See my placement result
      </button>

      {stat}      
    </div>
  );
}

export default PlacementStat;