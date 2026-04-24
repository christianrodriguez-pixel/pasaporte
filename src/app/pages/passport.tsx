import { useNavigate } from "react-router";
import { QrCode, Smartphone, Clock, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { AppLogo } from "../components/app-logo";
import { WavePattern } from "../components/wave-pattern";
import { GlassCard } from "../components/glass-card";

export function PassportPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-[#091201] text-center" style={{ fontSize: 24, fontWeight: 600 }}>Mi Pasaporte</h1>
      </div>

      {/* Digital credential card */}
      <div className="px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#59021D]/20"
        >
          {/* Card background */}
          <div className="bg-gradient-to-br from-[#59021D] via-[#6A002C] to-[#091201] p-6 pb-8">
            {/* Wave decoration */}
            <div className="absolute top-0 right-0 opacity-10 w-48 h-24">
              <WavePattern variant="gold" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <AppLogo color="#C5A364" size={28} />
                <span className="text-[#C5A364] tracking-wider" style={{ fontSize: 11, fontWeight: 600 }}>PASAPORTE JOVEN</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-green-500/20 border border-green-400/30">
                <span className="text-green-400" style={{ fontSize: 10, fontWeight: 600 }}>ACTIVO</span>
              </div>
            </div>

            {/* Photo + info */}
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-24 rounded-xl overflow-hidden border-2 border-[#C5A364]/30 flex-shrink-0 bg-[#C5A364]/10 flex items-center justify-center">
                <span className="text-[#C5A364]" style={{ fontSize: 28, fontWeight: 700 }}>MF</span>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white" style={{ fontSize: 18, fontWeight: 600 }}>Maria Fernanda</p>
                <p className="text-white/70" style={{ fontSize: 14 }}>Lopez Garcia</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#C5A364]/70" style={{ fontSize: 11 }}>Vigencia</span>
                  <span className="text-[#C5A364]" style={{ fontSize: 11, fontWeight: 500 }}>31/12/2026</span>
                </div>
              </div>
            </div>

            {/* QR code area */}
            <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div>
                <p className="text-white/50" style={{ fontSize: 10 }}>FOLIO</p>
                <p className="text-[#C5A364] font-mono" style={{ fontSize: 14, fontWeight: 600 }}>PJ-TAM-2026-04821</p>
              </div>
              <button
                onClick={() => navigate("/passport/qr")}
                className="w-16 h-16 rounded-xl bg-white flex items-center justify-center"
              >
                {/* Simple QR placeholder */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="#091201" />
                  <rect x="28" y="4" width="16" height="16" rx="2" fill="#091201" />
                  <rect x="4" y="28" width="16" height="16" rx="2" fill="#091201" />
                  <rect x="8" y="8" width="8" height="8" rx="1" fill="white" />
                  <rect x="32" y="8" width="8" height="8" rx="1" fill="white" />
                  <rect x="8" y="32" width="8" height="8" rx="1" fill="white" />
                  <rect x="11" y="11" width="2" height="2" fill="#091201" />
                  <rect x="35" y="11" width="2" height="2" fill="#091201" />
                  <rect x="11" y="35" width="2" height="2" fill="#091201" />
                  <rect x="28" y="28" width="4" height="4" fill="#091201" />
                  <rect x="34" y="28" width="4" height="4" fill="#091201" />
                  <rect x="40" y="28" width="4" height="4" fill="#091201" />
                  <rect x="28" y="34" width="4" height="4" fill="#091201" />
                  <rect x="40" y="34" width="4" height="4" fill="#091201" />
                  <rect x="28" y="40" width="4" height="4" fill="#091201" />
                  <rect x="34" y="40" width="4" height="4" fill="#091201" />
                  <rect x="40" y="40" width="4" height="4" fill="#091201" />
                </svg>
              </button>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 opacity-8">
              <WavePattern variant="gold" className="h-8" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Actions */}
      <div className="px-5 mt-6 space-y-3">
        <GlassCard className="p-4 flex items-center gap-4" onClick={() => navigate("/passport/qr")}>
          <div className="w-11 h-11 rounded-xl bg-[#DD053E]/10 flex items-center justify-center">
            <QrCode size={22} className="text-[#DD053E]" />
          </div>
          <div className="flex-1">
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Mostrar QR completo</p>
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Para escaneo rapido</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
            <Smartphone size={22} className="text-[#091201]/60" />
          </div>
          <div className="flex-1">
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Anadir a Apple Wallet</p>
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Acceso desde tu billetera</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#091201]/5 flex items-center justify-center">
            <Wallet size={22} className="text-[#091201]/60" />
          </div>
          <div className="flex-1">
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Anadir a Google Wallet</p>
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>Acceso desde tu billetera</p>
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#C5A364]/10 flex items-center justify-center">
            <Clock size={22} className="text-[#C5A364]" />
          </div>
          <div className="flex-1">
            <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 500 }}>Historial de uso</p>
            <p className="text-[#091201]/40" style={{ fontSize: 12 }}>3 usos este mes</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
