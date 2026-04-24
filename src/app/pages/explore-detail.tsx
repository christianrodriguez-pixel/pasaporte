import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, MapPin, Share2, Bookmark } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GlassCard } from "../components/glass-card";

const allItems: Record<string, { title: string; type: string; date: string; location: string; desc: string; reqs: string; img: string }> = {
  "1": { title: "Festival Joven 2026", type: "Evento", date: "15 de mayo de 2026, 16:00 hrs", location: "Parque Bicentenario, Cd. Victoria", desc: "Un dia lleno de musica en vivo, actividades recreativas, stands informativos y networking para jovenes de todo Tamaulipas. Habra food trucks, zona de emprendedores y activaciones culturales.", reqs: "Tener Pasaporte Joven activo. Registro previo en la app.", img: "https://images.unsplash.com/photo-1771959453981-b5417268a034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWMlMjBmZXN0aXZhbCUyMHlvdXRoJTIwZXZlbnR8ZW58MXx8fHwxNzc2NzA4MDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  "2": { title: "Taller de Programacion Web", type: "Curso", date: "20 mayo - 15 junio, 2026", location: "En linea (Zoom)", desc: "Aprende los fundamentos de HTML, CSS y JavaScript en este curso intensivo de 4 semanas. Ideal para principiantes que quieran iniciar en el mundo tech.", reqs: "Computadora con acceso a internet. Sin conocimiento previo necesario.", img: "https://images.unsplash.com/photo-1632835298280-ad3d64834ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwd29ya3Nob3AlMjBjb2RpbmclMjB5b3V0aHxlbnwxfHx8fDE3NzY3MDgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  "3": { title: "Convocatoria Becas Tamaulipas", type: "Convocatoria", date: "Cierra 30 de abril de 2026", location: "En linea", desc: "Programa de becas para jovenes tamaulipecos que deseen continuar sus estudios de nivel superior. Cubre colegiaturas y materiales.", reqs: "Ser residente de Tamaulipas. Promedio minimo de 8.0. Estar inscrito en nivel superior.", img: "https://images.unsplash.com/photo-1604186837076-fb47786f63ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1leGljYW4lMjBzdHVkZW50cyUyMGNhbXB1c3xlbnwxfHx8fDE3NzY3MDgwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
};

export function ExploreDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = allItems[id || "1"] || allItems["1"];

  return (
    <div className="min-h-dvh w-full bg-[#F9F7EB] pb-28">
      <div className="relative h-52">
        <ImageWithFallback src={item.img} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center"
        >
          <ArrowLeft size={20} className="text-[#091201]" />
        </button>
        <div className="absolute bottom-4 left-5 right-5">
          <span className="px-2.5 py-1 rounded-full bg-[#DD053E] text-white" style={{ fontSize: 11, fontWeight: 600 }}>{item.type}</span>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h1 className="text-[#091201]" style={{ fontSize: 22, fontWeight: 600 }}>{item.title}</h1>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2 text-[#091201]/60" style={{ fontSize: 13 }}>
            <Calendar size={16} />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[#091201]/60" style={{ fontSize: 13 }}>
            <MapPin size={16} />
            <span>{item.location}</span>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h3 className="text-[#091201] mb-2" style={{ fontSize: 16, fontWeight: 600 }}>Descripcion</h3>
        <p className="text-[#091201]/60" style={{ fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
      </div>

      {item.reqs && (
        <div className="px-5 mt-5">
          <h3 className="text-[#091201] mb-2" style={{ fontSize: 16, fontWeight: 600 }}>Requisitos</h3>
          <GlassCard className="p-4">
            <p className="text-[#091201]/60" style={{ fontSize: 13, lineHeight: 1.7 }}>{item.reqs}</p>
          </GlassCard>
        </div>
      )}

      <div className="px-5 mt-6 flex gap-3">
        <button className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
          <Bookmark size={16} /> Guardar
        </button>
        <button className="flex-1 py-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 flex items-center justify-center gap-2 text-[#091201]/70" style={{ fontSize: 13, fontWeight: 500 }}>
          <Share2 size={16} /> Compartir
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-5 pb-8 bg-gradient-to-t from-[#F9F7EB] to-transparent">
        <button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CB0723] to-[#DD053E] text-white shadow-lg shadow-[#DD053E]/20 active:scale-[0.98] transition-transform"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          Registrarme
        </button>
      </div>
    </div>
  );
}
