import React from 'react';
import App from './App'
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { getUrls, postUrls } from '../../apiCalls';
jest.mock('../../apiCalls');

describe('App', () => {
  beforeEach(() => {
    const expectedUrls = [{
      id: 1,
      long_url: "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      short_url: "http://localhost:3001/useshorturl/1",
      title: "Awesome photo"
    },
    {
      id: 2,
      long_url:"http://www.frenchtoastsunday.com/2012/08/top-10-quotes-from-hot-rod.html",
      short_url: "http://localhost:3001/useshorturl/2",
      title: "Hot Rod"
    }];

    const postedUrl = [{
      id: 3,
      long_url:"http://www.frenchtoastsunday.com/2012/08/top-10-quotes-from-hot-rod.html",
      short_url: "http://localhost:3001/useshorturl/2",
      title: "Bangers and Mash"
    }]

    getUrls.mockResolvedValue(expectedUrls)
    postUrls.mockResolvedValue(postedUrl);
  });

  it('When the App is rendered, make sure any UI specific to the App component renders as well', () => {
    render(<App />)

    const header = screen.getByText('URL Shortener');
    expect(header).toBeInTheDocument()
  });

  it('When the App renders, make sure that any urls on the server are added to the dom', async () => {
    render(<App />)

    await waitFor(() => expect(getUrls).toHaveBeenCalledTimes(1))
    const urlOneTitle = await waitFor(() => screen.getByText("Awesome photo"));
    expect(urlOneTitle).toBeInTheDocument();
    expect(urlOneLong).toBeInTheDocument();
    expect(urlOneShort).toBeInTheDocument();
  });

  it('When the App renders, make sure that users can fill out the form, submit the form, and see a new url added to the DOM', async () => {
    render(<App />)

    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    const button = screen.getByRole('button', { name: /shorten please!/i })

    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(titleInput, 'Bangers and Mash')
    expect(titleInput).toHaveValue('Bangers and Mash')

    userEvent.type(urlInput, 'http://www.frenchtoastsunday.com/2012/08/top-10-quotes-from-hot-rod.html')
    expect(urlInput).toHaveValue('http://www.frenchtoastsunday.com/2012/08/top-10-quotes-from-hot-rod.html')
    userEvent.click(button)
    await waitFor(() => expect(postUrls).toHaveBeenCalledTimes(1))
    const newTitle = await waitFor(() => screen.getByText('Bangers and Mash'))
    expect(newTitle).toBeInTheDocument();
  })
});
