--this is for seeds file--

DROP DATABASE IF EXISTS codeconnect_db;
CREATE DATABASE codeconnect_db;

--users table needs to be populated first--
USE codeconnect_db;
INSERT INTO users (id, ghUsername, name, ghImage, ghLink)

VALUES 
    (1, "darnocer", "Darian Nocera", "https://via.placeholder.com/50", "https://github.com/darnocer"),
    (2, "kthorpe1023", "Katie Thorpe", "https://avatars3.githubusercontent.com/u/60801639?v=4", "https://github.com/kthorpe1023"),
    (3, "shannonthoko", "Shannon Kearney", "https://avatars1.githubusercontent.com/u/60098774", "https://github.com/shannonthoko"),
    (4, "amandalmorris31", "Amanda Morris", "https://i.insider.com/4e735bc46bb3f70502000056?width=480", "https://github.com/amandalmorris31");


--projects table--
USE codeconnect_db;
INSERT INTO projects
    (projectTitle, projectDetails, projectLink, UserId)
VALUES
    ("Let's go hiking!", "Looking for developers to climb a 14er!", "n/a", 1),
    ("In need of a React Developer", "Want to make an app. 1 month committment", "github.com", 1),
    ("Offering Sequelize Tutorial", "Saturday at 2pm", "zoom.com", 1),
    ("Superproject", "Formulate vaccine for COVID-19", "superproject.com", 1);

--interests table--
USE codeconnect_db;
INSERT INTO interests
    (projectId, userId)
VALUES
    (3,1),
    (1,2),
    (2,3),
    (4,4);
