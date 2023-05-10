import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Header, Form, Button, Input } from './Searchbar.styled.jsx';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedQuery = query.toLowerCase().trim();

    if (normalizedQuery === '') {
      return toast.warning('Please enter your request.', { theme: 'dark' });
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit" aria-label="Search" className="button">
          <BiSearchAlt2 style={{ width: 20, height: 20 }} />
        </Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
