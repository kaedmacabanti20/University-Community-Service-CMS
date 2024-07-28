const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb+srv://torokyleashezequielmacabanti:XBVvEjbQJ7T7Tq3P@cluster1.ijwhcxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const client = new MongoClient(mongoURI);
const crypto = require('crypto');
const dbName = 'uacs_db'; 
const studentCollection = 'students'; 
const activityCollection = 'activities'; 

const generateEventCode = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let eventCode = '';
  for (let i = 0; i < 6; i++) {
    eventCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return eventCode;
};

const postCommunityService = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(activityCollection);

    const { activity, venue, time_in, time_out, time_render, semester, activity_date, coordinators } = req.body;
    if (!activity || !venue || !time_in || !time_out || !time_render || !semester || !activity_date || !coordinators) {
      res.status(400).json({ success: false, error: 'Bad Request: Missing required data' });
      return;
    }

    const activity_code = generateEventCode();

    const newActivity = {
      activity_code,
      activity,
      venue,
      time_in,
      time_out,
      time_render,
      semester,
      participant_count: 0,
      coordinators,
      activity_date,
      date: new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      }),
      participants: [],
    };

    const result = await collection.insertOne(newActivity);

    res.json({
      success: true,
      message: 'Activity created successfully',
      activity: newActivity.activity,
      activity_code: newActivity.activity_code,
      result: result
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

const postStudent = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(studentCollection);

    const { student_number } = req.body;
    if (!student_number) {
      res.status(400).json({ success: false, error: 'Bad Request: Missing required data' });
      return;
    }

    const newStudent = {
      student_number,
      rendered_hours: 0, 
      date: new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date().toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
      }),
      community_service: [],
    };

    const result = await collection.insertOne(newStudent);

    res.json({
      success: true,
      message: 'student created successfully',
      result: result
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

module.exports = { postStudent, postCommunityService };
