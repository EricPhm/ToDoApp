

USE todoapp;
 
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