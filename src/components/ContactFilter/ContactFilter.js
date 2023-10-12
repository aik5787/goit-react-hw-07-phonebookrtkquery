import { useDispatch, useSelector } from 'react-redux';
import { setFilter, getFilter } from 'redux/filterSlice';
import {
  FilterContainer,
  FilterLabel,
  FilterInput,
} from './ContactFilter.styled';

export const ContactFilter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <FilterContainer>
      <FilterLabel htmlFor="nameFilterInput">Find contacts by name</FilterLabel>
      <FilterInput
        id="nameFilterInput"
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </FilterContainer>
  );
};
