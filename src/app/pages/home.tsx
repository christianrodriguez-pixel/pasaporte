import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, ChevronRight, MapPin, Clock, Wifi } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["Todo", "Cultura", "Comida", "Deporte", "Salud", "Educacion", "Transporte", "Tecnologia"];

const benefits = [
  { id: 1, ally: "Cinepolis", benefit: "2x1 en boletos", mode: "Presencial", exp: "31 Dic 2026", distance: "1.2 km", cat: "Cultura", img: "https://images.unsplash.com/photo-1569409611680-1d67b2f9fed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNpbmVtYSUyMHBvcGNvcm4lMjB0aWNrZXRzfGVufDF8fHx8MTc3NjcwODAwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, ally: "Libreria Porrua", benefit: "15% en material escolar", mode: "Ambas", exp: "30 Jun 2026", distance: "800 m", cat: "Educacion", img: "https://images.unsplash.com/photo-1663229048652-fac7c71030f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBlZHVjYXRpb24lMjBzdXBwbGllc3xlbnwxfHx8fDE3NzY3MDgwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, ally: "Museo de Arte", benefit: "Entrada gratuita los martes", mode: "Presencial", exp: "31 Dic 2026", distance: "2.5 km", cat: "Cultura", img: "https://images.unsplash.com/photo-1694203048551-c85b22a20b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5JTIwZW50cmFuY2V8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, ally: "Gym Iron Fitness", benefit: "30% en membresia mensual", mode: "Presencial", exp: "30 Sep 2026", distance: "3.1 km", cat: "Deporte", img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwc3BvcnRzJTIweW91dGh8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 5, ally: "Tacos Don Pepe", benefit: "Refresco gratis en combo", mode: "Presencial", exp: "28 Feb 2027", distance: "500 m", cat: "Comida", img: "https://images.unsplash.com/photo-1666307551254-eacbfaff5369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMG1leGljYW4lMjB0YWNvc3xlbnwxfHx8fDE3NzY3MDgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function HomePage() {
  const [activeCat, setActiveCat] = useState("Todo");
  const navigate = useNavigate();
  const filtered = activeCat === "Todo" ? benefits : benefits.filter((b) => b.cat === activeCat);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-[#091201]/50" style={{ fontSize: 13 }}>Hola,</p>
          <h2 className="text-[#091201]" style={{ fontSize: 22, fontWeight: 600 }}>Maria Fernanda</h2>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center">
          <Bell size={20} className="text-[#091201]/60" />
        </button>
      </div>

      {/* Passport card */}
      <div className="px-5 mb-6">
        <GlassCard className="p-4" onClick={() => navigate("/passport")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CB0723] to-[#6A002C] flex items-center justify-center">
                <span className="text-white" style={{ fontSize: 14, fontWeight: 700 }}>MF</span>
              </div>
              <div>
                <p className="text-[#091201]" style={{ fontSize: 14, fontWeight: 500 }}>Mi Pasaporte</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-600" style={{ fontSize: 12 }}>Activo</span>
                </div>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#091201]/30" />
          </div>
        </GlassCard>
      </div>

      {/* Benefits section */}
      <div className="px-5 mb-3">
        <h3 className="text-[#091201]" style={{ fontSize: 18, fontWeight: 600 }}>Beneficios disponibles</h3>
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

      {/* Benefit cards */}
      <div className="px-5 space-y-3">
        {filtered.map((b) => (
          <GlassCard key={b.id} className="flex overflow-hidden" onClick={() => navigate(`/benefits/${b.id}`)}>
            <ImageWithFallback src={b.img} alt={b.ally} className="w-24 h-24 object-cover" />
            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
              <div>
                <p className="text-[#091201]" style={{ fontSize: 14, fontWeight: 600 }}>{b.ally}</p>
                <p className="text-[#091201]/70 truncate" style={{ fontSize: 13 }}>{b.benefit}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-[#091201]/40" style={{ fontSize: 11 }}>
                  {b.mode === "Presencial" ? <MapPin size={12} /> : <Wifi size={12} />}
                  {b.mode}
                </span>
                <span className="flex items-center gap-1 text-[#091201]/40" style={{ fontSize: 11 }}>
                  <Clock size={12} />{b.exp}
                </span>
                {b.distance && (
                  <span className="text-[#C5A364]" style={{ fontSize: 11, fontWeight: 500 }}>{b.distance}</span>
                )}
              </div>
            </div>
            <div className="flex items-center pr-3">
              <ChevronRight size={18} className="text-[#091201]/20" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Explore teaser */}
      <div className="px-5 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#091201]" style={{ fontSize: 18, fontWeight: 600 }}>Explora</h3>
          <button onClick={() => navigate("/explore")} className="text-[#DD053E]" style={{ fontSize: 13, fontWeight: 500 }}>Ver todo</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <GlassCard className="min-w-[200px] overflow-hidden flex-shrink-0" onClick={() => navigate("/explore/1")}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771959453981-b5417268a034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBmZXN0aXZhbCUyMHlvdXRoJTIwZXZlbnR8ZW58MXx8fHwxNzc2NzA4MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Evento"
              className="w-full h-28 object-cover"
            />
            <div className="p-3">
              <span className="text-[#DD053E] px-2 py-0.5 rounded-full bg-[#DD053E]/10" style={{ fontSize: 10, fontWeight: 600 }}>Proximo</span>
              <p className="mt-1.5 text-[#091201]" style={{ fontSize: 13, fontWeight: 500 }}>Festival Joven 2026</p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>15 May 2026</p>
            </div>
          </GlassCard>
          <GlassCard className="min-w-[200px] overflow-hidden flex-shrink-0" onClick={() => navigate("/explore/2")}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBjb2RpbmclMjB5b3V0aHxlbnwxfHx8fDE3NzY3MDgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Taller"
              className="w-full h-28 object-cover"
            />
            <div className="p-3">
              <span className="text-[#C5A364] px-2 py-0.5 rounded-full bg-[#C5A364]/10" style={{ fontSize: 10, fontWeight: 600 }}>Nuevo</span>
              <p className="mt-1.5 text-[#091201]" style={{ fontSize: 13, fontWeight: 500 }}>Taller de Programacion</p>
              <p className="text-[#091201]/40" style={{ fontSize: 11 }}>20 May 2026</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
