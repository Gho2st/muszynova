const VirtualTour = ({ t }) => {
  return (
    <section id="virtual-tour" className=" px-6 xl:px-44 py-20">
      <h2 className="text-4xl xl:text-6xl font-extrabold  mb-24 text-center">
        {t("header")}
      </h2>
      <div className="h-[600px] xl:h-[750px]">
        <iframe
          src="/virtual-tour/index.htm"
          className="h-[100%] w-1/1 mx-auto "
          title="Spacer Wirtualny"
        />
      </div>
    </section>
  );
};

export default VirtualTour;
