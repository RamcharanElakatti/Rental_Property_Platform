import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PropertyCard from '../components/property/PropertyCard.jsx';
import { properties } from '../data/demoData.js';

describe('PropertyCard', () => {
  it('renders the property title, location, and rent', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <PropertyCard property={properties[0]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Sunlit Downtown Apartment')).toBeInTheDocument();
    expect(screen.getByText(/Austin, Texas/)).toBeInTheDocument();
    expect(screen.getByText(/\$2,450/)).toBeInTheDocument();
  });
});
