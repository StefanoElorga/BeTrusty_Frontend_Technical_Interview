// Lee detalladamente la imagen "./code_example.png" y realiza un analisis de su funcionalidad, y como lo podrias mejorar
//Pista, el codigo presentado handlea dos diferentes tipos de tokens (api token, session token)

//MI EXPLICACION GENERAL:
//CREE FUNCIONES PARA CONTROLAR ERRORES, ES MUY IMPORTANTE TENER UN CONTROL DE ERRORES EN NUESTRA API, ASI OBTENDREMOS ALGO MÁS ESPECIFICO, CON ESTO
//PODEMOS AYUDAR AL USUARIO Y AL DEVELOPER A ENTENDER QUE ESTÁ PASANDO.
//TAMBIEN CREE FUNCIONES PARA CONTROLAR EL USO EXCESIVO, POR EJEMPLO, LIMITAMOS LOS INTENTOS, TAMBIEN PODEMOS CASTIGAR AL USUARIO POR COMETER VARIOS ERRORES
//POR EJEMPLO, DANDOLE MAS TIEMPO DE ESPERA Y ASÍ NO SATURAR EL SERVIDOR.

import image from "./code_example.png";
export const Layout = ({ children }) => {
  //agregamos una función para crear un "retraso exponencial", significa que en vez de reintentar una solicitud cada tiempo fijo
  //el tiempo aumentará cada vez más.
  const backoff = (attempt) => {
    return Math.pow(2, attempt) * 1000; // considerando que 1000 es el valor en ms, es decir 1 segundo.
  };

  //tambien creamos un max. de intentos.
  const maxAttempts = 3; //intentos maximos.
  let attemptsCounter = 0; //contador de intentos

  const {
    storageValue: auth_token,
    setValue: setAuthToken,
    removeItem: closeSession,
  } = useLocalStorage("auth_token", "");
  const { storageValue: auth, setValue: setAuth } = useLocalStorage("auth", "");
  const [useSession, setuserSession] = useState(null);
  const [products, setProducts] = useState(undefined);
  const [homeData, setHomeData] = useState(undefined);
  const actualCurrency = JSON.parse(localStorage.getItem("currency"));
  const router = useRouter();

  const setCurrency = async (token, id, session) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const setCurrency = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/v2/currencies/set`,
        { currency: id },
        { ...config }
      );

      const setcurrency = setCurrency.data;

      if (session) {
        setAuthToken(setcurrency.access_token);
        setAuth(setcurrency.access_token);
      } else setAuth(setcurrency.access_token);
    } catch (error) {
      //en el catch creamos este código que reintentará la ejecución.
      if (attemptsCounter < maxAttempts) {
        const delay = backoff(attemptsCounter);
        setTimeout(() => {
          updateCurrency(token);
        }, delay);
        attemptsCounter++;
      }
      // Alcanzado el número máximo de intentos, enseñamos este mensaje.
      if (attemptsCounter === maxAttempts) {
        alert(
          "Hiciste muchos intentos. Por favor, inténtalo de nuevo más tarde."
        );
      }
    }

    //getTokenV1
    const getToken = async () => {
      try {
        const login = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v2/auth/login`,
          {
            email: process.env.NEXT_PUBLIC_AUTH_USER,
            password: process.env.NEXT_PUBLIC_AUTH_PASS,
          }
        );
        const auth = login.data;
        setAuth(auth.acces_token);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          //esto seria un error de autenticación.
          alert("tu sesión ha expirado. Por favor inicia sesion nuevamente.");
          redirectToLogin(); // podriamos crear una función que redirija a la pagina login
        } else {
          //si obtenemos otro tipo de error, podriamos intentar nuevamenta la solicitud.
          const delay = backoff(attemptsCounter);
          setTimeout(() => {
            updateCurrency(token);
          }, delay);
          attemptsCounter++;
        }
        alert("error al iniciar sesion");
      }
    };

    //getProducts: creamos la funcion que estaba incompleta.
    const getProducts = async () => {
      //CREE ESTE TRY CATCH PARA TRAER LOS PRODUCTOS
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v2/products`
        );
        //si es exitoso, guardamos los productos.
        if (response.status === 200) {
          const productsData = response.data;

          setProducts(productsData);
        }
      } catch (error) {
        //Avisamos al usuario que hubo un error
        console.error("Error al obtener los productos:", error);
        alert("Hubo un error al traer los productos! recarga la página.");
      }
    };

    //auto connect
    const refreshToken = async (token) => {
      const config = {
        headers: { Authorization: `Bearer ${auth_token}` },
      };

      try {
        const sendVerificationCode = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v2/auth/refresh`,
          {},
          config
        );
        const { data } = sendVerificationCode;
        data.acces_token && setAuth(data.acces_token);
      } catch (error) {
        //Consologueamos el error y advertimos al usuario que hubo uno
        console.log(error);
        alert("hubo un error al refrescar tu token");
      }
    };

    //MODIFICAMOS LA FUNCION SETCOUNTRYPAYMENT:
    const setCountryPayment = async (code) => {
      const auth_token = localStorage.getItem("auth_token");

      //control de error agregado: si no hay token, error de autenticación.
      if (!auth_token) {
        console.error(
          "No se encontró el token de autenticación en el almacenamiento local."
        );
        alert("Hubo un error de verificación.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };

      try {
        const sendVerificationCode = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/v2/wallet-user/update/country/${code}`,
          {},
          config
        );

        //si es exitoso, alerta para avisar que lo fue.
        if (
          sendVerificationCode.status >= 200 &&
          sendVerificationCode.status < 300
        ) {
          alert("País de pago actualizado exitosamente.");
        }
      } catch (error) {
        //si hay error avisamos al usuario y consologueamos el error para identificarlo.
        console.error("Error al actualizar el país de pago:", error);
        alert(
          "Hubo un error al intentar actualizar el país de pago, por favor reintantalo mas tarde."
        );
      }
    };

    //CREE una API que obtiene la homeData con control de errores:
    const getHomeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v2/home`
        );

        if (response.status === 200) {
          const homeData = response.data;

          setHomeData(homeData);
        } else {
          console.error(
            "Error al obtener los datos de inicio: respuesta inesperada del servidor"
          );
        }
      } catch (error) {
        console.error("Error al obtener los datos de inicio:", error);
      }
    };
  };
};
