const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

const REGISTERED_CLIENT_ID = 'b46118f0-fbde-4b16-a4b1-6ae6ad718b27'; 
const REGISTERED_CLIENT_SECRET = 'Xoyo10RPasKWODAN'; 

app.use(bodyParser.json());


async function getAccessToken() {
  try {
    const response = await axios.post('http://20.244.56.144/train/access', {
      client_id: REGISTERED_CLIENT_ID,
      client_secret: REGISTERED_CLIENT_SECRET,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.message);
    throw new Error('Unable to get access token');
  }
}

async function getTrainData() {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.get('http://20.244.56.144/train/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting train data:', error.message);
    throw new Error('Unable to get train data');
  }
}

app.get('/trains', async (req, res) => {
  try {
    const trainData = await getTrainData();
    
    
    const response = [
      
    ];
    
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const registrationData = req.body; 
    const response = await axios.post('http://20.244.56.144/train/register', registrationData);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
