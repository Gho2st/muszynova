"use client";

import { useEffect, useState, useRef } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import Image from "next/image";

export default function GalleryRestaurant() {
  const lightboxRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/get_images/restauracja");
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

  return (
    <main className="px-6 xl:px-24 py-16 xl:py-20 pb-32">
      <h1 className="text-5xl xl:text-6xl font-bold text-customGold text-center mb-20">
        Galeria Restauracji
      </h1>

      {loading && <p className="text-center text-lg">Ładowanie zdjęć...</p>}
      {error && <p className="text-center text-red-500">Błąd: {error}</p>}

      {!loading && !error && images.length > 0 && (
        <LightGallery
          selector=".gallery-item"
          speed={500}
          plugins={[lgThumbnail]}
          onInit={(detail) => {
            lightboxRef.current = detail.instance;
          }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5 mx-auto max-w-6xl">
            {images.map((src, index) => (
              <a
                key={index}
                href={src}
                className="gallery-item block overflow-hidden shadow-md aspect-square transition-all ease-in-out duration-300 hover:scale-105"
              >
                <Image
                  src={src}
                  alt={`Zdjęcie parku ${index + 1}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>
        </LightGallery>
      )}
    </main>
  );
}
