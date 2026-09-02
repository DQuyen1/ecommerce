import bcrypt from "bcryptjs";
import Admin from "./models/Admin";

/**
 * Creates the first admin account from ADMIN_USERNAME/ADMIN_PASSWORD if the
 * `admins` collection is empty. Only runs once, ever, on a fresh database —
 * after that, credentials live in Mongo and changing the .env values does
 * nothing until you drop the collection and let this run again.
 */
export async function bootstrapAdmin(): Promise<void> {
  const existing = await Admin.countDocuments();
  if (existing > 0) return;

  const username = (process.env.ADMIN_USERNAME as string).trim().toLowerCase();
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, 10);
  await Admin.create({ username, passwordHash });

  console.log(`Created initial admin account "${username}" from ADMIN_USERNAME/ADMIN_PASSWORD.`);
}
