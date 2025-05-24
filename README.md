# School Management API

A simple RESTful API built with Node.js, Express, and MySQL (via TiDB Cloud) to manage school data. It allows users to add new schools and retrieve a list of nearby schools based on geographic coordinates.

---

## Features

- Add a new school (name, address, latitude, longitude)
-  List schools sorted by proximity to a given location
-  Deployed and tested using Postman
-  Clean folder structure and secure `.env` management

---

## Folder Structure

school-api/
├── app.js
├── config/
│ └── db.js
├── controllers/
│ └── schoolController.js
├── routes/
│ └── schoolRoutes.js
├── .env
├── .gitignore
├── package.json
└── README.md
