"use client";
import { useState, useEffect } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import Image from "next/image";

export default function FacebookPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  }

  useEffect(() => {
    async function fetchPosts() {
      const timestamp = Date.parse(new Date().toString());

      try {
        const res = await fetch(`/api/facebook/${timestamp}`, {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        const data = await res.json();
        setPosts(data.data || []);
      } catch (error) {
        console.error("Błąd podczas pobierania postów:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="pb-16 xl:pb-32 px-6 xl:px-32 2xl:px-44">
      <div className="text-center mb-8">
        <h2 className="text-3xl xl:text-5xl font-semibold mb-4 md:mb-10">
          Najnowsze <span className="text-blue-600 font-bold">posty</span> z
          Facebooka
        </h2>
        <a
          href="https://www.facebook.com/wesolewygibasy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mt-2 mb-10"
        >
          <FaFacebookSquare size={32} />
          <span className="font-medium">Odwiedź nasz profil</span>
        </a>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">Wczytywanie postów...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600">Brak dostępnych postów.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-16">
          {posts.map((post) => {
            const imageUrl =
              post.attachments?.data?.[0]?.media?.image?.src ?? null;
            const [pageId, postId] = post.id.split("_");
            const postUrl = `https://www.facebook.com/${pageId}/posts/${postId}`;

            return (
              <li
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
              >
                {imageUrl && (
                  <div className="relative w-full h-84 xl:h-96">
                    <Image
                      src={imageUrl}
                      alt="Zdjęcie z posta"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-gray-800 mb-4">
                    {truncateText(post.message || "Brak treści posta.", 35)}
                  </p>
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(post.created_time).toLocaleString()}
                  </div>
                  <a
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium text-sm"
                  >
                    Zobacz całość na Facebooku →
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
