'use client'

import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTNO } from "@/hooks/useTNO";

const accessToken = "pk.eyJ1IjoicmFmZmFlbGNzcyIsImEiOiJjbTFubnczZG0wdnd5MmtwdjByOW9lOHgyIn0.r7wvcYSMMUzhsPu97B9zGQ";

export default function MapWithGeocoder() {

  const {setZoom, limites, zoom, calor, volume, velocidade, pressao, clas} = useTNO();

  const mapContainerRef = useRef();
  const mapInstanceRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);

  useEffect(() => {
    if (typeof document == 'undefined') {
      return
    }
    if (!document){
      return
    }
    mapboxgl.accessToken = accessToken;

    // @ts-ignore
    mapInstanceRef.current = new mapboxgl.Map({
      // @ts-ignore
      container: mapContainerRef.current, // container ID
      style: 'mapbox://styles/mapbox/standard-satellite',
      center: [-42.6454, -19.5318], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    // @ts-ignore
    mapInstanceRef.current.on("load", () => {
      setMapLoaded(true);
      // @ts-ignore
      if (!mapInstanceRef.current.getSource('point')){
        // @ts-ignore
        mapInstanceRef.current.addSource('point', {
          type: 'geojson',
          data: geojson
        });
      }

      function getExplosionColor(level: number): string {
        // Mapeia os níveis de 1 a 6 para as cores definidas
        const colors: { [key: number]: string } = {
          6: "rgba(255, 0, 0, 0.3)",        // Vermelho Intenso
          5: "rgba(255, 165, 0, 0.3)",      // Laranja Fogo
          4: "rgba(255, 255, 0, 0.3)",      // Amarelo Forte
          3: "rgba(255, 255, 102, 0.3)",    // Amarelo Pálido
          2: "rgba(255, 200, 0, 0.3)",      // Laranja Claro
          1: "rgba(255, 200, 128, 0.4)"     // Cinza Fumaça
        };
      
        // Retorna a cor correspondente ao nível informado
        return colors[level];
      }

      limites.map((limite, i) => {
        const id = "point"+(i+1);
        const escala = 1/30;
        const size = limite/(escala*(2**(22 - zoom)));
        // @ts-ignore
        mapInstanceRef.current.addLayer({
          id: id,
          type: 'circle',
          source: 'point',
          paint: {
            'circle-radius': size,
            'circle-color': getExplosionColor(i+1)
          }
        });
      })

      // @ts-ignore
      mapInstanceRef.current.addLayer({
        id: 'point',
        type: 'circle',
        source: 'point',
        paint: {
          'circle-radius': 10,
          'circle-color': '#FF0000'
        }
      });

      // @ts-ignore
      mapInstanceRef.current.on('mouseenter', 'point', () => {
        // @ts-ignore
        mapInstanceRef.current.setPaintProperty('point', 'circle-color', '##FF3030');
        canvas.style.cursor = 'move';
      });

      // @ts-ignore
      mapInstanceRef.current.on('mouseleave', 'point', () => {
        // @ts-ignore
        mapInstanceRef.current.setPaintProperty('point', 'circle-color', '##FF0000');
        canvas.style.cursor = '';
      });

      // @ts-ignore
      mapInstanceRef.current.on('mousedown', 'point', (e) => {
        e.preventDefault();
        canvas.style.cursor = 'grab';
        // @ts-ignore
        mapInstanceRef.current.on('mousemove', onMove);
        // @ts-ignore
        mapInstanceRef.current.once('mouseup', onUp);
      });

      // @ts-ignore
      mapInstanceRef.current.on('touchstart', 'point', (e) => {
        if (e.points.length !== 1) return;
        e.preventDefault();
        // @ts-ignore
        mapInstanceRef.current.on('touchmove', onMove);
        // @ts-ignore
        mapInstanceRef.current.once('touchend', onUp);
      });
    });
    // @ts-ignore
    mapInstanceRef.current.on('zoom', () => {
      if (mapInstanceRef){
        if (mapInstanceRef.current){
          // @ts-ignore
          const zoom = mapInstanceRef.current.getZoom();
          setZoom(zoom);
          const escala = 1 / 30;   // medida/(escala*(2**(22 - zoom)))
          // @ts-ignore
          limites.map((limite, i) => {
            const id = 'point' + (i + 1);
            const size1 = limite/(escala*(2**(22 - zoom)));
            // @ts-ignore
            mapInstanceRef.current.setPaintProperty(id, 'circle-radius', size1);
          })          
        }
      }
    });

    // @ts-ignore
    const canvas = mapInstanceRef.current.getCanvasContainer();

    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-42.6454, -19.5318]
          }
        }
      ]
    };

    // @ts-ignore
    function onMove(e) {
      const coords = e.lngLat;

      canvas.style.cursor = 'grabbing';

      geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
      // @ts-ignore
      mapInstanceRef.current.getSource('point').setData(geojson);
    }

    // @ts-ignore
    function onUp(e) {
      const coords = e.lngLat;

      // @ts-ignore
      setCoordinates([`Longitude: ${coords.lng}`, `Latitude: ${coords.lat}`]);
      canvas.style.cursor = '';
      // @ts-ignore
      mapInstanceRef.current.off('mousemove', onMove);
      // @ts-ignore
      mapInstanceRef.current.off('touchmove', onMove);
    }

  }, [limites]);

  if (typeof document == 'undefined') {
    return (<>
    </>)
  }

  if (!document){
    return (<></>)
  }

  return (
    <>
    {/* {
      
      (<SearchBox
        accessToken={accessToken}
        map={mapInstanceRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => {
          setInputValue(d);
        }}
        options={{
          language: 'pt',
          country: 'BR'
        }}
        marker
      />)
    } */}
      {
        // @ts-ignore
        (<div id="map-container" ref={mapContainerRef} style={{ height: "100%"}} />)
      }
    </>
  );
}


