import { screen, render } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';

test(`É exibido na tela a mensagem "No favorite pokemon found",
se a pessoa não tiver pokémons favoritos.`, () => {
  render(<FavoritePokemons />);
  const mensagem = screen.getByText('No favorite pokemon found');
  expect(mensagem).toBeDefined();
});
