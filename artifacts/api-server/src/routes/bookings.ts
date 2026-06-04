import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";

const router = Router();

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos" });
    return;
  }

  const data = parsed.data;
  const [booking] = await db
    .insert(bookingsTable)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      message: data.message ?? null,
    })
    .returning();

  req.log.info({ bookingId: booking.id }, "Booking created");
  res.status(201).json(booking);
});

export default router;
