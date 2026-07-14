export default function Map() {
  return (
    <section id="dojazd">
      <div>
        <iframe
          className="w-full h-[70vh]"
          title="Dojazd do parku rekreacyjno sportowego Muszynova."
          // Znacznie zwiększony zasięg kamery (z 10400 na 45000), pokazujący cały region
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45000.0!2d20.85!3d49.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x473e77eeeb758d49%3A0x12e520475cfb56c6!2sMuszynova%20-%20Park%20i%20Restauracja!5e0!3m2!1spl!2spl!4v1742152778954!5m2!1spl!2spl"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
