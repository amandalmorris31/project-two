--this is for seeds file--

DROP DATABASE IF EXISTS codeconnect_db;
CREATE DATABASE codeconnect_db;

--users table needs to be populated first--
USE codeconnect_db;
INSERT INTO users (id, ghUsername, name, ghImage, ghLink)

VALUES 
    
    (1, "kthorpe1023", "Katie Thorpe", "https://avatars3.githubusercontent.com/u/60801639?v=4", "https://github.com/kthorpe1023"),
    (2, "darnocer", "Darian Nocera", "https://avatars0.githubusercontent.com/u/61209731?s=460&u=4ac49edb8168d5be840fb6c287ccd2471b639ff4&v=4", "https://github.com/darnocer"),
    (3, "shannonthoko", "Shannon Kearney", "https://avatars1.githubusercontent.com/u/60098774", "https://github.com/shannonthoko"),
    (4, "amandalmorris31", "Amanda Morris", "https://i.insider.com/4e735bc46bb3f70502000056", "https://github.com/amandalmorris31");


--projects table--
USE codeconnect_db;
INSERT INTO projects
    (projectTitle, projectDetails, projectLink, UserId)
VALUES
    ("Let's go hiking!", "Looking for developers to climb a 14er!", "n/a", 1),
    ("In need of a React Developer", "Want to make an app. 1 month committment", "github.com", 2),
    ("Offering Sequelize Tutorial", "Saturday at 2pm", "zoom.com", 3),
    ("Superproject", "Formulate vaccine for COVID-19", "superproject.com", 4);

--interests table--
USE codeconnect_db;
INSERT INTO interests
    (projectId, userId)
VALUES
    (3,1),
    (1,2),
    (2,3),
    (4,4);