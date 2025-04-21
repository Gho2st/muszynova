"use client";

import { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/photoswipe.css";
import Image from "next/image";

export default function ImagesP() {
  const lightboxRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({});

  // Pobieranie zdjęć z API
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/get_images/park");
        if (!response.ok) {
          throw new Error(`Błąd pobierania zdjęć: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // Pobieranie wymiarów zdjęć
  useEffect(() => {
    const fetchDimensions = async () => {
      const dimensions = {};
      const baseUrl =
        typeof window !== "undefined" ? window.location.origin : "";
      for (const image of images) {
        try {
          const img = new window.Image();
          img.src = `${baseUrl}${image}`;
          await new Promise((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () =>
              reject(new Error(`Nie udało się załadować ${image}`));
          });
          dimensions[image] = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
        } catch (error) {
          console.error(`Błąd pobierania wymiarów dla ${image}:`, error);
          dimensions[image] = { width: 1200, height: 800 }; // Domyślne wymiary w razie błędu
        }
      }
      setImageDimensions(dimensions);
    };

    if (images.length > 0) {
      fetchDimensions();
    }
  }, [images]);

  // Inicjalizacja PhotoSwipe
  useEffect(() => {
    if (images.length > 0) {
      const lightbox = new PhotoSwipeLightbox({
        gallery: ".gallery-container",
        children: "a",
        pswpModule: () => import("photoswipe"),
        // Opcjonalne ustawienia dla urządzeń mobilnych
        padding: { top: 20, bottom: 40, left: 20, right: 20 },
        wheelToZoom: true,
        closeOnVerticalDrag: true,
        mobile: {
          pinchToClose: true,
          tapToClose: true,
        },
      });

      lightbox.init();
      lightboxRef.current = lightbox;

      // Czyszczenie przy odmontowaniu komponentu
      return () => {
        lightbox.destroy();
      };
    }
  }, [images]);

  return (
    <>
      {loading && <p className="text-center text-lg">Ładowanie zdjęć...</p>}
      {error && <p className="text-center text-red-500">Błąd: {error}</p>}

      {!loading && !error && images.length > 0 && (
        <div className="gallery-container grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 mx-auto max-w-6xl">
          {images.map((src, index) => {
            const { width = 1200, height = 800 } = imageDimensions[src] || {};
            return (
              <a
                key={index}
                href={src}
                className="gallery-item block overflow-hidden shadow-md aspect-square transition-all ease-in-out duration-300 hover:scale-105"
                data-pswp-width={width}
                data-pswp-height={height}
              >
                <Image
                  src={src}
                  alt={`Zdjęcie parku ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
