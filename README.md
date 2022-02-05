# shapes-app
React and Node app to draw new shapes

Steps to start client and server (and change port if required):

1. Go to the client folder and do npm install.
2. Go to the server folder and do npm install.
3. Go to client folder and run npm start.
4. Go to sever folder and run nodemon app.js
5. You should be able to see the web app running in your browser by default at port 3000.
6. You should be able to see server running at port 3001 by default. In case it is already occupied, change port number in cleerly/server/app.js  in app.listen function 
7. Change port number in cleerly/client/src/shapes.js shapes_constants constant at the top in the server_url variable.


Steps to use application:

2. Select one of the buttons out of Draw Rect or Draw Line to start drawing the corrosponding shape.
3. To change the shape type to be drawn select that shape type button and the shape type would get changed accordingly.
