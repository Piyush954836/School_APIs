const db = require('../config/db');

function toRadian(degrees){
  return degrees*Math.PI/180;
}

function getDistance(lat1, lon1, lat2, lon2){
  const R = 6371;
  const dLat = toRadian(lat2 - lat1);
  const dLon = toRadian(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRadian(lat1))*Math.cos(toRadian(lat2))*Math.sin(dLon/2)**2;
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R*c;
}

exports.addSchool = (req, res) => {
  const {name, address, latitude, longitude} = req.body;
  if(!name || !address || !latitude || !longitude){
    return res.status(400).json({error: "All fields are required."});
  }

  db.query(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude],
    (err, results) => {
      if(err) return res.status(500).json({error: err.message});
      res.status(201).json({message : 'School added', id: results.insertId });
    }
  );
};

exports.listSchools = (req, res) => {
  const userLon = parseFloat(req.query.longitude);
  const userLat = parseFloat(req.query.latitude);

  if (isNaN(userLat) || isNaN(userLon)){
    return res.status(400).json({error: "Invalid latitude or longitude"});
  }

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({error: err.message});

    const sorted = results.map(school => ({
      ...school,
      distance: getDistance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  });
};