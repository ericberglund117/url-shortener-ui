import React from 'react';
import UrlForm from './UrlForm'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('UrlForm', () => {
  it('When the Form is rendered, make sure that the correct elements render on the dom', () => {
    render(<UrlForm />)

    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    const button = screen.getByRole('button', { name: /shorten please!/i })

    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('When the inputs change, make sure that the form elements hold the correct values', () => {

  });

  it('When the form is submitted, make sure any appropriate functions are called.', () => {

  });
});
