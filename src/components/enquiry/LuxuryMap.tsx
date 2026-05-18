'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// Spa Vibes coordinates — from Google Maps link
const SPA_LNG = 75.8515614;
const SPA_LAT = 22.6786485;

export default function LuxuryMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapInstanceRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [SPA_LNG, SPA_LAT],
      zoom: 15,
      pitch: 45,
      bearing: -20,
      antialias: true,
      attributionControl: false,
      scrollZoom: false,
    });

    mapInstanceRef.current = map;

    /* ── Smooth zoom-in entrance ── */
    map.on('load', () => {
      map.easeTo({
        zoom: 15.8,
        pitch: 52,
        duration: 2200,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });

      /* ── 3-D buildings layer ── */
      const layers = map.getStyle().layers ?? [];
      const labelLayer = layers.find(
        (l) => l.type === 'symbol' && (l.layout as Record<string, unknown>)?.['text-field']
      );

      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 13,
          paint: {
            'fill-extrusion-color': '#e8ddd5',
            'fill-extrusion-height': [
              'interpolate', ['linear'], ['zoom'],
              13, 0, 13.5, ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate', ['linear'], ['zoom'],
              13, 0, 13.5, ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.55,
          },
        },
        labelLayer?.id
      );

      /* ── Soft glow under pin ── */
      map.addSource('spa-glow', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [SPA_LNG, SPA_LAT] },
              properties: {},
            },
          ],
        },
      });

      map.addLayer({
        id: 'spa-glow-layer',
        type: 'circle',
        source: 'spa-glow',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 13, 20, 16, 60],
          'circle-color': '#DDB7AF',
          'circle-opacity': 0.15,
          'circle-blur': 1.2,
          'circle-stroke-width': 0,
        },
      });
    });

    /* ── Animated pulse marker ── */
    const el = document.createElement('div');
    el.className = 'spa-map-marker';
    el.innerHTML = `
      <div class="spa-pin-outer">
        <div class="spa-pin-ring spa-pin-ring-1"></div>
        <div class="spa-pin-ring spa-pin-ring-2"></div>
        <div class="spa-pin-core">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#2B2B2B"/>
          </svg>
        </div>
      </div>
    `;

    const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([SPA_LNG, SPA_LAT])
      .addTo(map);

    /* ── Popup ── */
    const popup = new mapboxgl.Popup({
      offset: 25,
      className: 'spa-map-popup',
      closeButton: false,
      maxWidth: '220px',
    }).setHTML(`
      <div class="spa-popup-inner">
        <p class="spa-popup-brand">SPA VIBE</p>
          <p class="spa-popup-address">Spa Vibes, Indore</p>
          <a href="https://maps.app.goo.gl/hgC7fQsgnHErYmB1A" target="_blank" rel="noopener noreferrer" class="spa-popup-link">
          Open in Maps ↗
        </a>
      </div>
    `);

    el.addEventListener('click', () => {
      if (popup.isOpen()) popup.remove();
      else popup.setLngLat([SPA_LNG, SPA_LAT]).addTo(map);
    });

    return () => {
      marker.remove();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .spa-map-marker { cursor: pointer; }

        .spa-pin-outer {
          position: relative;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
        }

        .spa-pin-ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(221,183,175,0.7);
          animation: spa-ring-pulse 2.4s ease-out infinite;
        }
        .spa-pin-ring-1 { width: 56px; height: 56px; animation-delay: 0s; }
        .spa-pin-ring-2 { width: 72px; height: 72px; animation-delay: 0.8s; }

        @keyframes spa-ring-pulse {
          0%   { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .spa-pin-core {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #DDB7AF 0%, #E8C6C1 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 3px rgba(221,183,175,0.3), 0 6px 20px rgba(43,43,43,0.12);
          z-index: 1; transition: transform 0.3s ease;
        }
        .spa-map-marker:hover .spa-pin-core { transform: scale(1.12); }

        /* Popup — light theme */
        .mapboxgl-popup-content {
          padding: 0 !important; border-radius: 14px !important;
          overflow: hidden; box-shadow: 0 8px 30px rgba(43,43,43,0.12) !important;
        }
        .mapboxgl-popup-tip { border-top-color: #FDFAF7 !important; }

        .spa-popup-inner {
          background: #FDFAF7;
          padding: 16px 18px; border-radius: 14px;
        }
        .spa-popup-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px; font-weight: 600; color: #2B2B2B;
          margin: 0 0 4px; letter-spacing: 0.12em; text-transform: uppercase;
        }
        .spa-popup-address {
          font-family: 'Poppins', sans-serif;
          font-size: 10.5px; font-weight: 300; color: #6B635B;
          margin: 0 0 10px; line-height: 1.5;
        }
        .spa-popup-link {
          font-family: 'Poppins', sans-serif;
          font-size: 10px; font-weight: 500; color: #DDB7AF;
          text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase;
          border-bottom: 1px solid rgba(221,183,175,0.3); padding-bottom: 2px;
          transition: color 0.2s;
        }
        .spa-popup-link:hover { color: #c49d95; }
      `}</style>

      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ minHeight: '100%' }}
      />
    </>
  );
}
