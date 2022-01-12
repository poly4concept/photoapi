import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [search, setSearch] = useState("")
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {   
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const token = '563492ad6f917000010000013899a3fe0a8d4c33b56db24a30598bfe'
    const url = "https://api.pexels.com/v1/search?query=" + search+ "&per_page=8&page=1";

    axios.get(url, { headers: { 'Authorization': `${token}` } }).then(response => {
      console.log(response);
      setPhotos(response.data.photos)
      setLoading(false)
    })
  }
  return (
    <div className="App container">
      <div className='search'> 
        <h2>Photo Search</h2>
        <form onSubmit={handleSubmit} className='input-group' >
          <input className='form-control rounded' type='text' placeholder='search photo' name='photo' onChange={handleChange} />
          <button type='submit' className='btn btn-outline-primary'>Search</button>
        </form>
      </div>
      <div className='photos row'>
        {loading && (<h4>Loading photos...</h4>)}
        {photos.length > 0 && (photos.map(photo => {
          return <div className='photo col-lg-3 col-md-4 col-6 my-3'  key={photo.id}>
            <div className='card'>
              <img src={photo.src.original} alt={photo.alt} className='card-img-top img-fluid' height='3rem' />
              <div className='info card-body'>
                <span className='card-text name'>Photographer</span>
                <span className='card-text'>{ photo.photographer}</span>
              </div>
            </div>
          </div>
        }))}
        
        {photos.length === 0 && loading === false && (
          <h4>No photo!</h4>
        )}
      </div>
    </div>
  );
}

export default App;