import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { AppLogo } from "../components/app-logo";
import { WavePattern } from "../components/wave-pattern";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/onboarding"), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-gradient-to-b from-[#F9F7EB] to-[#DBC8A7] flex flex-col items-center justify-center">
      {/* Decorative waves */}
      <div className="absolute bottom-0 left-0 right-0 opacity-10">
        <WavePattern variant="gold" className="h-32" />
      </div>
      <div className="absolute top-0 left-0 right-0 opacity-8 rotate-180">
        <WavePattern variant="red" className="h-24" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <AppLogo color="#59021D" size={140} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[#091201] tracking-tight" style={{ fontSize: 28, fontWeight: 600 }}>Pasaporte Joven</h1>
          <p className="text-[#59021D]/70 mt-1" style={{ fontSize: 14 }}>Gobierno de Tamaulipas</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 flex gap-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C5A364]"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
