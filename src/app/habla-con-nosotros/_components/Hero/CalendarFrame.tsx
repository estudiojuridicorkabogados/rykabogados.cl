export const CalendarFrame = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <iframe
        src="https://agende.cl/ryoasociados.cl?iframe=1"
        title="Agenda RY Abogados"
        style={{ maxWidth: 1001, height: 600, width: '100%' }}
        loading="lazy"
      />
    </div>
  );
};
