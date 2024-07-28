const { MongoClient } = require('mongodb'); 
const mongoURI = 'mongodb+srv://torokyleashezequielmacabanti:XBVvEjbQJ7T7Tq3P@cluster1.ijwhcxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1' 
// mongodb+srv://torokyleashezequielmacabanti:XBVvEjbQJ7T7Tq3P@cluster1.ijwhcxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1 
// npm install mongodb@4.1 
// torokyleashezequielmacabanti 
// XBVvEjbQJ7T7Tq3P 
const client = new MongoClient(mongoURI);
const dbName = 'uacs_db'; 
const studentCollection= 'students'; 
const activityCollection= 'activities'; 
 
const getAllActivity = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName); 
    const collection = db.collection(activityCollection);
    let activities = await collection.find({}).toArray();

    // Sort the activities array based on qr_creation_date and qr_creation_time
    activities.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA; // Newest first
    });

    res.json({ success: true, result: activities });
  } catch (error) {
    console.error('Error getting clients:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

const getActivityRecords = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(activityCollection);

    const {activity_code} = req.query; 
    if (!activity_code) {
      res.status(400).json({ success: false, error: 'Bad Request: Missing required data' });
      return;
    }

    const activity_records = await collection.findOne({activity_code: activity_code});
    if (!activity_records) {
      return res.status(404).json({ success: false, error: 'activity not found' });
    }
    res.json({ success: true, result: activity_records});
  } catch (error) {
    console.error('Error getting business:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}

const getStudentRecords = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(studentCollection);

    const {student_number} = req.query; 
    if (!student_number) {
      res.status(400).json({ success: false, error: 'Bad Request: Missing required data' });
      return;
    }

    const student_records = await collection.findOne({student_number: student_number});
    if (!student_records) {
      return res.status(404).json({ success: false, error: 'student not found' });
    }
    res.json({ success: true, result: student_records});
  } catch (error) {
    console.error('Error getting business:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
 
 

module.exports = { 
  getAllActivity, getStudentRecords, getActivityRecords 
};
