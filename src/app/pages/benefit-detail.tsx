import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Clock, Wifi, Globe, Share2, QrCode } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GlassCard } from "../components/glass-card";

const allBenefits: Record<string, { ally: string; benefit: string; desc: string; terms: string; mode: string; exp: string; img: string }> = {
  "1": { ally: "Cinepolis", benefit: "2x1 en boletos de cine", desc: "Presenta tu Pasaporte Joven en taquilla y obtiene dos boletos por el precio de uno. Aplica de lunes a jueves en todas las salas excepto VIP y 4DX.", terms: "Valido de lunes a jueves. No acumulable con otras promociones. Maximo 2 boletos por transaccion. Sujeto a disponibilidad.", mode: "Presencial", exp: "31 Dic 2026", img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNpbmVtYSUyMHBvcGNvcm4lMjB0aWNrZXRzfGVufDF8fHx8MTc3NjcwODAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  "2": { ally: "Libreria Porrua", benefit: "15% de descuento en material escolar", desc: "Descuento en toda la linea de cuadernos, plumas, colores y material escolar general.", terms: "Aplica solo en material escolar. No incluye libros ni electronica. Descuento aplicado en caja.", mode: "Ambas", exp: "30 Jun 2026", img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBlZHVjYXRpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzY3MDgwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  "3": { ally: "Museo de Arte Contemporaneo", benefit: "Entrada gratuita los martes", desc: "Accede gratuitamente a todas las salas del museo cada martes presentando tu Pasaporte Joven.", terms: "Solo martes. Horario regular del museo. No incluye exposiciones especiales con boleto independiente.", mode: "Presencial", exp: "31 Dic 2026", img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5JTIwZW50cmFuY2V8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
};

export function BenefitDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const b = allBenefits[id || "1"] || allBenefits["1"];

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-28">
      {/* Hero */}
      <div className="relative h-56">
        <ImageWithFallback src={b.img} alt={b.ally} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#091201]" />
        </button>
      </div>

      <div className="px-5 -mt-6 relative">
        <GlassCard className="p-5">
          <p className="text-[#C5A364]" style={{ fontSize: 13, fontWeight: 600 }}>{b.ally}</p>
          <h1 className="text-[#091201] mt-1" style={{ fontSize: 22, fontWeight: 600 }}>{b.benefit}</h1>

          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1 text-[#091201]/50" style={{ fontSize: 12 }}>
              {b.mode === "Presencial" ? <MapPin size={14} /> : <Wifi size={14} />}
              {b.mode}
            </span>
            <span className="flex items-center gap-1 text-[#091201]/50" style={{ fontSize: 12 }}>
              <Clock size={14} />Vigente hasta {b.exp}
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="px-5 mt-5">
        <h3 className="text-[#091201] mb-2" style={{ fontSize: 16, fontWeight: 600 }}>Descripcion</h3>
        <p className="text-[#091201]/60" style={{ fontSize: 14, lineHeight: 1.7 }}>{b.desc}</p>
      </div>

      <div className="px-5 mt-5">
        <h3 className="text-[#091201] mb-2" style={{ fontSize: 16, fontWeight: 600 }}>Terminos y condiciones</h3>
        <p className="text-[#091201]/50" style={{ fontSize: 13, lineHeight: 1.7 }}>{b.terms}</p>
      </div>

      {/* Actions */}
      <div className="px-5 mt-6 flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
          <MapPin size={16} /> Ubicacion
        </button>
        <button className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
          <Globe size={16} /> Sitio web
        </button>
        <button className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
          <Share2 size={16} /> Compartir
        </button>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-gradient-to-t from-[#F9F7EB] to-transparent">
        <button
          onClick={() => navigate("/passport/qr")}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white flex items-center justify-center gap-2 shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          <QrCode size={20} /> Usar con mi pasaporte
        </button>
      </div>
    </div>
  );
}
