import { z } from 'zod';

export const appSettingsSchema = z
  .object({
    initializedAt: z.date(),
    configured: z.boolean(),
    allowAnonymousRecruitment: z.boolean(),
    limitInterviews: z.boolean(),
    uploadThingToken: z.string(),
    installationId: z.string(),
    disableAnalytics: z.boolean(),
  })
  .strict();

const appSettings = [...appSettingsSchema.keyof().options] as const;

export type AppSetting = (typeof appSettings)[number];

const parseBoolean = (value: unknown): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return false;
};

// Variation of the schema that converts the string types in the db to the correct types
export const appSettingPreprocessedSchema = appSettingsSchema.extend({
  initializedAt: z.preprocess((value: unknown) => {
    if (typeof value === 'string' || value instanceof Date) {
      const date = new Date(value);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return value;
  }, z.date()),
  configured: z.preprocess(parseBoolean, z.boolean()).default(false),
  allowAnonymousRecruitment: z
    .preprocess(parseBoolean, z.boolean())
    .default(false),
  limitInterviews: z.preprocess(parseBoolean, z.boolean()).default(false),
  disableAnalytics: z.preprocess(parseBoolean, z.boolean()).default(false),
  uploadThingToken: z.string().optional(),
  installationId: z.string().optional(),
});
