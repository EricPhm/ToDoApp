
USE todoapp;
SELECT * FROM Mission where UserName = 'Za';
SELECT * FROM TASK where MissionId = 9;

delete from MISSION where Id = 24;
 
 INSERT INTO MISSION (Name, UserName, DateApply) 
VALUES
 ('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH', 'Za', '2024-08-20');
 
INSERT INTO MISSION (Name, UserName, DateApply) 
VALUES
 ('Play', 'Za', '2024-08-20'),
 ('Work', 'Za', '2024-08-20'),
 ('Reading', 'Za', '2024-08-20'),
  ('Wringting', 'Za', '2024-08-20');
 

 
 INSERT INTO TASK (Name, Description, MissionId) 
VALUES
  ('Finish report', 'Complete the quarterly sales report', 15),
  ('Attend meeting', 'Participate in the project status meeting', 15),
  ('Develop new feature', 'Implement the new user authentication feature', 13),
  ('Review code', 'Review the latest pull request from the development team', 13),
  ('Write test cases', 'Create unit tests for the new API endpoints', 13),
  ('Deploy to production', 'Deploy the updated application to the production server', 13),
  ('Optimize database', 'Optimize the database queries for improved performance', 16),
  ('Create presentation', 'Prepare a presentation for the upcoming client meeting', 20),
  ('Fix bug', 'Debug and fix the issue with the checkout process', 15),
  ('Analyze user feedback', 'Review and analyze the latest user feedback', 16);


CREATE TABLE USER (
    UserName VARCHAR(255) NOT NULL PRIMARY KEY,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE MISSION (
    Id INT auto_increment NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    UserName VARCHAR(255) NOT NULL,
    DateApply DATE NOT NULL,
    FOREIGN KEY (UserName) REFERENCES USER(UserName)
);


CREATE TABLE TASK (
    Id INT auto_increment NOT NULL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    MissionId INT NOT NULL,
    Done BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (MissionId) REFERENCES MISSION(Id)
)