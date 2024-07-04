# Goober Ride-Share Web App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

# Description
Goober is a ride-share web application designed to connect riders with drivers in a seamless and efficient manner. This Minimum Viable Product (MVP) offers essential functionalities for both riders and drivers to request, accept, and complete rides. 

# .env
GCP Postgres API Key and Google Maps API Key
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyBxkTBuOJ98l6ist88NpyAbFd43I_BDQsk"
DATABASE_URL=postgresql://postgres:root@34.171.232.89:5432/goober?sslmode=require
```
You can use your own postgres db or use the one provided in the .env file

# Steps
1. Run `yarn` to install dependencies
2. Run `yarn dev` to start the development server

# Optional Steps (For local db)
- `yarn run db:generate` to generate the prisma client
- `yarn run db:migrate` to deploy the migrations
- `yarn run db:push` to push the schema to the db
- `yarn run db:seed` to seed the db with 4 users, 2 drivers and 2 riders
- `npx prisma studio` to see the db in the browser


# Deployment
The project is deployed on https://goober-two.vercel.app/ using Vercel

## Description, Trade-offs, Enhancements

# Description
A ride needs to be requested by a rider and accepted by a driver. The steps for sending a request are:
1. Specify the pickup and dropoff locations
2. Calculate Fare
3. Review Fare and Request Ride
   
The driver can then accept the ride and navigate to the pickup location and drop off the rider at the dropoff location. The fare for the ride is calculated based on the distance between the pickup and dropoff locations, the duration, and a fixed surge multiplier. A map is displayed to show the route. Both riders and drivers can track other user's actions in real-time and the driver can mark the ride as complete once the dropoff is done.

# Tech Stack
The teck stack i've chose is t3 stack which is a fullstack framework that uses Next.js, Prisma and Postgres. 
For the front end i've used Mantine which is a component library that helps in building accessible and responsive web applications. I've also used Tailwind CSS for styling the components.

# Real Time Updates
For real time updates i've implemented a polling mechanism that checks for updates every 5 seconds. This is not the best way to implement real time updates as it can be resource intensive. A better way to implement real time updates would be to use websockets.

# Matching Drivers and Riders
For matching drivers and riders i've used a simple logic where a driver can accept any ride. A better way to implement this would be to use a more sophisticated algorithm that takes into account the distance between the driver and the rider and assigns the closest driver to the rider.

# Riders / Drivers IDS
At the moment the rider and driver IDs are passed down as query param to the driver/rider page. A better way to implement this would be to use a user authentication system to allow multiple drivers to log in with unique IDs without manually changing driver IDs.

# Google Maps Integration
I've used Google Places Autocomplete API to allow users to search for locations. This is a good feature as it allows users to easily search for locations.

For the RouteMap i've used the Distance Matrix API to calculate the distance between the pickup and dropoff locations. 

# Fare Calculation
The fare for a ride is calculated based on the distance between the pickup and dropoff locations, the duration and a fixed surge multiplier. This calculation can be further enhanced by adding additional factors such as time of day, traffic conditions, and surge pricing.

# UI 
The UI is simple and clean. I've used Mantine components to build the UI. The UI can be further enhanced by adding more features such as animations, transitions, and interactive elements. Some of the UI elements are not responsive and can be improved for better usability on mobile devices. 
Could enhance the status indicators to provide clear and concise visual feedback on the ride status (accepted, pending, completed) for both riders and drivers.

# Enhancement: More Testing
If more time was available, I would have implemented additional unit and integration tests to ensure the reliability and robustness of the application.
# Enhancement: Authentication
 Implement a user authentication system to allow multiple drivers to log in with unique IDs without manually changing driver IDs.
# Enhancement: Rider Driver Matching
Driver Assignment Logic: Develop a more sophisticated driver assignment logic that matches available drivers based on proximity to rider’s pickup locations. For that we will need to know the location of the driver and the rider at a given time.

# Enhancement: Location Sync when Marking as Complete
Ensure that when a ride is marked as complete, both the driver's and rider's locations are updated to the dropoff location for future ride requests and accurate tracking.

# Enhancement: More Google Maps
Utilize more advanced Google Maps features, such as live traffic data and route optimization, to enhance the navigation experience for drivers.
Show real time location of the driver and the rider on the map