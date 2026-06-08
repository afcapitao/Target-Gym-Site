import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";
import { Resend } from "resend";

const router = Router();

const SERVICE_LABELS: Record<string, string> = {
  "personal-training": "Personal Training",
  "group-class": "Aulas de Grupo",
  "nutrition": "Nutrição Desportiva",
  "online-training": "Treino Online",
};

async function sendBookingEmail(booking: {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!apiKey || !adminEmail) return;

  try {
    const resend = new Resend(apiKey);
    const serviceName = SERVICE_LABELS[booking.service] ?? booking.service;

    await resend.emails.send({
      from: "Target Gym <onboarding@resend.dev>",
      to: adminEmail,
      subject: `Nova Reserva — ${booking.name} · ${serviceName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#e61f1f;padding:24px 32px">
            <p style="margin:0;color:#fff;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Target Personal Training Gym</p>
            <h1 style="margin:8px 0 0;color:#fff;font-size:26px;font-weight:900;text-transform:uppercase;letter-spacing:-0.5px">Nova Reserva</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 24px;color:rgba(255,255,255,0.5);font-size:14px">
              Foi recebida uma nova marcação. Confirma ou cancela no painel de admin.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["Cliente", booking.name],
                ["Email", booking.email],
                ["Telefone", booking.phone],
                ["Serviço", serviceName],
                ["Data pretendida", booking.preferredDate],
                ["Hora pretendida", booking.preferredTime],
                ...(booking.message ? [["Mensagem", booking.message]] : []),
              ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.4);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;width:140px">${label}</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#fff;font-size:14px">${value}</td>
              </tr>`).join("")}
            </table>

            <div style="margin-top:28px;text-align:center">
              <a href="https://targetgym.pt/admin"
                style="display:inline-block;background:#e61f1f;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:13px;font-weight:900;letter-spacing:2px;text-transform:uppercase">
                Abrir Painel de Admin
              </a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.05)">
            <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px">
              Target Personal Training Gym · Passeio do Adamastor, Parque das Nações, Lisboa
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
  } catch (err) {
    // Email failure should not break the booking
    console.warn("Email notification failed:", err);
  }
}

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

  // Send email notification (non-blocking)
  sendBookingEmail(booking).catch(() => {});

  res.status(201).json(booking);
});

export default router;
