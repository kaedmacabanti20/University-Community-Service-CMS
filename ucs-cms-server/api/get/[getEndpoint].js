import {getAllActivity, getStudentRecords, getActivityRecords} from '../../libs/getLibs';
 
const getEndpoint = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*') // Replace with your Vue.js app's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { getEndpoint } = req.query;
  if(getEndpoint === 'getAllActivity' && req.method === 'GET'){
    const result = await getAllActivity(req, res);
    res.json(result);
  }else if(getEndpoint === 'getStudentRecords' && req.method === 'GET'){
    const result = await getStudentRecords(req, res);
    res.json(result);
  }else if(getEndpoint === 'getActivityRecords' && req.method === 'GET'){
    const result = await getActivityRecords(req, res);
    res.json(result);
  }else {
    res.status(404).json({ error: 'Endpoint not found' });
  }
 
}
 
module.exports = getEndpoint()

