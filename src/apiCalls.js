export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(response => response.json())
}

export const postUrls = (url) => {
  return fetch('http://localhost:3001/api/v1/urls',
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      long_url: url.long_url,
      title: url.title
    })
  })
  .then(response => {
    if(response.ok) {
      return response.json()
    }
  })
};

export const deleteUrl = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`,
  {
    method: 'DELETE'
  })
};
