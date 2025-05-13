"use client";

export default function FacebookFeed() {
  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row justify-evenly items-stretch gap-10 md:gap-8">
        <div className="w-full md:w-[450px] 2xl:w-[500px] h-[500px] 2xl:h-[580px] flex">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FParkmuszynova%2Fposts%2Fpfbid02gySEU2RNVaB77UuXuW9cx1g99nfsgQneRK9AHZbxntYfCJ9JjHd3WbeHE94r5yTnl&show_text=true&width=500"
            className="w-full h-full"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="w-full md:w-[450px] 2xl:w-[500px] h-[450px] 2xl:h-[580px] flex">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FParkmuszynova%2Fposts%2Fpfbid0XyxZ3WTgxZxJeRB1Gz1fTSbzU5tpR4QVvsMBBFP2r4a9nLsG5ec5WPWUcaBM3RJsl&show_text=true&width=500"
            className="w-full h-full"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>

        <div className="w-full md:w-[450px] 2xl:w-[500px] h-[500px] 2xl:h-[600px] flex">
          <iframe
            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FParkmuszynova%2Fposts%2Fpfbid07aGVkKqCW8sdYu2VnAmtCNFjK9pEen55rP8KXrxbHJ9VTKZPKquPF9zPtyzmxV2Ll&show_text=true&width=500"
            className="w-full h-full"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
