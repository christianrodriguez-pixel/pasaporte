import { useNavigate } from "react-router";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { AppLogo } from "../components/app-logo";

export function QRFullscreenPage() {
  const navigate = useNavigate();

  return (
    <div className="h-dvh w-full bg-white flex flex-col items-center justify-between px-6 pt-14 pb-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AppLogo color="#59021D" size={24} />
          <span className="text-[#59021D]" style={{ fontSize: 13, fontWeight: 600 }}>Pasaporte Joven</span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-[#F9F7EB] flex items-center justify-center"
        >
          <X size={18} className="text-[#091201]" />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        {/* QR Code */}
        <div className="w-64 h-64 bg-white rounded-3xl border-2 border-[#091201]/5 p-4 shadow-lg flex items-center justify-center">
          <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
            {/* QR pattern - top left finder */}
            <rect x="10" y="10" width="60" height="60" rx="6" fill="#091201" />
            <rect x="18" y="18" width="44" height="44" rx="3" fill="white" />
            <rect x="26" y="26" width="28" height="28" rx="2" fill="#091201" />
            {/* top right finder */}
            <rect x="150" y="10" width="60" height="60" rx="6" fill="#091201" />
            <rect x="158" y="18" width="44" height="44" rx="3" fill="white" />
            <rect x="166" y="26" width="28" height="28" rx="2" fill="#091201" />
            {/* bottom left finder */}
            <rect x="10" y="150" width="60" height="60" rx="6" fill="#091201" />
            <rect x="18" y="158" width="44" height="44" rx="3" fill="white" />
            <rect x="26" y="166" width="28" height="28" rx="2" fill="#091201" />
            {/* Data modules */}
            {[80,90,100,110,120,130].map(x =>
              [80,90,100,110,120,130,140,150,160,170].map(y => (
                (x + y) % 20 === 0 || (x * y) % 30 < 15 ? (
                  <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                ) : null
              ))
            )}
            {[10,20,30,40,50,80,90,100,110,120,130,140].map(x =>
              [80,90,100,110,120,130,140].map(y => (
                (x + y) % 30 < 10 ? (
                  <rect key={`b${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                ) : null
              ))
            )}
            {[80,90,100,110,120,130,140,150,160].map(x =>
              [10,20,30,40,50,60].map(y => (
                (x * y) % 25 < 8 ? (
                  <rect key={`c${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                ) : null
              ))
            )}
            {[150,160,170,180,190,200].map(x =>
              [80,90,100,110,120,130,140,150,160,170,180,190,200].map(y => (
                (x + y) % 25 < 10 ? (
                  <rect key={`d${x}-${y}`} x={x} y={y} width="8" height="8" rx="1" fill="#091201" />
                ) : null
              ))
            )}
          </svg>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#091201]" style={{ fontSize: 18, fontWeight: 600 }}>Maria Fernanda Lopez</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-green-600" style={{ fontSize: 13, fontWeight: 500 }}>Pasaporte Activo</span>
          </div>
          <p className="text-[#091201]/40 font-mono mt-2" style={{ fontSize: 12 }}>PJ-TAM-2026-04821</p>
        </div>
      </motion.div>

      <div className="text-center">
        <p className="text-[#091201]/40" style={{ fontSize: 13 }}>Presenta este codigo para que sea escaneado</p>
        <p className="text-[#091201]/25 mt-1" style={{ fontSize: 11 }}>El codigo se actualiza automaticamente</p>
      </div>
    </div>
  );
}
