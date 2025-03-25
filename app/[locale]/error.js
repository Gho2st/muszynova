"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="p-6 lg:px-24 2xl:px-44 min-h-[70vh]">
        <div className="bg-white p-6 mt-6 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-5">Coś poszło nie tak!</h2>
          <div className="">
            <Link className="underline" href="/">
              Wróć na stronę główną
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
