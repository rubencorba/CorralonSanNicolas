import { useState } from "react";
import * as XLSX from "xlsx";

function RegistroTableComponent({ registro }) {
  const [loading, setLoading] = useState(false);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Sin fecha";
    const date = new Date(timestamp);
    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const exportToExcel = () => {
    setLoading(true);

    // Convertir datos a formato compatible con Excel
    // Convertir datos a formato compatible con Excel
    const data = registro.map((item) => ({
      "Nro Acta": item.Acta?.nro || "Sin Acta",
      "Fecha y Hora de Ingreso": formatDate(item.fecha_hora),
      "Sector": item.sector || "Sin sector",
      "Usuario": item.User?.nombreCompleto || "Sin usuario",
      "Dominio": item.Vehiculo?.dominio || "Sin dominio",
      "Estado": item.estado || "Desconocido",
      "Fecha y Hora de Egreso": item.Egreso?.fecha_hora ? formatDate(item.Egreso.fecha_hora) : "No egresado",
      "Usuario que Egresó": item.Egreso?.User?.nombreCompleto || "Desconocido",
      "Usuario que Compactó": item.Compactado?.User?.nombreCompleto || "Desconocido",
      "Fecha y Hora de Compactación": item.Compactado?.fecha_hora ? formatDate(item.Compactado.fecha_hora) : "No compactado",
      "Fecha y Hora de Creación de Acta": item.Acta?.fecha_hora ? formatDate(item.Acta.fecha_hora) : "Sin fecha de acta",
    }));

    // Crear hoja de trabajo y libro de Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registros");

    // Descargar el archivo
    XLSX.writeFile(wb, "Registros.xlsx");

    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {registro.length ? (
        /* Botón de descarga */
        <button
          onClick={exportToExcel}
          className="mb-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 justify-center"
          disabled={loading}
        >
          {loading ? "Generando Excel..." : "Descargar Excel con datos adicionales"}
        </button>
      ) : ('')}
      <div className="flex flex-col justify-start items-center w-[21rem] sm:w-[40rem]  bg-white rounded-lg shadow-[1px_2px_8px_1px_rgba(220,220,220,0.45)]   mb-5">

        <div className="w-full overflow-x-auto touch-pan-x rounded-lg">
          <table className="w-full min-w-max  rounded-lg">
            <thead className="bg-[#0477ad]">
              <tr>
                <th className="px-4 py-2 border text-[#f6f5f5]">Nro Acta</th>
                <th className="px-4 py-2 border text-[#f6f5f5]">Fecha y Hora de ingreso</th>
                <th className="px-4 py-2 border text-[#f6f5f5]">Sector</th>
                <th className="px-4 py-2 border text-[#f6f5f5]">Usuario</th>
                <th className="px-4 py-2 border text-[#f6f5f5]">Dominio</th>
                <th className="px-4 py-2 border text-[#f6f5f5]">Estado</th>
              </tr>
            </thead>
            <tbody>
              {registro.length > 0 ? (
                registro.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">
                      {item.Acta?.nro || "Sin Acta"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {formatDate(item.fecha_hora)}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.sector || "Sin sector"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.User?.nombreCompleto || "Sin usuario"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.Vehiculo?.dominio || "Sin dominio"}
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {item.estado || "Desconocido"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                    No hay registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegistroTableComponent;
