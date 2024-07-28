import {postStudent, postCommunityService} from '../../libs/postLibs';  
 
const postEndpoint = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')  
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { postEndpoint } = req.query;

  if (postEndpoint === 'postStudent' && req.method === 'POST') {
    try {
      await postStudent(req, res);
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  else if (postEndpoint === 'postCommunityService' && req.method === 'POST') {
    try {
      await postCommunityService(req, res);  
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
 
}
 
module.exports = postEndpoint()

