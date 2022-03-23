import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('teste titulo', () => {
  test(`Teste se a página contém um heading "h2" com o texto 
    "Encountered pokémons"`, () => {
    renderWithRouter(<App />);
    const textPokemon = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(textPokemon).toBeInTheDocument();
  });
});

describe('teste botao próximo', () => {
  test('Teste se ao apertar o botao proximo pokemon renderiza o proximo pokemon', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const pokemon = screen.getByText(/pikachu/i);
    expect(pokemon).toBeDefined();
    const bnt = screen.getByTestId('next-pokemon');
    userEvent.click(bnt);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Caterpie/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Ekans/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Alakazam/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Mew/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Rapidash/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Snorlax/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Dragonair/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/pikachu/i)).toBeDefined();
  });
});

describe('teste renderiza apenas 1 pokemon', () => {
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const textPokemon = screen.getByText(/pikachu/i);
    expect(textPokemon).toBeDefined();
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Tem botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('button', { name: 'All' });
    screen.getByRole('button', { name: 'Electric' });
    screen.getByRole('button', { name: 'Fire' });
    screen.getByRole('button', { name: 'Bug' });
    screen.getByRole('button', { name: 'Poison' });
    screen.getByRole('button', { name: 'Psychic' });
    screen.getByRole('button', { name: 'Normal' });
    screen.getByRole('button', { name: 'Dragon' });
  });

  test('A pokedex roda somente no mesmo tipo de pokemon', () => {
    renderWithRouter(<App />);

    const bntType = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(bntType);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
    const bnt = screen.getByTestId('next-pokemon');
    userEvent.click(bnt);
    expect(screen.getByText(/Rapidash/i)).toBeDefined();
    userEvent.click(bnt);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const mapPokemon = pokemons.map((pokemon) => pokemon.type);
    const btns = screen.getAllByTestId('pokemon-type-button');
    const quantidadeBtn = 7;
    expect(btns).toHaveLength(quantidadeBtn);
    expect(btns[0]).toHaveTextContent(mapPokemon[0]);
    expect(btns[1]).toHaveTextContent(mapPokemon[1]);
  });

  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByRole('button', { name: 'All' });
    expect(btn).toBeDefined();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeDefined();
  });
  test('quando o botão All for clicado deverá mostrar os Pokémons sem filtros ', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    expect(pokemons.length).toBeDefined();
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).not.toBeDisabled();
  });
});

// console.log("🚀 ~ file: Pokedex.test.js ~ line 91 ~ test ~ mapPokemon",     pokemons.map((pokemon) => pokemon.type));
