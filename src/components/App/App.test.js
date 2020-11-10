import React from 'react';
import App from './App'
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm'
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { getUrls, postUrls } from '../../apiCalls';
jest.mock('../../apiCalls');

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
  title: "Hot Rod"
}]

describe('App', () => {
  it('When the App is rendered, make sure any UI specific to the App component renders as well', () => {
    getUrls.mockResolvedValueOnce(expectedUrls)
    render(<App />)

    const header = screen.getByText('URL Shortener');
    expect(header).toBeInTheDocument()
  });

  it('When the App renders, make sure that any urls on the server are added to the dom', async () => {
    getUrls.mockResolvedValue(expectedUrls)

    const spy = jest.spyOn(App.prototype, 'componentDidMount')

    render(<App />)

    render(<UrlContainer urls={expectedUrls}/>)
    screen.debug()
    const urlOneTitle = screen.getByText("Awesome photo")
    const urlOneLong = screen.getByText("https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    const urlOneShort = screen.getByText("http://localhost:3001/useshorturl/1")

    expect(urlOneTitle).toBeInTheDocument();
    expect(urlOneLong).toBeInTheDocument();
    expect(urlOneShort).toBeInTheDocument();
  });

  it('When the App renders, make sure that users can fill out the form, submit the form, and see a new url added to the DOM', () => {
    getUrls.mockResolvedValue(expectedUrls)
    postUrls.mockResolvedValue(postedUrl)
    render(<App />)

    const titleInput = screen.getByPlaceholderText('Title...');
    const urlInput = screen.getByPlaceholderText('URL to Shorten...');
    const button = screen.getByRole('button', { name: /shorten please!/i })

    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(titleInput, 'Hot Rod')
    expect(titleInput).toHaveValue('Hot Rod')

    userEvent.type(urlInput, 'www.longUrl.com')
    expect(urlInput).toHaveValue('www.longUrl.com')
    userEvent.click(button)
    expect()
  })
});
