import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Clock, Wifi, ChevronRight, Search } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["Todo", "Cultura", "Comida", "Deporte", "Salud", "Educacion", "Transporte", "Tecnologia"];

const benefits = [
  { id: 1, ally: "Cinepolis", benefit: "2x1 en boletos de cine", desc: "Aplica de lunes a jueves en todas las salas excepto VIP y 4DX.", mode: "Presencial", exp: "31 Dic 2026", distance: "1.2 km", cat: "Cultura", img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNpbmVtYSUyMHBvcGNvcm4lMjB0aWNrZXRzfGVufDF8fHx8MTc3NjcwODAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, ally: "Libreria Porrua", benefit: "15% de descuento en material escolar", desc: "En toda la linea de cuadernos, plumas y material escolar.", mode: "Ambas", exp: "30 Jun 2026", distance: "800 m", cat: "Educacion", img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBlZHVjYXRpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzY3MDgwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, ally: "Museo de Arte Contemporaneo", benefit: "Entrada gratuita los martes", desc: "Acceso libre a todas las salas permanentes y temporales.", mode: "Presencial", exp: "31 Dic 2026", distance: "2.5 km", cat: "Cultura", img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5JTIwZW50cmFuY2V8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, ally: "Gym Iron Fitness", benefit: "30% en membresia mensual", desc: "Acceso a todas las areas del gimnasio.", mode: "Presencial", exp: "30 Sep 2026", distance: "3.1 km", cat: "Deporte", img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwc3BvcnRzJTIweW91dGh8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 5, ally: "Tacos Don Pepe", benefit: "Refresco gratis en combo", desc: "Aplica en combos individuales de $80 o mas.", mode: "Presencial", exp: "28 Feb 2027", distance: "500 m", cat: "Comida", img: "https://images.unsplash.com/photo-1666307551254-eacbfaff5369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1leGljYW4lMjB0YWNvc3xlbnwxfHx8fDE3NzY3MDgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 6, ally: "Clinica Salud Total", benefit: "Consulta medica gratuita", desc: "Una consulta general al mes sin costo.", mode: "Presencial", exp: "31 Dic 2026", distance: "4 km", cat: "Salud", img: "https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGljYWwlMjBjaGVja3VwfGVufDF8fHx8MTc3NjcwODAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 7, ally: "TransBus Tamaulipas", benefit: "50% en tarjeta de transporte", desc: "Recarga tu tarjeta con descuento del 50%.", mode: "Presencial", exp: "31 Dic 2026", distance: "—", cat: "Transporte", img: "https://images.unsplash.com/photo-1760488604779-ae77ea1d60ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBidXMlMjB0cmFuc3BvcnRhdGlvbiUyMGNpdHl8ZW58MXx8fHwxNzc2NzA4MDExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function BenefitsPage() {
  const [activeCat, setActiveCat] = useState("Todo");
  const navigate = useNavigate();
  const filtered = activeCat === "Todo" ? benefits : benefits.filter((b) => b.cat === activeCat);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-[#091201]" style={{ fontSize: 24, fontWeight: 600 }}>Beneficios</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3">
          <Search size={18} className="text-[#091201]/30" />
          <input placeholder="Buscar beneficios..." className="flex-1 bg-transparent outline-none text-[#091201] placeholder:text-[#091201]/30" style={{ fontSize: 14 }} />
        </div>
      </div>

      {/* Summary card */}
      <div className="px-5 mb-5">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#091201]/50" style={{ fontSize: 12 }}>Beneficios activos</p>
              <p className="text-[#091201]" style={{ fontSize: 28, fontWeight: 700 }}>{benefits.length}</p>
            </div>
            <button
              onClick={() => {/* could open map */}}
              className="px-4 py-2 rounded-xl bg-[#DD053E]/10 text-[#DD053E]"
              style={{ fontSize: 13, fontWeight: 500 }}
            >
              Ver cercanos
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeCat === cat
                ? "bg-[#DD053E] text-white shadow-sm shadow-[#DD053E]/20"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Benefit list */}
      <div className="px-5 space-y-3">
        {filtered.map((b) => (
          <GlassCard key={b.id} className="overflow-hidden" onClick={() => navigate(`/benefits/${b.id}`)}>
            <div className="flex">
              <ImageWithFallback src={b.img} alt={b.ally} className="w-28 h-28 object-cover" />
              <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                <div>
                  <p className="text-[#091201]" style={{ fontSize: 15, fontWeight: 600 }}>{b.ally}</p>
                  <p className="text-[#091201]/70 line-clamp-2" style={{ fontSize: 13 }}>{b.benefit}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1 text-[#091201]/40" style={{ fontSize: 11 }}>
                    {b.mode === "Presencial" ? <MapPin size={12} /> : <Wifi size={12} />}
                    {b.mode}
                  </span>
                  <span className="flex items-center gap-1 text-[#091201]/40" style={{ fontSize: 11 }}>
                    <Clock size={12} />{b.exp}
                  </span>
                </div>
              </div>
              <div className="flex items-center pr-3">
                <ChevronRight size={18} className="text-[#091201]/20" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
