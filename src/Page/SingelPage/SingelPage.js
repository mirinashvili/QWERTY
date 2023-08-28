import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import './SingelPage.scss'

const SingelPage = () => {
  const { id } = useParams();
  const [charData, setCharData] = useState({});

  const fetchData = async () => {
    try {
      // Make API request with Axios
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      console.log(response.data);
      setCharData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Skin Color</th>
            <th>Eye Color</th>
            <th>Height</th>
            <th>Mass</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{charData.name}</td>
            <td>{charData.gender}</td>
            <td>{charData.birth_year}</td>
            <td>{charData.skin_color}</td>
            <td>{charData.eye_color}</td>
            <td>{charData.height}</td>
            <td>{charData.mass}</td>
          </tr>
        </tbody>
      </Table>
    <Link to = '/'>
   <bottom >Main Page</bottom>
    </Link>

    </div>
  
  );
};

export default SingelPage;
