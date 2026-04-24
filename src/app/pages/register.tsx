import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { AppLogo } from "../components/app-logo";

export function RegisterPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/profile-setup");
  };

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] flex flex-col px-6 pt-16 pb-8">
      <div className="flex flex-col items-center mb-10">
        <AppLogo color="#59021D" size={64} />
        <h1 className="mt-4 text-[#091201]" style={{ fontSize: 24, fontWeight: 600 }}>
          {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
        </h1>
        <p className="text-[#091201]/50 mt-1" style={{ fontSize: 14 }}>
          {isLogin ? "Ingresa tus datos para continuar" : "Registrate para obtener tu Pasaporte Joven"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <div>
            <label className="text-[#091201]/70 mb-1.5 block" style={{ fontSize: 13, fontWeight: 500 }}>CURP</label>
            <input
              type="text"
              placeholder="Ingresa tu CURP"
              className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all"
              style={{ fontSize: 15 }}
              maxLength={18}
            />
          </div>
        )}

        <div>
          <label className="text-[#091201]/70 mb-1.5 block" style={{ fontSize: 13, fontWeight: 500 }}>Correo electronico</label>
          <input
            type="email"
            placeholder="tu@correo.com"
            className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all"
            style={{ fontSize: 15 }}
          />
        </div>

        <div>
          <label className="text-[#091201]/70 mb-1.5 block" style={{ fontSize: 13, fontWeight: 500 }}>Contrasena</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Crea una contrasena"
              className="w-full px-4 py-3.5 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 text-[#091201] placeholder:text-[#091201]/30 focus:outline-none focus:ring-2 focus:ring-[#DD053E]/20 focus:border-[#DD053E]/30 transition-all pr-12"
              style={{ fontSize: 15 }}
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#091201]/30"
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          {isLogin ? "Iniciar sesion" : "Registrarme"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[#DD053E]"
          style={{ fontSize: 14, fontWeight: 500 }}
        >
          {isLogin ? "No tengo cuenta, registrarme" : "Ya tengo cuenta, iniciar sesion"}
        </button>
      </div>
    </div>
  );
}
