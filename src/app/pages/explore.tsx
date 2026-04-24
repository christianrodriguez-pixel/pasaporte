import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Calendar, Clock } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const types = ["Todo", "Eventos", "Cursos", "Convocatorias", "Actividades"];

const items = [
  { id: 1, title: "Festival Joven 2026", type: "Eventos", date: "15 May 2026", location: "Parque Bicentenario, Victoria", tag: "Proximo", tagColor: "#DD053E", img: "https://images.unsplash.com/photo-1771959453981-b5417268a034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBmZXN0aXZhbCUyMHlvdXRoJTIwZXZlbnR8ZW58MXx8fHwxNzc2NzA4MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 2, title: "Taller de Programacion Web", type: "Cursos", date: "20 May - 15 Jun 2026", location: "En linea", tag: "Nuevo", tagColor: "#C5A364", img: "https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBjb2RpbmclMjB5b3V0aHxlbnwxfHx8fDE3NzY3MDgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 3, title: "Convocatoria Becas Tamaulipas", type: "Convocatorias", date: "Cierra 30 Abr 2026", location: "En linea", tag: "Cierra pronto", tagColor: "#DD053E", img: "https://images.unsplash.com/photo-1604186837076-fb47786f63ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1leGljYW4lMjBzdHVkZW50cyUyMGNhbXB1c3xlbnwxfHx8fDE3NzY3MDgwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 4, title: "Torneo Deportivo Juvenil", type: "Actividades", date: "10 Jun 2026", location: "Centro Deportivo, Reynosa", tag: "Proximo", tagColor: "#59021D", img: "https://images.unsplash.com/photo-1734668485187-6cb87df5d315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjBmaXRuZXNzJTIwc3BvcnRzJTIweW91dGh8ZW58MXx8fHwxNzc2NzA4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { id: 5, title: "Feria de Empleo Joven", type: "Eventos", date: "25 May 2026", location: "Centro de Convenciones, Tampico", tag: "Nuevo", tagColor: "#C5A364", img: "https://images.unsplash.com/photo-1595079836278-25b7ad6d5ddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY3JlZGVudGlhbHMlMjBRUiUyMGNvZGUlMjBtb2JpbGV8ZW58MXx8fHwxNzc2NzA4MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function ExplorePage() {
  const [activeType, setActiveType] = useState("Todo");
  const navigate = useNavigate();
  const filtered = activeType === "Todo" ? items : items.filter((i) => i.type === activeType);

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-24">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-[#091201]" style={{ fontSize: 24, fontWeight: 600 }}>Explora</h1>
      </div>

      {/* Search */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl px-4 py-3">
          <Search size={18} className="text-[#091201]/30" />
          <input placeholder="Buscar eventos, cursos..." className="flex-1 bg-transparent outline-none text-[#091201] placeholder:text-[#091201]/30" style={{ fontSize: 14 }} />
        </div>
      </div>

      {/* Type chips */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeType === t
                ? "bg-[#59021D] text-white"
                : "bg-white/60 backdrop-blur-sm border border-white/40 text-[#091201]/70"
            }`}
            style={{ fontSize: 13, fontWeight: 500 }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Featured */}
      {activeType === "Todo" && (
        <div className="px-5 mb-5">
          <GlassCard className="overflow-hidden" onClick={() => navigate("/explore/1")}>
            <ImageWithFallback
              src={items[0].img}
              alt={items[0].title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full text-white" style={{ background: items[0].tagColor, fontSize: 10, fontWeight: 600 }}>{items[0].tag}</span>
                <span className="text-[#091201]/40" style={{ fontSize: 11 }}>{items[0].type}</span>
              </div>
              <p className="text-[#091201]" style={{ fontSize: 17, fontWeight: 600 }}>{items[0].title}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-[#091201]/50" style={{ fontSize: 12 }}><Calendar size={13} />{items[0].date}</span>
                <span className="text-[#091201]/50" style={{ fontSize: 12 }}>{items[0].location}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* List */}
      <div className="px-5 space-y-3">
        <h3 className="text-[#091201] mb-1" style={{ fontSize: 16, fontWeight: 600 }}>
          {activeType === "Todo" ? "Proximos" : activeType}
        </h3>
        {(activeType === "Todo" ? filtered.slice(1) : filtered).map((item) => (
          <GlassCard key={item.id} className="flex overflow-hidden" onClick={() => navigate(`/explore/${item.id}`)}>
            <ImageWithFallback src={item.img} alt={item.title} className="w-24 h-24 object-cover" />
            <div className="flex-1 p-3 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full" style={{ background: `${item.tagColor}15`, color: item.tagColor, fontSize: 10, fontWeight: 600 }}>{item.tag}</span>
              </div>
              <p className="text-[#091201] truncate" style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-[#091201]/40" />
                <span className="text-[#091201]/50" style={{ fontSize: 12 }}>{item.date}</span>
              </div>
              <p className="text-[#091201]/40 truncate" style={{ fontSize: 11 }}>{item.location}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
