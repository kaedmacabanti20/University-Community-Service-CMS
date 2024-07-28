const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb+srv://torokyleashezequielmacabanti:XBVvEjbQJ7T7Tq3P@cluster1.ijwhcxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
const client = new MongoClient(mongoURI);

const dbName = 'uacs_db';
const studentCollection = 'students';
const activityCollection = 'activities';

const putCommunityServiceAndParticipants = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const studentCol = db.collection(studentCollection);
    const activityCol = db.collection(activityCollection);

    const { student_number, activity_code, activity, venue, time_in, time_out, time_render, semester, coordinators } = req.body;
    if (!student_number || !activity_code || !activity || !venue || !time_in || !time_out || !time_render || !semester || !coordinators) {
      return res.status(404).json({ success: false, error: 'Customer not found' });
    }

    const studentDocument = await studentCol.findOne({ student_number: student_number });
    const activityDocument = await activityCol.findOne({ activity_code: activity_code });

    if (!studentDocument) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    if (!activityDocument) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }

    // Calculate new point balance
    const newRenderedHours = studentDocument.rendered_hours + parseInt(time_render);
    const newParticipantCount = activityDocument.participant_count + 1;

    // Update the point balance and add transaction to the document
    await studentCol.updateOne(
      { student_number: student_number },
      {
        $set: {
          rendered_hours: newRenderedHours,
        },
        $push: {
          community_service: {
            activity_code,
            status: 'verified',
            activity,
            venue,
            time_in,
            time_out,
            time_render: parseInt(time_render),
            semester,
            coordinators,
            date: new Date().toLocaleString('en-PH', {
              timeZone: 'Asia/Manila',
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
            }),
            time: new Date().toLocaleString('en-PH', {
              timeZone: 'Asia/Manila',
              hour12: true,
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }),
          },
        },
      }
    );

    await activityCol.updateOne(
      { activity_code: activity_code },
      {
        $set: {
          participant_count: newParticipantCount,
        },
        $push: {
          participants: {
            activity_code,
            status: 'verified',
            student_number,
            time_in,
            time_out,
            time_render: parseInt(time_render),
            coordinators,
            date: new Date().toLocaleString('en-PH', {
              timeZone: 'Asia/Manila',
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
            }),
            time: new Date().toLocaleString('en-PH', {
              timeZone: 'Asia/Manila',
              hour12: true,
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            }),
          },
        },
      }
    );

    res.json({ success: true, message: 'recording success!' });
  } catch (error) {
    console.error('Error adding points:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
};

module.exports = { putCommunityServiceAndParticipants };
