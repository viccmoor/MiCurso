import { createContext, useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

type LocationContextType = {
  hasPermission: boolean | null;
};

const LocationContext = createContext<LocationContextType>({
  hasPermission: null,
});

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ hasPermission }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationPermission() {
	return useContext(LocationContext);
}