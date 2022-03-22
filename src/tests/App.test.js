import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O link para "Home" está enviando para o "/"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.queryByRole('link', { name: 'Home' });
    expect(linkHome).toBeDefined();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('O link para "About" está enviando para o "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.queryByRole('link', { name: 'About' });
    expect(linkAbout).toBeDefined();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('O link "Favorite Pokémons" está enviando para o "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeDefined();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('url não existe envia para "/NotFound"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/urlquenaoexiste');

    const notFound = screen
      .getAllByRole('heading', { name: /Page requested not found/i });

    expect(notFound).toBeDefined();
  });
});
