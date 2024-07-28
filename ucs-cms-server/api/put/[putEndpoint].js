import {putCommunityServiceAndParticipants} from '../../libs/putLibs'; // Assuming you have a library for generating QR codes

const putEndpoint = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { putEndpoint } = req.query;

  if (putEndpoint === 'putCommunityServiceAndParticipants' && req.method === 'PUT') {
    try {
      await putCommunityServiceAndParticipants(req, res);  
    } catch (error) {
      console.error('Error adding points:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(404).json({ error: 'Endpoint not found' });
  };
};

module.exports = putEndpoint;
