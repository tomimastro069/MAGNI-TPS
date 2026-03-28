import { useState } from "react";
import type { Participante } from "../App";

type Props = {
  setLista: React.Dispatch<React.SetStateAction<Participante[]>>;
  lista: Participante[];
};

function Formulario({ setLista,lista }: Props) {
  const [form, setForm] = useState<Participante>({
    nombre: "",
    email: "",
    edad:  "",
    pais: "Argentina",
    modalidad: "",
    tecnologias: [],
    nivel: "",
    aceptaTerminos: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "edad" ? Number(value) : value,
    });
  };

  const handleCheckbox = (tech: string) => {
    if (form.tecnologias.includes(tech)) {
      setForm({
        ...form,
        tecnologias: form.tecnologias.filter(t => t !== tech),
      });
    } else {
      setForm({
        ...form,
        tecnologias: [...form.tecnologias, tech],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert("Por favor, completa todos los campos obligatorios y acepta los términos.");
      return;
    }
    const existe = lista.some(p => p.email === form.email);
    if (existe) {
      alert("El email ya está registrado");
      return;
    }
    setLista(prev => [...prev, form]);
    setForm({
      nombre: "",
      email: "",
      edad: "",
      pais: "Argentina",
      modalidad: "",
      tecnologias: [],
      nivel: "",
      aceptaTerminos: false,
    });
  };

  function validarFormulario() {
    return (
      form.nombre.trim() !== "" &&
      form.email.trim() !== "" &&
      form.edad !== "" &&
      form.modalidad !== "" &&
      form.nivel !== "" &&
      form.aceptaTerminos
    );
  }
  
  

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">
        Registro de Eventos
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="edad"
          type="number"
          placeholder="Edad"
          className="border p-2 rounded"
          value={form.edad}
          onChange={handleChange}
        />

        <select
          name="pais"
          className="border p-2 rounded"
          value={form.pais}
          onChange={handleChange}
        >
          <option>Argentina</option>
          <option>Brasil</option>
          <option>Chile</option>
          <option>Uruguay</option>
          <option>Mexico</option>
          <option>España</option>
          <option>Estados Unidos</option>
        </select>

        <div className="flex gap-4 col-span-1 md:col-span-2">
          <label>
            <input type="radio" name="modalidad" value="Presencial" onChange={handleChange} />
            Presencial
          </label>
          <label>
            <input type="radio" name="modalidad" value="Virtual" onChange={handleChange} />
            Virtual
          </label>
          <label>
            <input type="radio" name="modalidad" value="Híbrido" onChange={handleChange} />
            Híbrido
          </label>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3">
          <label>
            <input type="checkbox" onChange={() => handleCheckbox("React")} />
            React
          </label>
          <label>
            <input type="checkbox" onChange={() => handleCheckbox("Angular")} />
            Angular
          </label>
          <label>
            <input type="checkbox" onChange={() => handleCheckbox("Vue")} />
            Vue
          </label>
          <label>
            <input type="checkbox" onChange={() => handleCheckbox("Node")} />
            Node
          </label>
          <label>
            <input type="checkbox" onChange={() => handleCheckbox("Python")} />
            Python
          </label>
           <label>
            <input type="checkbox" onChange={() => handleCheckbox("Java")} />
            Java
          </label>
           <label>
            <input type="checkbox" onChange={() => handleCheckbox("C++")} />
            C++
          </label>
        </div>
        <div>
          <select 
            name="nivel"
            className="border p-2 rounded w-full"
            value={form.nivel}
            onChange={handleChange}
          >
            <option value="">Seleccionar Nivel</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
          <label className="flex items-center gap-2 col-span-1 md:col-span-2">
            <input type="checkbox" name="aceptaTerminos" onChange={(e) => setForm({...form, aceptaTerminos: e.target.checked})} />
            Acepto los términos y condiciones
          </label>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 md:col-span-2" type="submit">
          Registrar
        </button>

      </form>
    </div>
  );
}

export default Formulario;