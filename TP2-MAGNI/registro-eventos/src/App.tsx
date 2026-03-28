import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";

export type Participante = {
  nombre: string;
  email: string;
  edad: number | "";
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
  aceptaTerminos: boolean;
};

function App() {
  const [lista, setLista] = useState<Participante[]>([]);
  
  const [busqueda, setBusqueda] = useState("");
  const [modalidadFiltro, setModalidadFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState(""); 

  // 🔹 control para evitar sobrescribir localStorage al inicio
  const [cargado, setCargado] = useState(false);

  // 🔹 cargar datos al iniciar
  useEffect(() => {
    const data = localStorage.getItem("participantes");
    if (data) {
      setLista(JSON.parse(data));
    }
    setCargado(true);
  }, []);

  // 🔹 guardar datos cuando cambia la lista
  useEffect(() => {
    if (cargado) {
      localStorage.setItem("participantes", JSON.stringify(lista));
    }
  }, [lista, cargado]);

  // 🔹 filtro
  const listaFiltrada = lista.filter(p => {
    return (
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (modalidadFiltro === "" || p.modalidad === modalidadFiltro) &&
      (nivelFiltro === "" || p.nivel === nivelFiltro)
    );
  });

  // 🔹 eliminar participante
  const eliminarParticipante = (email: string) => {
    setLista(prev => prev.filter(p => p.email !== email));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h2 className="text-xl mb-4">
        Participantes registrados: {listaFiltrada.length}
      </h2>

      <Formulario setLista={setLista} lista={lista} />

      {/* 🔹 filtros */}
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <input
          placeholder="Buscar por nombre"
          className="border p-2 rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={modalidadFiltro}
          onChange={(e) => setModalidadFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
          <option value="Híbrido">Híbrido</option>
        </select>

        <select
          className="border p-2 rounded"
          value={nivelFiltro}
          onChange={(e) => setNivelFiltro(e.target.value)}
        >
          <option value="">Todos los niveles</option>
          <option value="Principiante">Principiante</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>

      <Lista lista={listaFiltrada} eliminar={eliminarParticipante} />

    </div>
  );
}

export default App;