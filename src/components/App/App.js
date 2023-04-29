import {useState, useEffect} from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import {getImages} from "../../services/services"
import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [total, setTotal] = useState(0);

 
  useEffect(() => {
const fetchImages = async (searchQuery, currentPage) => {
  try {
    setIsLoading(true);
    setBackgroundColor('#155076');
    const data = await getImages(searchQuery, currentPage);
    if (data.hits.length === 0) {
      setNoResults(true);
    } else {
      setImages(prevImages => [...prevImages, ...data.hits]);
      setTotal(data.totalHits);
    }
  } catch (error) {
    alert(error);
  } finally {
    setIsLoading(false);
  }
}
    if (searchQuery.trim() !== '') { fetchImages(searchQuery, currentPage) }
  }, [currentPage, searchQuery]);
  
  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setNoResults(false);
  };

  const onSelectImage = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
     setSelectedImage('');
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const totalPage = total / images.length;
  
  const shouldRenderLoadMoreButton =
    totalPage > 1 && images.length > 0 && !isLoading && !noResults;

  return (
    <div className={css.App} style={{ backgroundColor }}>
      <Searchbar onSubmit={onChangeQuery} />
      {noResults ? (
        <p className={css.noResultsMessage}>No results found for your query</p>
      ) : (
        <ImageGallery images={images} onImageClick={onSelectImage} />
      )}

      {isLoading && <Loader />}

      {shouldRenderLoadMoreButton && <Button onClick={handleLoadMore}  />}

      {isModalOpen && (
        <Modal onClose={toggleModal} selectedImage={selectedImage}>
          <img src={selectedImage} alt={selectedImage} onClick={toggleModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;