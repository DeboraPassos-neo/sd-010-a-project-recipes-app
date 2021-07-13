import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetalhesBebidas from '../pages/DetalhesBebidas';
import renderWithRouter from './renderWithRouter';

describe('Beverage Details Screen Tests', () => {
  it('Check if you have a photo', () => {
    renderWithRouter(<DetalhesBebidas />);
    const photo = screen.getByAltText('');

    expect(photo).toBeInTheDocument();
  });

  it('Check if you have a title recipe', () => {
    renderWithRouter(<DetalhesBebidas />);
    const title = screen.getByTestId('recipe-title');

    expect(title).toBeInTheDocument();
  });

  it('Check if you have a button share', () => {
    renderWithRouter(<DetalhesBebidas />);
    const share = screen.getByTestId('share-btn');

    expect(share).toBeInTheDocument();
  });

  it('Check if you have a share icon', () => {
    renderWithRouter(<DetalhesBebidas />);
    const sharebtn = screen.getByAltText('share-button');

    expect(sharebtn).toBeInTheDocument();
  });

  it('Check if you have a favorite button', () => {
    renderWithRouter(<DetalhesBebidas />);
    const fav = screen.getByAltText('favorite-button');

    expect(fav).toBeInTheDocument();
  });

  it('Check if you have a img recipe', () => {
    renderWithRouter(<DetalhesBebidas />);
    const recipe = screen.getByTestId('recipe-photo');

    expect(recipe).toBeInTheDocument();
  });

  it('Check if you have a h1', () => {
    renderWithRouter(<DetalhesBebidas />);
    const ing = screen.getByRole('heading', { level: 1,
      name: /Ingredientes/i,
    });

    expect(ing).toBeInTheDocument();
  });

  it('Check if you have a h3 of instructions', () => {
    renderWithRouter(<DetalhesBebidas />);
    const inst = screen.getByRole('heading', { level: 3,
      name: /Instruções/i,
    });

    expect(inst).toBeInTheDocument();
  });

  it('Check if you have a h3 message', () => {
    renderWithRouter(<DetalhesBebidas />);
    const message = screen.getByRole('heading', { level: 3,
      name: /Pratos que combinam com este drink/i,
    });

    expect(message).toBeInTheDocument();
  });

  it('Check if you have a start recipe button', () => {
    renderWithRouter(<DetalhesBebidas />);
    const message = screen.getByTestId('start-recipe-btn');
    expect(message).toBeInTheDocument();
  });

  it('Check if you have a ul element', () => {
    renderWithRouter(<DetalhesBebidas />);
    const list = screen.getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it(`Check that clicking the start recipe button goes to
  the correct screen`, () => {
    // Acessa o elemento
    const { getByText, history } = renderWithRouter(<DetalhesBebidas />);
    const iniciaReceita = getByText('Iniciar Receita');
    userEvent.click(iniciaReceita);

    // faz o teste
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas/undefined/in-progress');
  });
});
