import { useState, useEffect } from 'react';
import { getImages } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Section } from './Section/Section';
import PlaceholderText from './PlaceholderText/PlaceholderText';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from '../components/Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    if (page === 1) {
      scrollToTop();
    }
    fetchImages(searchQuery, page);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }

    fetchImages(searchQuery, page);
  }, [page]);

  const fetchImages = async (query, page) => {
    try {
      setIsLoading(true);

      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        return toast.error('Sorry, there is nothing we could find.', {
          theme: 'dark',
        });
      }
      page === 1
        ? setImages(data.hits)
        : setImages(prevState => [...prevState, ...data.hits]);
      setTotalImages(data.totalHits);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onOpenModal = (modalImage, tags) => {
    setModalImage(modalImage);
    setTags(tags);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const totalPages = totalImages / images.length;
  return (
    <>
      <Section>
        <Searchbar onSubmit={onSubmit} />
      </Section>

      {isLoading && <Loader />}
      <Section>
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      </Section>

      <Section>
        {totalPages > 1 && !isLoading && images.length !== 0 && (
          <Button onLoadMore={onLoadMore} />
        )}
      </Section>

      {showModal && (
        <Modal
          modalImage={modalImage}
          tags={tags}
          onCloseModal={onCloseModal}
        />
      )}

      {images.length === 0 && !isLoading && (
        <PlaceholderText text={"Let's find your photos!"} />
      )}

      <ToastContainer />
    </>
  );
};

export default App;
