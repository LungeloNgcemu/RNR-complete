![image](https://github.com/user-attachments/assets/f24b01c2-9511-47ff-bead-a88ce0ac4bc8)

**Installation**

The folder contains the backend(Node.js) server and the front end site(React)
**node needs to be already installled in the pc**

0. Open Visual Studio Code
1. use the git link to **git pull<Link>** 
2. cd/navigate into the **server** folder then run **npm install** for all the node packages
3. then run **nodemon index.js** to start the server - the console will print that the sever is runing on port 3000 as the local host

4. Open another vscode window
5. cd/navigate into the site/trucking folder then run **npm install** for all the node packages
6. run **npm run dev** to start the web server

**Instruction**
The backend uses an online postgress SQL database hosted by Superbase which can be accessed through the pg admin (postgress panel) using these logins for demonstration purposes.


/************************************************************/
Host : "aws-0-eu-central-1.pooler.supabase.com";

Database Name :  "postgres";

User : "postgres.rlzivsmkflkmwzqxuttc";

Port : 6543;

Password : #RNRAPP2024
/********************************************************/

**Description**

The simple application inserts, updates and pulls data from the data base. The simple React user interface is simple to use as the http request are dealt with using the axion package along with the express server.


