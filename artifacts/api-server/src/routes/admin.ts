import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

const VALID_STATUSES = ["pending", "confirmed", "cancelled"] as const;
type ValidStatus = (typeof VALID_STATUSES)[number];

function requireAdmin(req: any, res: any): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    res.status(500).json({ error: "ADMIN_PASSWORD environment variable not configured" });
    return false;
  }
  const auth = req.headers.authorization as string | undefined;
  if (!auth?.startsWith("Bearer ") || auth.slice(7) !== adminPassword) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.get("/admin/bookings", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const bookings = await db
    .select()
    .from(bookingsTable)
    .orderBy(desc(bookingsTable.createdAt));
  res.json(bookings);
});

router.patch("/admin/bookings/:id", async (req, res) => {
  if (!requireAdmin(req, res)) return;
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  const status: unknown = req.body?.status;
  if (!VALID_STATUSES.includes(status as ValidStatus)) {
    res.status(400).json({ error: "Estado inválido. Use: pending, confirmed ou cancelled" });
    return;
  }
  const [updated] = await db
    .update(bookingsTable)
    .set({ status: status as ValidStatus })
    .where(eq(bookingsTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Reserva não encontrada" });
    return;
  }
  req.log.info({ bookingId: id, status }, "Booking status updated");
  res.json(updated);
});

export default router;
