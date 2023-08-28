import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.scss'


const HomePage = () => {
  const [data, setData] = useState([]);
  // const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [record, setRecord] = useState([])
  const navigate = useNavigate();
  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    try {
      // Make API request with Axios
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      // sets total amount of pages
      setPageCount(Math.ceil(response.data.count / 10))
      setData(response.data.results);
      setRecord(response.data.results)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1)
  }
  // handle previous
  const handlePrevios = () => {
    if (page === 1) return page;
    setPage(page - 1)
  }
  const filter = (event) => {
    setRecord(data.filter((f) => f.name.toLowerCase().includes(event.target.value)))
  }
  const goToSinglePage = (url) => {
    const segments = url.split('/'); // Split the URL into segments
    const id = segments[segments.length - 2]; // The ID should be the second last segment
    console.log(id)
    navigate(`/SingelPage/${id}`);
  };
  return (
    <>
      <input type='text' placeholder='Search' onChange={filter} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth_year</th>
          </tr>
        </thead>
        <tbody>
          {record.map((person, index) => {
            return (
              <tr key={index} onClick={() => goToSinglePage(person.url)}>
                <td>{person.name}</td>
                <td>{person.gender}</td>
                <td>{person.birth_year}</td>
              </tr>);
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
        {
          Array(pageCount).fill(null).map((ele, index) => {
            return (
              <>
                <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
              </>
            )
          })
        }
        <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
      </Pagination>
    </>
  )
}
export default HomePage