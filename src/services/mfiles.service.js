// Import necessary packages
const axios = require('axios');
const FormData = require('form-data');

// Define M-Files REST API endpoints
const BASE_URL = 'https://your-mfiles-server.com/REST/objects';
const AUTH_URL = 'https://your-mfiles-server.com/REST/server/authenticationtokens';
const FILES_URL = 'https://your-mfiles-server.com/REST/objects/files';

// Define authentication credentials
const USERNAME = 'your-username';
const PASSWORD = 'your-password';

// Authenticate and get an authentication token
async function getAuthToken() {
  const authData = {
    Username: USERNAME,
    Password: PASSWORD
  };

  const response = await axios.post(AUTH_URL, authData);
  const authToken = response.data.Value;
  return authToken;
}

// Retrieve a file by object ID
export async function getFileById(objectId) {
  const authToken = await getAuthToken();
  const url = `${FILES_URL}/${objectId}/content`;

  const response = await axios.get(url, {
    headers: {
      'X-Authentication': authToken
    },
    responseType: 'arraybuffer'
  });

  return response.data;
}

// Upload a file to M-Files
export async function uploadFile(file) {
  const authToken = await getAuthToken();
  const form = new FormData();
  form.append('File', file);

  const response = await axios.post(FILES_URL, form, {
    headers: {
      'X-Authentication': authToken,
      ...form.getHeaders()
    }
  });

  return response.data.ObjVer.ID;
}

export async function getFilesByIds(objectIds) {
    const authToken = await getAuthToken();
    const url = `${FILES_URL}/contents`;
  
    const response = await axios.post(url, objectIds, {
      headers: {
        'X-Authentication': authToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  
    return response.data;
  }