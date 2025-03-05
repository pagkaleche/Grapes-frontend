const { HOST, TOKEN } = process.env;

export function query(url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${HOST}/api/${url}`, options).then(res => res.json());
}