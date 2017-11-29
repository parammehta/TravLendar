Travlendar: A Travel-Time-Aware Calendar

Travlendar provides a flexible and fully-featured calendar support that considers the travel time between meetings. The application automatically computes and accounts for travel time between appointment making sure that you are never late for an appointent. It also creates overall compatible schedules on a day-basis. 


Getting Started

Prerequisites

The web application is up and running on the domain: https://travlendar.com.
To run the application locally, you should install http server and host the application on the server.


Installing

1. Download and install nodejs. https://nodejs.org/en/download/.
2. Check on Terminal if "node" and "npm" command is working.
3. Save openssl.cnf in the directory that has Travlendar.
4. Open the Terminal/Command Prompt with Admin privilege and go to the directory that has Travlendar.
5. Execute the following command in the Terminal:
 openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 - keyout key.pem -out cert.pem -config=openssl.cnf

if the -config parameter does not work:
	5.1 Execute: set OPENSSL_CONF=<path_to_openssl.conf>
	5.2 Execute: openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem

6. Make sure you have key.pem and cert.pem in the directory that has Travlendar.
7. Install http-server
	7.1 Run the following command in the Terminal: npm install http-server -g
8. Run http-server Travlendar\www -p 4443 -S
9. Go to https:\\localhost:4443 and the application will be up and running.




Once you have registered and logged into the system, the initial setup requires the User to enter their Home and Work Location as it is an important aspect for the Meeting Schedule. 

The Home page of the application will consists of the Calendar interface with an option to choose either an Year, a Month, a Week or a Day View.

User can add meeting by clicking on the "ADD Meeting" button and entering the required details of the Meeting. 

Once the meeting is scheduled successfully, one can see their meeting on the Calendar interface.  

