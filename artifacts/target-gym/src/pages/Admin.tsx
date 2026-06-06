import { useState, useEffect, useCallback } from "react";
import {
  LogOut, CheckCircle, XCircle, Clock, RefreshCw,
  Users, Calendar, TrendingUp, BarChart2, Search,
} from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "cancelled";
type Tab = "bookings" | "report";

interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: string;
  createdAt: string;
}

const SERVICE_LABELS: Record<string, string> = {
  "personal-training": "Personal Training",
  "group-class": "Aulas de Grupo",
  "nutrition": "Nutrição Desportiva",
  "online-training": "Treino Online",
};

const SERVICE_COLORS: Record<string, string> = {
  "personal-training": "bg-blue-500",
  "group-class": "bg-purple-500",
  "nutrition": "bg-green-500",
  "online-training": "bg-orange-500",
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  confirmed: { label: "Confirmada", color: "text-green-400 bg-green-400/10 border-green-400/30" },
  cancelled: { label: "Cancelada", color: "text-red-400 bg-red-400/10 border-red-400/30" },
};

const API_BASE = "/api/admin";

/* ─── Helpers ──────────────────────────────────────────────────── */
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-PT", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["pending"];
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

/* ─── Unique clients derived from bookings ─────────────────────── */
interface ClientSummary {
  email: string;
  name: string;
  phone: string;
  services: string[];
  bookingCount: number;
  lastBooking: string;
  status: string;
}

function buildClients(bookings: Booking[]): ClientSummary[] {
  const map = new Map<string, ClientSummary>();
  for (const b of bookings) {
    const key = b.email.toLowerCase();
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        email: b.email,
        name: b.name,
        phone: b.phone,
        services: [b.service],
        bookingCount: 1,
        lastBooking: b.createdAt,
        status: b.status,
      });
    } else {
      existing.bookingCount += 1;
      if (!existing.services.includes(b.service)) existing.services.push(b.service);
      if (b.createdAt > existing.lastBooking) {
        existing.lastBooking = b.createdAt;
        existing.status = b.status;
      }
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastBooking).getTime() - new Date(a.lastBooking).getTime()
  );
}

