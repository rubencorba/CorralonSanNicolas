function SuccessModal({ closeSuccessModal }) {

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeSuccessModal} /* Cierra al hacer clic fuera */
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                } /* Evita que el clic dentro lo cierre */
            >
                <div className="w-[20rem] bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold mb-4 text-center">
                        Operación realizada
                    </div>
                    <div className="flex flex-col justify-center gap-4">

                        <button
                            onClick={closeSuccessModal}
                            className="px-4 py-2 bg-white border border-[#0477AD] text-[#0477AD] font-inter rounded w-full"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessModal;
