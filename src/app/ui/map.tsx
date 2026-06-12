"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | undefined>(undefined);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        //apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        apiKey:  "",
        version: "weekly",
      });

      await loader.load();

      if (mapRef.current) {
        const newMap = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          //address: "3 Brontë Close, Tilbury Town, Essex",
          zoom: 8,
        });
        setMap(newMap);
      }
    };

    initializeMap();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
