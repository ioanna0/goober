# Goober Ride-Share Web App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

# Description
Goober is a ride-share web application designed to connect riders with drivers in a seamless and efficient manner. This Minimum Viable Product (MVP) offers essential functionalities for both riders and drivers to request, accept, and complete rides. 

# .env
GCP Postgres API Key and Google Maps API Key
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
DATABASE_URL=
```

# Steps
1. Run `yarn` to install dependencies
2. Run `yarn dev` to start the development server

# Optional Steps (For local db)
- `yarn run db:generate` to generate the prisma client
- `yarn run db:migrate` to deploy the migrations
- `yarn run db:push` to push the schema to the db
- `yarn run db:seed` to seed the db with 4 users, 2 drivers and 2 riders
- `npx prisma studio` to see the db in the browser

# IMPORTANT NOTE
If you run it locally, you will need to change the driver and rider IDs in the URL to match the IDs from the Users table in the database. (after running the seed command)
- E.g. http://localhost:3000/driver?driver={id}
- E.g. http://localhost:3000/rider?rider={id}

If you run it with the provided GCP DATABASE_URL, the rider and driver IDs are already set to ids (1,4 and 2,5 respectively) and can be accessed using the following URLs (there are links on the home page and the navbar to access the driver and rider pages)):
- Rider 1: http://localhost:3000/rider?rider=1
- Rider 2: http://localhost:3000/rider?rider=4
- Driver 1: http://localhost:3000/driver?rider=2
- Driver 2: http://localhost:3000/driver?rider=5
# Deployment
The project is deployed on https://goober-two.vercel.app/ using Vercel

## Description, Trade-offs, Enhancements

# Description
A ride needs to be requested by a rider and accepted by a driver. The steps for sending a request are:
1. Specify the pickup and dropoff locations
2. Calculate Fare
3. Review Fare and Request Ride
   
The driver can then accept the ride and navigate to the pickup location and drop off the rider at the dropoff location. The fare for the ride is calculated based on the distance between the pickup and dropoff locations, the duration, and a fixed surge multiplier. A map is displayed to show the route. Both riders and drivers can track other user's actions in real-time and the driver can mark the ride as complete once the dropoff is done.

# Fare Calculation
The fare for a ride is calculated based on the distance between the pickup and dropoff locations, the duration and a fixed surge multiplier. This calculation can be further enhanced by adding additional factors such as time of day, traffic conditions, and surge pricing.
