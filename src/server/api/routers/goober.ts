import { z } from 'zod';
import { db } from '~/server/db';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { broadcastNewRide } from '../../../pages/api/websocket';

export const gooberRouter = createTRPCRouter({
    requestRide: publicProcedure
    .input(z.object({
      pickup: z.string(),
      dropoff: z.string(),
      fare: z.number(),
      riderId: z.number(),
      pickupLat: z.number(),
      pickupLng: z.number(),
      dropoffLat: z.number(),
      dropoffLng: z.number(),
      distance: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const ride = await db.ride.create({
        data: {
          pickup: input.pickup,
          dropoff: input.dropoff,
          fare: input.fare,
          riderId: input.riderId,
          pickupLat: input.pickupLat,
          pickupLng: input.pickupLng,
          dropoffLat: input.dropoffLat,
          dropoffLng: input.dropoffLng,
          distance: input.distance,
        },
      });
      // Broadcast the new ride request to all connected clients
      broadcastNewRide(ride);
      return ride;
    }),
    cancelRide: publicProcedure
    .input(z.object({
      rideId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const ride = await db.ride.update({
        where: { id: input.rideId },
        data: { status: 'CANCELLED' },
      });
      return ride;
    }),
    getRides: publicProcedure.input(z.object({
      userId: z.number(),
    })).query(async ({ ctx, input }) => {
      const rides = await db.ride.findMany({
        where: { riderId: input.userId },
      });
      return rides;
  }),
});
