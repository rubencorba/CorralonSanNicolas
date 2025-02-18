import axios from "axios";

// Crear una instancia de Axios
const axiosInstance = axios.create({
  /* baseURL: "https://testing.sannicolas.gob.ar/corralon", */ // Define la URL base de tu API
   baseURL: "http://localhost:3001", // Define la URL base de tu API
});

// Agregar un interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token; // Agrega el token al header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
