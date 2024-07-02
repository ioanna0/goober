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
    getRequests: publicProcedure.input(z.object({
      driverId: z.number(),
    })).query(async ({ ctx, input }) => {
      const requests = await db.ride.findMany({
        where: {
          status: 'PENDING',
          driverId: null,
        },
      });
      return requests;
  }),
});
