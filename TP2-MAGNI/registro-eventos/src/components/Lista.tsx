import type { Participante } from "../App";

function Lista(props: { 
  lista: Participante[], 
  eliminar: (email: string) => void
}) {
  const { lista, eliminar} = props;
  const getStyles = (nivel: string) => {
  if (nivel === "Principiante") return "bg-green-100 text-green-700";
  if (nivel === "Intermedio") return "bg-yellow-100 text-yellow-700";
  if (nivel === "Avanzado") return "bg-red-100 text-red-700";
  return "";
  
};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lista.map((p, i) => (
        <div key={i} className={`${getStyles(p.nivel)} shadow rounded p-4 hover:shadow-lg transition`}>
          <p><b>{p.nombre}</b></p>
          <p>{p.email}</p>
          <p>Edad: {p.edad}</p>
          <p>País: {p.pais}</p>
          <p>Modalidad: {p.modalidad}</p>
          <p>Tecnologías: {p.tecnologias.join(", ")}</p>
          <p className={getStyles(p.nivel)}>Nivel: {p.nivel}</p>
          <p>Acepta Términos: {p.aceptaTerminos ? "Sí" : "No"}</p>
          <button
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => eliminar(p.email)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Lista;