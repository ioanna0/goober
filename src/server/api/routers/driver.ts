import { z } from 'zod';
import { db } from '~/server/db';
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const driverRouter = createTRPCRouter({
  acceptRequest: publicProcedure
    .input(z.object({
      rideId: z.number(),
      driverId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const ride = await db.ride.update({
        where: { id: input.rideId },
        data: {
          status: 'ACCEPTED',
          driverId: input.driverId,
        },
      });

      await db.user.update({
        where: { id: input.driverId },
        data: { currentRideId: ride.id },
      });

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
    completeRide: publicProcedure
    .input(z.object({
      rideId: z.number(),
      driverId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Update the ride status to COMPLETED
      const ride = await db.ride.update({
        where: { id: input.rideId },
        data: { status: 'COMPLETED' },
      });

      // Clear the driver's current ride
      await db.user.update({
        where: { id: input.driverId },
        data: { currentRideId: null },
      });

      return ride;
    }),
    getRequests: publicProcedure.input(z.object({
      driverId: z.number(),
    })).query(async ({ ctx, input }) => {
      const requests = await db.ride.findMany({
        where: {
          OR: [
            { status: 'PENDING' },
            { status: 'ACCEPTED' },
          ],
          AND: [
            {
              OR: [
                { driverId: null },
                { driverId: input.driverId },
              ],
            },
          ],
        },
      });
      return requests;
  }),
});
