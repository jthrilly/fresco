/* eslint-disable local-rules/require-data-mapper */
import { prisma } from '~/utils/db';
import { protectedProcedure, publicProcedure, router } from '~/server/trpc';
import { z } from 'zod';

const updateActiveProtocolSchema = z.object({
  setActive: z.boolean(),
  hash: z.string().optional(),
});

export const protocolRouter = router({
  get: router({
    all: protectedProcedure.query(async () => {
      const protocols = await prisma.protocol.findMany();

      return protocols;
    }),
  }),
  getActive: publicProcedure.query(async () => {
    const activeProtocol = await prisma.protocol.findFirst({
      where: {
        active: true,
      },
    });

    return activeProtocol;
  }),
  setActive: protectedProcedure
    .input(updateActiveProtocolSchema)
    .mutation(async ({ input: { setActive, hash } }) => {
      if (!setActive) {
        return;
      }

      const currentActive = await prisma.protocol.findFirst({
        where: {
          active: true,
        },
      });

      // deactivate the current active protocol
      if (currentActive) {
        await prisma.protocol.update({
          where: {
            id: currentActive?.id,
          },
          data: {
            active: false,
          },
        });
      }

      // find the most recently imported protocol
      if (!hash) {
        const recentlyUploaded = await prisma.protocol.findFirst({
          orderBy: {
            importedAt: 'desc',
          },
        });

        // make the most recent protocol active
        await prisma.protocol.update({
          where: {
            hash: recentlyUploaded?.hash,
          },
          data: {
            active: true,
          },
        });
        return;
      }

      // make the protocol with the given hash active
      await prisma.protocol.update({
        where: {
          hash,
        },
        data: {
          active: true,
        },
      });
    }),
  delete: router({
    all: protectedProcedure.mutation(async () => {
      try {
        const deletedProtocols = await prisma.protocol.deleteMany();
        return { error: null, deletedProtocols };
      } catch (error) {
        return {
          error: 'Failed to delete protocols',
          deletedProtocols: null,
        };
      }
    }),
    byHash: protectedProcedure
      .input(z.array(z.string()))
      .mutation(async ({ input: hashes }) => {
        try {
          const deletedProtocols = await prisma.protocol.deleteMany({
            where: { hash: { in: hashes } },
          });
          return { error: null, deletedProtocols: deletedProtocols };
        } catch (error) {
          return {
            error: 'Failed to delete protocols',
            deletedProtocols: null,
          };
        }
      }),
  }),
});