/* ─── Service breakdown ────────────────────────────────────────── */
function buildServiceBreakdown(bookings: Booking[]) {
  const counts: Record<string, number> = {};
  for (const b of bookings) {
    counts[b.service] = (counts[b.service] ?? 0) + 1;
  }
  const total = bookings.length || 1;
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([service, count]) => ({
      service,
      count,
      pct: Math.round((count / total) * 100),
    }));
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Admin() {
  const [password, setPassword] = useState("");
  const [storedPass, setStoredPass] = useState(
    () => sessionStorage.getItem("tg_admin_pass") ?? ""
  );
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [tab, setTab] = useState<Tab>("bookings");

  // Bookings tab state
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  // Report tab state
  const [clientSearch, setClientSearch] = useState("");

  const fetchBookings = useCallback(async (pass: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${pass}` },
      });
      if (res.status === 401) {
        sessionStorage.removeItem("tg_admin_pass");
        setStoredPass("");
        return;
      }
      if (!res.ok) throw new Error();
      setBookings(await res.json());
    } catch {
      setFetchError("Não foi possível carregar as reservas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (storedPass) fetchBookings(storedPass);
  }, [storedPass, fetchBookings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.status === 401) { setLoginError("Password incorrecta."); return; }
      if (!res.ok) throw new Error();
      sessionStorage.setItem("tg_admin_pass", password);
      setStoredPass(password);
      setBookings(await res.json());
    } catch {
      setLoginError("Erro de ligação ao servidor.");
    } finally {
      setLoginLoading(false);
    }
  };

  const updateStatus = async (id: number, status: BookingStatus) => {
    setUpdating(id);
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${storedPass}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated: Booking = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } catch {
      alert("Erro ao actualizar.");
    } finally {
      setUpdating(null);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("tg_admin_pass");
    setStoredPass(""); setBookings([]); setPassword("");
  };

  /* ─── Derived data ─────────────────────────────────────────── */
  const filteredBookings = bookings
    .filter((b) => filter === "all" || b.status === filter)
    .filter((b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search)
    );

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const clients = buildClients(bookings);
  const filteredClients = clients.filter(
    (c) =>
      !clientSearch ||
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.phone.includes(clientSearch)
  );
  const serviceBreakdown = buildServiceBreakdown(bookings);
  const conversionRate =
    bookings.length > 0
      ? Math.round((counts.confirmed / bookings.length) * 100)
      : 0;

  /* ════════════════════════════════════════════════════════════
     LOGIN SCREEN
  ═══════════════════════════════════════════════════════════ */
  if (!storedPass) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Target Gym" className="h-16 mx-auto mb-4" />
            <h1 className="text-white font-black uppercase text-2xl tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Painel de Administração
            </h1>
            <p className="text-white/40 text-sm mt-1">Target Personal Training Gym</p>
          </div>
          <form onSubmit={handleLogin}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required autoFocus
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors mb-4"
            />
            {loginError && <p className="text-red-400 text-xs mb-4">{loginError}</p>}
            <button type="submit" disabled={loginLoading}
              className="w-full py-3 bg-[#e61f1f] text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-[#cc1a1a] transition-colors disabled:opacity-60"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {loginLoading ? "A verificar..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════
     DASHBOARD
  ═══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="bg-[#141414] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Target Gym" className="h-10 w-auto" />
          <span className="bg-[#e61f1f] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => fetchBookings(storedPass)} disabled={loading}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs uppercase tracking-wider transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
          <button onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded text-white/50 hover:text-white hover:border-white/50 text-xs uppercase tracking-wider transition-colors">
            <LogOut size={14} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Top stats ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {([
            { label: "Total Reservas", value: counts.all, color: "text-white", icon: Calendar },
            { label: "Pendentes", value: counts.pending, color: "text-yellow-400", icon: Clock },
            { label: "Confirmadas", value: counts.confirmed, color: "text-green-400", icon: CheckCircle },
            { label: "Clientes Únicos", value: clients.length, color: "text-[#e61f1f]", icon: Users },
          ] as const).map((s) => (
            <div key={s.label} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                <s.icon size={14} className="text-white/20" />
              </div>
              <p className={`text-4xl font-black ${s.color}`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tabs ─────────────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 bg-[#1a1a1a] rounded-xl p-1 w-fit border border-white/5">
          {([
            { key: "bookings", label: "Reservas", icon: Calendar },
            { key: "report", label: "Relatório de Clientes", icon: BarChart2 },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                tab === t.key ? "bg-[#e61f1f] text-white" : "text-white/40 hover:text-white"
              }`}>
              <t.icon size={13} />
              {t.label}
            </button>
          ))}
        </div>

        {fetchError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {fetchError}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-white/40">
            <RefreshCw className="animate-spin mx-auto mb-3" size={28} />
            <p className="text-sm">A carregar...</p>
          </div>
        ) : (
          <>
            {/* ════════════════════════════════════════════════
                TAB: RESERVAS
            ════════════════════════════════════════════════ */}
            {tab === "bookings" && (
              <div>
                {/* Filters row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-5">
                  {/* Search */}
                  <div className="relative flex-1 max-w-xs">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      value={search} onChange={(e) => setSearch(e.target.value)}
                      placeholder="Pesquisar nome, email..."
                      className="w-full pl-9 pr-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors"
                    />
                  </div>

                  {/* Status filters */}
                  <div className="flex gap-2 flex-wrap">
                    {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                          filter === f
                            ? "bg-[#e61f1f] text-white"
                            : "bg-[#1a1a1a] text-white/40 hover:text-white border border-white/10"
                        }`}>
                        {f === "all" ? "Todas" : f === "pending" ? "Pendentes"
                          : f === "confirmed" ? "Confirmadas" : "Canceladas"}
                        <span className="ml-1 opacity-70">({counts[f]})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="text-center py-20 text-white/30">
                    <p className="text-xl font-black uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Nenhuma reserva encontrada
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredBookings.map((booking) => {
                      const isUpdating = updating === booking.id;
                      return (
                        <div key={booking.id}
                          className="bg-[#1a1a1a] rounded-xl border border-white/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/10 transition-colors">

                          {/* Left */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-white/25 text-xs font-mono">#{booking.id}</span>
                              <StatusBadge status={booking.status} />
                              <span className="text-white/20 text-[10px]">{fmtDate(booking.createdAt)}</span>
                            </div>
                            <p className="font-bold text-white text-base truncate">{booking.name}</p>
                            <p className="text-white/40 text-xs mt-0.5">
                              {booking.email} · {booking.phone}
                            </p>
                            {booking.message && (
                              <p className="text-white/25 text-xs mt-1 truncate italic">"{booking.message}"</p>
                            )}
                          </div>

                          {/* Middle */}
                          <div className="shrink-0 sm:text-right">
                            <p className="text-sm font-semibold text-white">
                              {SERVICE_LABELS[booking.service] ?? booking.service}
                            </p>
                            <p className="text-white/40 text-xs mt-0.5">
                              {booking.preferredDate} · {booking.preferredTime}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 shrink-0 flex-wrap">
                            {booking.status !== "confirmed" && (
                              <button onClick={() => updateStatus(booking.id, "confirmed")}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50">
                                <CheckCircle size={12} /> Confirmar
                              </button>
                            )}
                            {booking.status !== "cancelled" && (
                              <button onClick={() => updateStatus(booking.id, "cancelled")}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50">
                                <XCircle size={12} /> Cancelar
                              </button>
                            )}
                            {booking.status !== "pending" && (
                              <button onClick={() => updateStatus(booking.id, "pending")}
                                disabled={isUpdating}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50">
                                <Clock size={12} /> Pendente
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════
                TAB: RELATÓRIO
            ════════════════════════════════════════════════ */}
            {tab === "report" && (
              <div className="space-y-8">

                {/* KPI cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {([
                    { label: "Clientes Únicos", value: clients.length, color: "text-white" },
                    { label: "Taxa de Conversão", value: `${conversionRate}%`, color: "text-green-400" },
                    { label: "Confirmadas", value: counts.confirmed, color: "text-green-400" },
                    { label: "Canceladas", value: counts.cancelled, color: "text-red-400" },
                  ]).map((kpi) => (
                    <div key={kpi.label} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5">
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-2">{kpi.label}</p>
                      <p className={`text-4xl font-black ${kpi.color}`}
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {kpi.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Service breakdown */}
                <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
                  <h2 className="text-white font-black uppercase text-lg mb-5 flex items-center gap-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <TrendingUp size={18} className="text-[#e61f1f]" />
                    Reservas por Serviço
                  </h2>
                  {serviceBreakdown.length === 0 ? (
                    <p className="text-white/30 text-sm">Sem dados ainda.</p>
                  ) : (
                    <div className="space-y-4">
                      {serviceBreakdown.map((s) => (
                        <div key={s.service}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white text-sm font-semibold">
                              {SERVICE_LABELS[s.service] ?? s.service}
                            </span>
                            <span className="text-white/50 text-xs">
                              {s.count} reserva{s.count !== 1 ? "s" : ""} · {s.pct}%
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${SERVICE_COLORS[s.service] ?? "bg-[#e61f1f]"}`}
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Clients table */}
                <div className="bg-[#1a1a1a] rounded-xl border border-white/5 p-6">
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                    <h2 className="text-white font-black uppercase text-lg flex items-center gap-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      <Users size={18} className="text-[#e61f1f]" />
                      Todos os Clientes ({clients.length})
                    </h2>
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        value={clientSearch} onChange={(e) => setClientSearch(e.target.value)}
                        placeholder="Filtrar clientes..."
                        className="pl-8 pr-4 py-1.5 bg-[#111] border border-white/10 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors w-48"
                      />
                    </div>
                  </div>

                  {filteredClients.length === 0 ? (
                    <p className="text-white/30 text-sm py-8 text-center">Nenhum cliente encontrado.</p>
                  ) : (
                    <div className="space-y-2">
                      {filteredClients.map((client, i) => (
                        <div key={client.email}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-[#111] border border-white/5 hover:border-white/10 transition-colors">

                          {/* Avatar + name */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-9 h-9 rounded-full bg-[#e61f1f]/20 border border-[#e61f1f]/30 flex items-center justify-center text-[#e61f1f] text-xs font-black flex-shrink-0"
                              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                              {client.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-white text-sm truncate">{client.name}</p>
                              <p className="text-white/40 text-xs truncate">{client.email}</p>
                            </div>
                          </div>

                          {/* Phone */}
                          <p className="text-white/50 text-xs shrink-0">{client.phone}</p>

                          {/* Services */}
                          <div className="flex gap-1.5 flex-wrap shrink-0">
                            {client.services.map((s) => (
                              <span key={s}
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/10">
                                {SERVICE_LABELS[s] ?? s}
                              </span>
                            ))}
                          </div>

                          {/* Bookings count */}
                          <div className="text-right shrink-0">
                            <p className="text-white/25 text-[10px]">
                              {client.bookingCount} reserva{client.bookingCount !== 1 ? "s" : ""}
                            </p>
                            <p className="text-white/25 text-[10px]">{fmtDate(client.lastBooking)}</p>
                          </div>

                          {/* Last status */}
                          <StatusBadge status={client.status} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
