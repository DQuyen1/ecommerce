import { SchemaOptions } from "mongoose";

// Exposes `id` instead of Mongo's `_id`/`__v` in API responses.
export const toJSONOptions: SchemaOptions["toJSON"] = {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Record<string, unknown>) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
};
