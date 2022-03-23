import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Teste se é renderizado um card com as info de determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const namesPokemon = screen.getByTestId('pokemon-name');
    expect(pokemons[0].name).toBe(namesPokemon.innerHTML);
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximoPokemon);
    expect(pokemons[0].name).not.toBe(namesPokemon.innerHTML);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const typesPokemon = screen.getByTestId('pokemon-type');
    expect(pokemons[0].type).toBe(typesPokemon.innerHTML);
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximoPokemon);
    expect(pokemons[0].type).not.toBe(typesPokemon.innerHTML);
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const { averageWeight } = pokemons[0];
    const { value, measurementUnit } = averageWeight;
    const peso = `Average weight: ${value} ${measurementUnit}`;
    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(peso).toBe(pesoPokemon.innerHTML);
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximoPokemon);
    expect(peso).not.toBe(pesoPokemon.innerHTML);
  });

  test('A imagem do Pokémon deve ser exibida correspondente ao pokemon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const imagemPokemon = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(imagemPokemon).toHaveAttribute('src', pokemons[0].image);
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximoPokemon);
    expect(imagemPokemon).not.toHaveAttribute('src', pokemons[0].image);
    expect(imagemPokemon).toHaveAttribute('src', pokemons[1].image);
  });

  test('o card do Pokémon indicado na Pokédex contém more details ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(proximoPokemon);
    expect(moreDetails).not.toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemons[1].id}`);
  });

  test('ao clicar em more Details vai para as informações do pokemon em questão ', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(pathname).not.toBe(`/pokemons/${pokemons[1].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App pokemons={ pokemons } />);
    history.push('/pokemons/25');
    const marcarFavorito = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(marcarFavorito);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
