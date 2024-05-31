import React, { useState, useEffect } from 'react';
import './App.css';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);


  useEffect(() => {
    fetchDefaultImages();
  }, []);

  const fetchDefaultImages = async () => {
    const clientId = 'K4EsHWDuiJ2JdUCGLN7lqYucR5IPA31vCW3VWyTa64U';
    const url = `https://api.unsplash.com/photos?client_id=${clientId}&page=1&per_page=24`;
    try {
      const result = await axios.get(url);
     
    
      setImages(result.data);
    } catch (error) {
      console.error('Error fetching default images:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput) {
      fetchImages(searchInput);
   
     }
  };

  const handleClick = (searchInput) => {
    setSearchInput(searchInput);
    fetchImages(searchInput);
  };

  const fetchImages = async (searchInput) => {
    const clientId = 'K4EsHWDuiJ2JdUCGLN7lqYucR5IPA31vCW3VWyTa64U';
    const url = `https://api.unsplash.com/search/photos?query=${searchInput}&client_id=${clientId}&page=1&per_page=24`;
    try {
      const result = await axios.get(url);
      // console.log(result)
      // console.log(result.data)
      setImages(result.data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <h1 className='title'>Snap Shot</h1>
        <div className='search-filter'>
          <Form onSubmit={handleSearch} className='d-flex search-section'>
            <Form.Control
              type='search'
              id='search-input'
              className='search-input'
              placeholder='Search...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type='submit' className={'submit-button ' + (searchInput ? 'active' : '')} disabled={!searchInput}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
              </svg>
            </button>
          </Form>
        
        <div className='filters-button'>
          <div onClick={() => handleClick('Mountain')}><button>Mountain</button></div>
          <div onClick={() => handleClick('Beaches')}><button>Beaches</button></div>
          <div onClick={() => handleClick('Birds')}><button>Birds</button></div>
          <div onClick={() => handleClick('Food')}><button>Food</button></div>
        </div>
        <div>
        <h2 className='display-input'>{searchInput ? `${searchInput} Pictures ` : ' '}</h2>
        </div>
         
        </div>
        <div className='images'>
          {
            images.map((img) => {
              return (
                <img key={img.id} src={img.urls.small} alt={img.alt_description} className='image'/>
              );
            })
          }
        </div>
      </div>
      <a href="https://github.com/you"
      ><img decoding="async" width="169" height="169" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_darkblue_121621.png?resize=149%2C149" className="gitFork-attachment size-full" alt="Fork me on GitHub" loading="lazy" data-recalc-dims="1"/></a>
    </>
  );
};

export default App;
