import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('As informações detalhadas do Pokémon são mostradas na tela.', () => {
  it('O nome do Pokémon ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    screen.getByRole('heading', { name: `${pokemons[0].name} Details`, level: 2 });
  });

  it('não de existir link para moredetails ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
  });

  it('existe um titulo Summary? ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    screen.getByRole('heading', { name: /Summary/i, level: 2 });
    screen.getByText(pokemons[0].summary);
  });

  it('existe um titulo para o mapa de localização do pokemon? ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    screen.getByRole('heading',
      { name: `Game Locations of ${pokemons[0].name}`, level: 2 });
  });

  it('as localizações do Pokémon estão na tela? ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const location = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(location[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('A página deve exibir um checkbox que permite favoritar o Pokémon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const marcarFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(marcarFavorito);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    userEvent.click(marcarFavorito);
    expect(star).not.toBeInTheDocument();
  });

});
