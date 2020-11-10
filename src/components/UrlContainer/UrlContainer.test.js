import React from 'react';
import UrlContainer from './UrlContainer'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('UrlContainer', () => {
  it('When passed an array of url objects, make sure that headings and anchor tags get rendered appropriately', () => {
    const url = [{
      id: 1,
      long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      short_url: "http://localhost:3001/useshorturl/1",
      title: "Awesome photo"
    }];

    render(<UrlContainer urls={url}/>)

    const title = screen.getByText('Awesome photo');
    const shortUrl = screen.getByText('http://localhost:3001/useshorturl/1');
    const longUrl = screen.getByText('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80');

    expect(title).toBeInTheDocument();
    expect(shortUrl).toBeInTheDocument();
    expect(longUrl).toBeInTheDocument();
  });
})
