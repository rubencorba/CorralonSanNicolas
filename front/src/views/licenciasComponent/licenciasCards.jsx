import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LicenciaCardComponent from "./licenciaCard";
import { getLicencias } from "../../redux/actions";

function LicenciasCardsComponent() {
  const dispatch = useDispatch();

  const licencias = useSelector((state) => state.licencias);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicencias = async () => {
      try {
        await dispatch(getLicencias()); // Actualiza el estado global
      } catch (error) {
        console.error("Error al cargar las licencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLicencias();
  }, [dispatch]);

  return (
    <div>
      {/* <FilterSecuestrosComponent /> */}

      <div className="grid grid-cols-1 mid:grid-cols-3 custom:grid-cols-2 gap-4 p-4">
        {loading ? (
          <div>Cargando licencias...</div>
        ) : (
          licencias.map(({ id, dni, nombre, fecha_hora, egresada, observaciones, tipo, foto }) => {
            return (
              <LicenciaCardComponent
                key={id}
                dni={dni}
                nombre={nombre}
                egresada={egresada}
                observaciones={observaciones}
                tipo={tipo}
                fecha_hora={fecha_hora}
                foto={foto}
                id={id}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default LicenciasCardsComponent;
