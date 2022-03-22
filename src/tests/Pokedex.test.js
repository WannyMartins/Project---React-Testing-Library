import { screen, render } from '@testing-library/react';
import React from 'react';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('testando About', () => {
  test(`Teste se a página contém um heading "h2" com o texto 
    "Encountered pokémons"`, () => {
    render(<Pokedex />);
    const textPokemon = screen.getByText(/Encountered pokémons/i);
    expect(textPokemon).toBeInTheDocument();
  });

  // test('Teste se a página contém a imagem NotFound.', () => {
  //   renderWithRouter(<NotFound />);
  //   const imagemNotFound = screen
  //     .getByAltText('Pikachu crying because the page requested was not found');
  //   expect(imagemNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  // });
});
