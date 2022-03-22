import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('testando About', () => {
  test(`Teste se a página contém um heading "h2" com o texto 
    "Page requested not found 😭"`, () => {
    renderWithRouter(<NotFound />);
    const notFoundHead = screen.queryByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(notFoundHead).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem NotFound.', () => {
    renderWithRouter(<NotFound />);
    const imagemNotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imagemNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
