import { useState } from "react";
import AdminSuperLayout from "../../components/layout/AdminSuperLayout";
import infoIcon from "../../assets/icons/ProfilAdminSuper/information.svg";

const ManajemenBidang = () => {
  const [namaBidang, setNamaBidang] = useState("");
  const [bidangList, setBidangList] = useState([
    { id: 1, nama: "IT Software" },
    { id: 2, nama: "IT Software" },
    { id: 3, nama: "IT Software" },
    { id: 4, nama: "IT Software" },
    { id: 5, nama: "IT Software" },
  ]);

  const [bidangTerbaru, setBidangTerbaru] = useState([
    { id: 1, nama: "IT Software" },
    { id: 2, nama: "Pendidikan" },
    { id: 3, nama: "Kantor" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // === Popup State ===
  const [showPopup, setShowPopup] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // "terbaru" / "list"

  // Open Popup
  const openPopup = (id, type) => {
    setIdToDelete(id);
    setDeleteType(type);
    setShowPopup(true);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (deleteType === "terbaru") {
      setBidangTerbaru(bidangTerbaru.filter((item) => item.id !== idToDelete));
    } else if (deleteType === "list") {
      setBidangList(bidangList.filter((item) => item.id !== idToDelete));
      // Juga hapus dari bidangTerbaru jika ada
      setBidangTerbaru(bidangTerbaru.filter((item) => item.id !== idToDelete));
    }
    setShowPopup(false);
  };

  // Handle tambah bidang
  const handleTambahBidang = () => {
    if (namaBidang.trim()) {
      // Cari ID terbesar dari kedua array
      const allIds = [...bidangList, ...bidangTerbaru].map(item => item.id);
      const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
      
      const newBidang = {
        id: maxId + 1,
        nama: namaBidang,
      };

      // Tambahkan ke bidangList (di paling atas)
      setBidangList([newBidang, ...bidangList]);

      // Tambahkan ke bidangTerbaru (di paling atas)
      setBidangTerbaru([newBidang, ...bidangTerbaru]);

      // Reset input
      setNamaBidang("");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(bidangList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = bidangList.slice(startIndex, endIndex);

  return (
    <AdminSuperLayout>
      <div className="space-y-6">
        
        {/* ================= TAMBAH BIDANG ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">

            <div
              className="px-6 py-4 font-semibold text-white rounded-t-xl"
              style={{
                background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
              }}
            >
              Tambah Bidang
            </div>

            <div className="bg-white rounded-b-xl shadow-lg p-6 space-y-4 h-[calc(100%-4rem)]">
              <input
                type="text"
                value={namaBidang}
                onChange={(e) => setNamaBidang(e.target.value)}
                placeholder="Masukan Nama Bidang Baru"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleTambahBidang();
                  }
                }}
              />

              <button
                onClick={handleTambahBidang}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-xl">+</span> Tambah
              </button>
            </div>
          </div>

          {/* ================= UPDATE BIDANG TERBARU ================= */}
          <div className="space-y-4">
            <div
              className="px-6 py-4 font-semibold text-white rounded-t-xl"
              style={{
                background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
              }}
            >
              Update Bidang Terbaru
            </div>

            <div className="bg-white rounded-b-xl shadow-lg overflow-hidden h-[calc(100%-4rem)]">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className="text-white text-sm"
                    style={{
                      background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
                    }}
                  >
                    <tr>
                      <th className="px-6 py-3 text-left font-medium">No</th>
                      <th className="px-6 py-3 text-left font-medium">Bidang</th>
                      <th className="px-6 py-3 text-left font-medium">Aksi</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {bidangTerbaru.slice(0, 3).map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {index + 1}.
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.nama}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => openPopup(item.id, "terbaru")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ================= DAFTAR LIST BIDANG ================= */}
        <div className="space-y-4">
          
          <div
            className="px-6 py-4 font-semibold text-white rounded-t-xl"
            style={{
              background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
            }}
          >
            Daftar List Bidang
          </div>

          <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className="text-white text-sm"
                  style={{
                    background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
                  }}
                >
                  <tr>
                    <th className="px-6 py-3 text-left font-medium">No</th>
                    <th className="px-6 py-3 text-left font-medium">Bidang</th>
                    <th className="px-6 py-3 text-left font-medium">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {startIndex + index + 1}.
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.nama}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => openPopup(item.id, "list")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          {/* PAGINATION */}
          <div className="bg-white rounded-lg shadow-sm px-6 py-4 flex justify-between items-center text-sm text-gray-600">
            <span>
              Menampilkan <b>{startIndex + 1}–{Math.min(endIndex, bidangList.length)}</b> dari <b>{bidangList.length}</b> Bidang
            </span>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:underline"}`}
              >
                &lt; Prev
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 flex items-center justify-center rounded
                        ${currentPage === page
                          ? "border border-[#409144] text-[#409144] font-semibold"
                          : "hover:underline"
                        }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return <span key={page} className="text-gray-400">...</span>;
                }
                return null;
              })}

              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:underline"}`}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= POPUP KONFIRMASI HAPUS ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-white rounded-xl w-full max-w-lg shadow-lg border border-gray-200">

            {/* HEADER */}
            <div className="p-6 text-center">
              <img
                src={infoIcon}
                alt="warning"
                className="w-12 mx-auto mb-3"
              />
              <h2 className="text-lg font-bold text-gray-800">
                Hapus Data Bidang?
              </h2>
            </div>

            {/* GARIS PEMBATAS */}
            <div className="h-px bg-gray-200 mx-6" />

            {/* BODY */}
            <div className="p-6 text-sm text-gray-700 text-center">
              <p>
                Apakah anda yakin ingin menghapus bidang tersebut?
              </p>
            </div>

            {/* GARIS PEMBATAS */}
            <div className="h-px bg-gray-200 mx-6" />

            {/* FOOTER */}
            <div className="flex justify-end gap-3 p-4">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-lg border border-gray-300
                          text-sm text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700
                          text-white text-sm"
              >
                Hapus
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminSuperLayout>
  );
};

export default ManajemenBidang;