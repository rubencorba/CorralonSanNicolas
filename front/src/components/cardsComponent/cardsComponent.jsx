import { useEffect, useState } from "react";
import CardComponent from "../cardComponent/cardComponent";
import { useDispatch, useSelector } from "react-redux";
import { getSecuestros } from "../../redux/actions";
import FilterSecuestrosComponent from "../filterSecuestrosComponent/filterSecuestrosComponent";

function CardsComponent() {
  const dispatch = useDispatch();

  const secuestros = useSelector((state) => state.secuestros);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecuestros = async () => {
      try {
        await dispatch(getSecuestros()); // Actualiza el estado global
      } catch (error) {
        console.error("Error al cargar los secuestros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSecuestros();
  }, [dispatch]);

  return (
    <div>
      <FilterSecuestrosComponent />

      <div className="grid grid-cols-1 mid:grid-cols-3 custom:grid-cols-2 gap-4 p-4">
        {loading ? (
          <div>Cargando secuestros...</div>
        ) : (
          secuestros.map(({ id, Vehiculo, egreso, Acta, fecha_hora, foto }) => {
            return (
              <CardComponent
                key={id}
                tipo={Vehiculo?.tipovh}
                dominio={Vehiculo?.dominio}
                egreso={egreso}
                numeroActa={Acta?.nro}
                lugar={Acta?.lugar}
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

export default CardsComponent;
