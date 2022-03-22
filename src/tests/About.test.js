import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('testando About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByAltText('Pokédex');
    expect(pokedexInfo).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading',
      { name: /About Pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });
});
