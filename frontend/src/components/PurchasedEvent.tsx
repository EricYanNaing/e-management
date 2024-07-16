const PurchasedEvent = () => {
  return (
    <div className="flex-1 p-4 w-full">
      <div className="mt-8 bg-white p-4 shadow rounded-lg">
        <h2 className="text-gray-500 text-lg font-semibold pb-4">
          Booked Events
        </h2>
        <div className="my-1"></div>
        <div className="bg-gradient-to-r from-red-300 to-red-500 h-px mb-6"></div>
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Event photo
              </th>
              <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Event name
              </th>
              <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Event place
              </th>
              <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Event date
              </th>
              <th className="py-2 text-left px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">
                Event time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-grey-lighter">
              <td className="py-2 px-4 border-b border-grey-light">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Foto Perfil"
                  className="rounded-full h-10 w-10"
                />
              </td>
              <td className="py-2 px-4 border-b border-grey-light">
                Juan Pérez
              </td>
              <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
              <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
              <td className="py-2 px-4 border-b border-grey-light">Comercio</td>
            </tr>
          </tbody>
        </table>
        <div className="text-right mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasedEvent;
