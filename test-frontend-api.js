// Test if frontend can connect to backend API
fetch('http://localhost:3000/api/notes')
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('API test successful! Received', data.length, 'notes');
    console.log('Sample note:', data[0]);
  })
  .catch(error => {
    console.error('API test failed:', error.message);
  });
