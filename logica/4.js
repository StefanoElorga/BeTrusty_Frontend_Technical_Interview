// Lee detalladamente la imagen "./code_example.png" y realiza un analisis de su funcionalidad, y como lo podrias mejorar
//Pista, el codigo presentado handlea dos diferentes tipos de tokens (api token, session token)

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
  let remainingAttempts = maxAttempts - attemptsCounter;

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

  const updateCurrency = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const getCurrenciesOptions = await axios.get(
        `
            ${process.env.NEXT_PUBLIC_API}/api/v2/currencies/${actualCurrency.id}
        `,
        { ...config }
      );
      const currencyUpdated = getCurrenciesOptions.data;
      if (actualCurrency.setValue !== currencyUpdated.setValue) {
        const currencyUpdate = {
          ...actualCurrency,
          value: currencyUpdated.value,
        };
        return localStorage.setItem("currency", JSON.stringify(currencyUpdate));
        //router.push(router.pathname, router.asPath);
      }
    } catch (error) {
      console.log("error  updating 'currency':", error); //agregué un mensaje de error
    }
  };

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
      } else {
        // Alcanzado el número máximo de intentos, enseñamos este mensaje.
        alert("Hubo un error. Por favor, inténtalo de nuevo.", error);
      }
    }

    //auto connect session
    useEffect(() => {
      if (auth_token && !useSession) {
        autoConnectSession(true);
        actualCurrency && setCurrency(auth_token, actualCurrency.id, true);
      } else {
        refreshToken(auth);
        actualCurrency && setCurrency(auth, actualCurrency.id, false);
      }
      actualCurrency && updateCurrency(auth);
    }, []);

    //setLenguage prefered
    useEffect(() => {
      if (
        useSession &&
        useSession.language &&
        userSession.language.code !== router.locale
      ) {
        router.push(router.pathname, router.asPath, {
          locale: userSession.language.code,
        });
      }

      useSession && userSession?.country_payment?.code === null && getGeoInfo();
    }, [userSession]);

    useEffect(() => {
      if (auth) {
        getHomeData(); //getProducts
        getProducts(); //getProducts
      } else getToken();
    }, [auth]);

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
          //Otro tipo de error, podriamos intentar nuevamenta la solicitud.
          const delay = backoff(attemptsCounter);
          setTimeout(() => {
            updateCurrency(token);
          }, delay);
          attemptsCounter++;
        }
        alert("error al iniciar sesion");
      }
    };

    //getProducts
    const getProducts = async () => {
      //CREE ESTE TRY CATCH PARA TRAER LOS PRODUCTOS
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/api/v2/products`
        );

        if (response.status === 200) {
          const productsData = response.data;

          setProducts(productsData);
        } else {
          console.error(
            "Error al obtener los productos: respuesta inesperada del servidor"
          );
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert("Hubo un error al traer los productos! recarga la página.");
      }
    };

    //auto connect
    const autoConnectSession = async (first = false) => {
      const auth_token2 = localStorage.getItem("auth_token");

      if (!auth_token2) {
        return disconnectSession();
      } else {
        const config = {
          headers: { Authorization: `Bearer ${auth_token2}` },
        };
        try {
          const sendVerificationCode = await axios.post(
            `${process.env.NEXT_PUBLIC_API}/api/v2/auth/refresh`,
            {},
            config
          );
          const { data } = sendVerificationCode;
          data.user && setuserSession(data.user);
          data.acces_token && setAuth(data.acces_token);
          data.acces_token && setAuthToken(data.acces_token);
        } catch (error) {
          first && disconnectSession();
          //console.log(error);
        }
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
        //console.log(error);
      }
    };

    const getGeoInfo = async () => {
      try {
        const getGeo = await axios.get(
          `https://ipapi.co/json/?key=${process.env.NEXT_PUBLIC_IPAPI}`,
          {}
        );
        const { data } = getGeo;
        const dd = await setCountryPayment(data.country_code);
      } catch (error) {
        console.log(error);
      }
    };

    //MODIFICAMOS LA FUNCION SETCOUNTRYPAYMENT
    const setCountryPayment = async (code) => {
      const auth_token = localStorage.getItem("auth_token");

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

        if (
          sendVerificationCode.status >= 200 &&
          sendVerificationCode.status < 300
        ) {
          console.log("País de pago actualizado exitosamente.");
        } else {
          console.error(
            "Error al actualizar el país de pago:",
            sendVerificationCode.statusText
          );
        }
      } catch (error) {
        console.error("Error al actualizar el país de pago:", error);
        alert(
          "Hubo un error al intentar actualizar el país de pago, por favor reintantalo mas tarde."
        );
      }
    };

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

    //disconect session
    const disconnectSession = async () => {
      await closeSession();
      setuserSession(undefined);
      await getToken();
      return router.push({
        pathname: "/login",
        query: { redirect: router.asPath },
      });
    };

    const providerValue: TodoContextType = {
      session: userSession,
      setSession: setuserSession,
      acces_token: auth,
      winProducts: products,
      disconnectUser: disconnectSession,
      refreshSession: autoConnectSession,
      homeData: homeData,
      winBrokers: undefined,
    };

    return (
      <SessionContext.Provider value={providerValue}>
        <Header />
        <main>{children}</main>
        <Footer />
      </SessionContext.Provider>
    );
  };
};
