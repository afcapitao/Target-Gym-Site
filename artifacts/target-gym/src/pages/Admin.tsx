import { useState, useEffect, useCallback } from "react";
import { LogOut, CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "cancelled";

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

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" },
  confirmed: { label: "Confirmada", color: "text-green-400 bg-green-400/10 border-green-400/30" },
  cancelled: { label: "Cancelada", color: "text-red-400 bg-red-400/10 border-red-400/30" },
};

const API_BASE = "/api/admin";

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
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [updating, setUpdating] = useState<number | null>(null);

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
        setFetchError("Sessão expirada. Faz login novamente.");
        return;
      }
      if (!res.ok) throw new Error("Erro ao carregar");
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
      if (res.status === 401) {
        setLoginError("Password incorrecta.");
        return;
      }
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedPass}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated: Booking = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } catch {
      alert("Erro ao actualizar a reserva.");
    } finally {
      setUpdating(null);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("tg_admin_pass");
    setStoredPass("");
    setBookings([]);
    setPassword("");
  };

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  /* ─── Login Screen ───────────────────────────────────────────── */
  if (!storedPass) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="Target Gym" className="h-16 mx-auto mb-4" />
            <h1
              className="text-white font-black uppercase text-2xl tracking-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Painel de Administração
            </h1>
            <p className="text-white/40 text-sm mt-1">Target Personal Training Gym</p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <label className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoFocus
              className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#e61f1f] transition-colors mb-4"
            />
            {loginError && (
              <p className="text-red-400 text-xs mb-4">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-[#e61f1f] text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-[#cc1a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {loginLoading ? "A verificar..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* ─── Dashboard ──────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="bg-[#141414] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Target Gym" className="h-10 w-auto" />
          <span className="bg-[#e61f1f] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchBookings(storedPass)}
            disabled={loading}
            className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs uppercase tracking-wider transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 rounded text-white/50 hover:text-white hover:border-white/50 text-xs uppercase tracking-wider transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {(
            [
              { key: "all", label: "Total", color: "text-white" },
              { key: "pending", label: "Pendentes", color: "text-yellow-400" },
              { key: "confirmed", label: "Confirmadas", color: "text-green-400" },
              { key: "cancelled", label: "Canceladas", color: "text-red-400" },
            ] as const
          ).map((s) => (
            <div
              key={s.key}
              className="bg-[#1a1a1a] rounded-xl p-4 border border-white/5 cursor-pointer hover:border-white/20 transition-colors"
              onClick={() => setFilter(s.key)}
            >
              <p
                className={`text-4xl font-black ${s.color}`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {counts[s.key]}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f
                  ? "bg-[#e61f1f] text-white"
                  : "bg-[#1a1a1a] text-white/40 hover:text-white border border-white/10"
              }`}
            >
              {f === "all"
                ? "Todas"
                : f === "pending"
                ? "Pendentes"
                : f === "confirmed"
                ? "Confirmadas"
                : "Canceladas"}
              <span className="ml-1.5 opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Error */}
        {fetchError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {fetchError}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-white/40">
            <RefreshCw className="animate-spin mx-auto mb-3" size={28} />
            <p className="text-sm">A carregar reservas...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <p
              className="text-xl font-black uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Nenhuma reserva
            </p>
            <p className="text-sm mt-1">
              {filter === "all"
                ? "Ainda não foram feitas reservas."
                : `Sem reservas com estado "${filter}".`}
            </p>
          </div>
        )}

        {/* Bookings */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((booking) => {
              const statusCfg =
                STATUS_CONFIG[booking.status] ?? STATUS_CONFIG["pending"];
              const isUpdating = updating === booking.id;

              return (
                <div
                  key={booking.id}
                  className="bg-[#1a1a1a] rounded-xl border border-white/5 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/10 transition-colors"
                >
                  {/* Left: id + name + contact */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-white/25 text-xs font-mono">#{booking.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                      <span className="text-white/20 text-[10px]">
                        {new Date(booking.createdAt).toLocaleDateString("pt-PT")}
                      </span>
                    </div>
                    <p className="font-bold text-white text-base truncate">{booking.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {booking.email} · {booking.phone}
                    </p>
                    {booking.message && (
                      <p className="text-white/25 text-xs mt-1 truncate italic">
                        "{booking.message}"
                      </p>
                    )}
                  </div>

                  {/* Middle: service + date */}
                  <div className="shrink-0 sm:text-right">
                    <p className="text-sm font-semibold text-white">
                      {SERVICE_LABELS[booking.service] ?? booking.service}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {booking.preferredDate} · {booking.preferredTime}
                    </p>
                  </div>

                  {/* Right: actions */}
                  <div className="flex gap-2 shrink-0 flex-wrap">
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        <CheckCircle size={12} />
                        Confirmar
                      </button>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        <XCircle size={12} />
                        Cancelar
                      </button>
                    )}
                    {booking.status !== "pending" && (
                      <button
                        onClick={() => updateStatus(booking.id, "pending")}
                        disabled={isUpdating}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                      >
                        <Clock size={12} />
                        Pendente
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
