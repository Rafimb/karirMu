import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminAumLayout from "../../components/layout/AdminAumLayout";

// ICONS
import checkIcon from "../../assets/icons/ProfilAum/check.svg";
import userIcon from "../../assets/icons/ProfilAum/user.svg";
import docTextIcon from "../../assets/icons/ProfilAum/document-text.svg";
import downloadIcon from "../../assets/icons/ProfilAum/document-download.svg";
import closeIcon from "../../assets/icons/iconClose.svg";

const DetailProfilAum = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewLogo, setPreviewLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [saving, setSaving] = useState(false);

  // State untuk modal preview dokumen
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi file
      if (!file.type.startsWith('image/')) {
        alert('File harus berupa gambar');
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB
        alert('Ukuran file maksimal 2MB');
        return;
      }
      
      console.log('Logo file selected:', file.name);
      setLogoFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewLogo(previewUrl);
      console.log('Preview URL created:', previewUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = new FormData();

      console.log('=== SAVING DATA ===');
      console.log('Form Data:', formData);
      console.log('Logo File:', logoFile);

      // Append semua field yang ada di formData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      // Append logo file jika ada
      if (logoFile instanceof File) {
        payload.append("logo", logoFile);
        console.log('Logo appended to FormData');
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const res = await axios.put(
        "http://localhost:5000/api/admin-aum/company/edit-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Server response:', res.data);

      // Update state dengan data terbaru dari server
      if (res.data.company) {
        setCompany(res.data.company);
        
        // Update preview logo dengan URL dari server
        if (res.data.company.logo_url) {
          setPreviewLogo(res.data.company.logo_url);
          console.log('Logo updated from server:', res.data.company.logo_url);
        }
      }

      // Reset modal state
      setShowEditModal(false);
      setLogoFile(null);
      
      alert("Profile berhasil diperbarui!");
      
      // Refresh halaman untuk memastikan semua data terupdate
      window.location.reload();
    } catch (error) {
      console.error("Error saving:", error);
      
      let errorMessage = "Terjadi kesalahan saat menyimpan";
      
      if (error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
        if (error.response.data.error) {
          errorMessage += `\n${error.response.data.error}`;
        }
      } else if (error.request) {
        errorMessage = "Tidak dapat terhubung ke server";
      }
      
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Fungsi untuk membuka dokumen dalam modal
  const handleViewDocument = (doc) => {
    if (!doc || !doc.document_url) {
      alert('URL dokumen tidak valid');
      return;
    }
    
    console.log('Opening document in modal:', doc);
    setCurrentDocument(doc);
    setShowDocumentModal(true);
  };

  // Fungsi untuk download dokumen
  const handleDownloadDocument = async (doc) => {
    if (!doc || !doc.document_url) {
      alert('URL dokumen tidak valid');
      return;
    }
    
    try {
      console.log('Downloading document:', doc);
      
      // Buka URL di tab baru dengan attribute download
      const link = document.createElement('a');
      link.href = doc.document_url;
      link.setAttribute('download', doc.document_name || 'document');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Download initiated');
    } catch (error) {
      console.error('Error downloading document:', error);
      // Fallback: buka langsung
      window.open(doc.document_url, '_blank', 'noopener,noreferrer');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/login');
          return;
        }
        
        const response = await axios.get(
          "http://localhost:5000/api/admin-aum/company/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Profile data:', response.data);

        if (response.data.company) {
          setCompany(response.data.company);
          setDocuments(response.data.documents || []);
          
          // Set logo URL dari server
          if (response.data.company.logo_url) {
            setPreviewLogo(response.data.company.logo_url);
            console.log('Logo URL from server:', response.data.company.logo_url);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem("accessToken");
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Cleanup preview URL saat component unmount atau logo berubah
  useEffect(() => {
    return () => {
      // Hanya cleanup jika itu blob URL (bukan URL dari server)
      if (previewLogo && previewLogo.startsWith('blob:')) {
        URL.revokeObjectURL(previewLogo);
      }
    };
  }, [previewLogo]);

  if (loading) {
    return (
      <AdminAumLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#409144] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminAumLayout>
    );
  }

  if (!company) {
    return (
      <AdminAumLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Data company tidak ditemukan</p>
            <button
              onClick={() => navigate('/admin-aum/dashboard')}
              className="px-4 py-2 bg-[#409144] text-white rounded hover:bg-[#367a3a] transition"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </AdminAumLayout>
    );
  }

  return (
    <AdminAumLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          {/* HEADER */}
          <div className="bg-white px-4 py-3 rounded-md shadow-sm text-sm font-semibold">
            Profil & Legalitas AUM
          </div>

          {/* MODAL EDIT */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
              <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-lg grid grid-rows-[auto_1fr_auto] overflow-hidden">
                {/* HEADER */}
                <div
                  className="px-5 py-3 text-white font-semibold flex justify-between items-center"
                  style={{ background: "linear-gradient(90deg, #004F8F, #009B49)" }}
                >
                  Edit Profile
                  <img
                    src={closeIcon}
                    className="w-4 h-4 cursor-pointer filter invert"
                    onClick={() => {
                      setShowEditModal(false);
                      setLogoFile(null);
                      setPreviewLogo(company.logo_url || null);
                    }}
                    alt="close"
                  />
                </div>

                {/* BODY (SCROLLABLE) */}
                <div className="overflow-y-auto">
                  {/* FOTO PROFIL */}
                  <div className="px-6 pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        {previewLogo ? (
                          <img
                            src={previewLogo}
                            className="w-full h-full object-cover"
                            alt="preview"
                            onError={(e) => {
                              console.error('Error loading image:', previewLogo);
                              e.target.src = userIcon;
                            }}
                          />
                        ) : (
                          <img src={userIcon} className="w-8 h-8 opacity-60" alt="user" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Foto Profil</p>
                        <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded cursor-pointer text-sm hover:bg-gray-50 transition">
                          {logoFile ? 'Ganti Foto' : 'Edit Foto'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {logoFile ? `Terpilih: ${logoFile.name}` : 'PNG / JPG · max 2MB'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* FORM */}
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <Input label="Nama Perusahaan" name="company_name" value={formData.company_name} onChange={handleChange} />
                    <Input label="No Telepon" name="company_phone" value={formData.company_phone} onChange={handleChange} />
                    <Input label="Email" name="company_email" value={formData.company_email} onChange={handleChange} />
                    <Input label="Website" name="company_url" value={formData.company_url} onChange={handleChange} />
                    <Input label="Provinsi" name="province" value={formData.province} onChange={handleChange} />
                    <Input label="Kota / Kabupaten" name="city" value={formData.city} onChange={handleChange} />
                    <Input label="Bidang Industri" name="industry" value={formData.industry} onChange={handleChange} />
                    <Input label="Jumlah Karyawan" name="employee_range" value={formData.employee_range} onChange={handleChange} />

                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-xs">Deskripsi</label>
                      <textarea
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-gray-500 text-xs">Alamat</label>
                      <textarea
                        name="address"
                        value={formData.address || ""}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-6 pb-4 bg-white">
                  <div className="border-t border-gray-200/70 my-4"></div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setLogoFile(null);
                        setPreviewLogo(company.logo_url || null);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                      disabled={saving}
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-[#409144] text-white rounded text-sm font-semibold hover:bg-[#367a3a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? "Menyimpan..." : "Simpan"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODAL PREVIEW DOKUMEN */}
          {showDocumentModal && currentDocument && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
              <div className="bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
                {/* HEADER */}
                <div
                  className="px-5 py-4 text-white font-semibold flex justify-between items-center"
                  style={{ background: "linear-gradient(90deg, #004F8F, #009B49)" }}
                >
                  <div className="flex items-center gap-3">
                    <img src={docTextIcon} className="w-5 h-5 filter brightness-0 invert" alt="doc" />
                    <span className="text-lg">{currentDocument.document_name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowDocumentModal(false);
                      setCurrentDocument(null);
                    }}
                    className="hover:bg-white/20 rounded p-1 transition"
                  >
                    <img
                      src={closeIcon}
                      className="w-5 h-5 filter invert"
                      alt="close"
                    />
                  </button>
                </div>

                {/* BODY - IFRAME */}
                <div className="flex-1 bg-gray-100 relative">
                  <iframe
                    src={`${currentDocument.document_url}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`}
                    className="w-full h-full border-0"
                    title={currentDocument.document_name}
                    allow="fullscreen"
                    loading="lazy"
                  />
                </div>

                {/* FOOTER */}
                <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded text-xs ${
                      currentDocument.status === 'approved' ? 'bg-green-100 text-green-700' :
                      currentDocument.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {currentDocument.status === 'approved' ? 'Disetujui' :
                       currentDocument.status === 'rejected' ? 'Ditolak' :
                       'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={currentDocument.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                    >
                      Buka di Tab Baru
                    </a>
                    <button
                      onClick={() => handleDownloadDocument(currentDocument)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#409144] text-white rounded text-sm font-semibold hover:bg-[#367a3a] transition"
                    >
                      <img src={downloadIcon} className="w-4 h-4 filter brightness-0 invert" alt="download" />
                      Unduh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALERT */}
          {alertVisible && (
            <div className="relative bg-green-50 border-l-4 border-green-500 rounded-md p-4 flex justify-between">
              <div className="flex gap-3">
                <img src={checkIcon} className="w-6 h-6 mt-1" alt="check" />
                <div>
                  <p className="font-bold">Profil Anda Sudah Lengkap</p>
                  <p className="text-sm text-gray-600">
                    Anda dapat menggunakan seluruh fitur rekrutmen kami.
                  </p>
                </div>
              </div>
              <img
                src={closeIcon}
                className="w-4 h-4 cursor-pointer"
                alt="close"
                onClick={() => setAlertVisible(false)}
              />
            </div>
          )}

          {/* PROFIL AUM */}
          <div
            className="flex rounded-t-2xl overflow-hidden shadow-sm"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            <div className="flex items-center p-4 flex-[0.6] text-white gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-6 overflow-hidden">
                {company.logo_url ? (
                  <img
                    src={company.logo_url}
                    className="w-full h-full object-cover"
                    alt="Logo Perusahaan"
                    onError={(e) => {
                      console.error('Error loading company logo');
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}
                <img 
                  src={userIcon} 
                  className="w-10 h-10" 
                  alt="user"
                  style={{ display: company.logo_url ? 'none' : 'block' }}
                />
              </div>
              <div className="w-px bg-white h-20 mr-6"></div>
              <div>
                <p className="font-bold text-lg">{company.company_name}</p>
                <p className="text-sm">{company.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 flex-[0.4]">
              <div className="flex items-center gap-2 border border-white px-3 py-1.5 rounded text-white text-sm font-semibold">
                <img src={checkIcon} className="w-4 h-4 filter brightness-0 invert" alt="verified" />
                Terverifikasi
              </div>
            </div>
          </div>

          {/* INFORMASI UMUM */}
          <div
            className="px-4 py-3 rounded-t-md font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Informasi Umum
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-md shadow-sm divide-y divide-gray-200 text-sm">
              <Row label="Nama Perusahaan" value={company.company_name} />
              <Row label="No Telepon" value={company.company_phone} />
              <Row label="Provinsi" value={company.province} />
              <Row label="Bidang Industri" value={company.industry} />
            </div>
            <div className="bg-white rounded-md shadow-sm divide-y divide-gray-200 text-sm">
              <Row label="Email Perusahaan" value={company.company_email} />
              <Row label="Website Resmi" value={company.company_url} />
              <Row label="Kota / Kabupaten" value={company.city} />
              <Row label="Jumlah Karyawan" value={company.employee_range} />
            </div>
          </div>

          {/* DESKRIPSI & ALAMAT */}
          <div className="bg-white rounded-md shadow-sm divide-y divide-gray-200 text-sm mt-4">
            <div className="p-4">
              <p className="text-gray-500 mb-1 font-semibold">Deskripsi Perusahaan</p>
              <p>{company.description}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-500 mb-1 font-semibold">Alamat Lengkap</p>
              <p>{company.address}, {company.city}, {company.province}</p>
            </div>
          </div>

          {/* DOKUMEN LEGALITAS */}
          <div
            className="px-4 py-3 rounded-t-md font-medium text-white"
            style={{ background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)" }}
          >
            Dokumen Legalitas
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(documents) && documents.length > 0 ? (
              documents.map((doc, i) => (
                <div key={i} className="bg-white rounded-b-md divide-y divide-gray-200 text-sm shadow-sm">
                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img src={docTextIcon} className="w-4 h-4" alt="doc" />
                      <span className="font-medium">{doc.document_name}</span>
                    </div>
                    <div className="flex gap-2">
                     {/* Tombol Lihat File */}
<button
  onClick={() => handleViewDocument(doc)}
  className="flex items-center gap-1 px-3 py-1 rounded text-xs border border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition"
  title="Lihat dokumen"
>
  <img
    src={docTextIcon}
    className="w-5 h-5"
    alt="view"
    style={{ filter: "none" }} // ikon tetap hijau, tidak ikut teks
  />
  Lihat File
</button>

{/* Tombol Unduh */}
<button
  onClick={() => handleDownloadDocument(doc)}
  className="flex items-center gap-1 px-3 py-1 rounded text-xs border border-green-600 text-white bg-green-600 hover:bg-white hover:text-green-600 transition"
  title="Download dokumen"
>
  <img
    src={downloadIcon}
    className="w-4 h-4 filter invert" // agar ikon putih
    alt="download"
  />
  Unduh
</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4 col-span-2 text-gray-500">
                Belum ada dokumen yang diunggah
              </p>
            )}
          </div>

          {/* EDIT BUTTON */}
          <div className="bg-white rounded-md p-4 flex justify-end shadow-sm">
            <button
              onClick={() => {
                setFormData({
                  company_name: company?.company_name || "",
                  company_phone: company?.company_phone || "",
                  company_email: company?.company_email || "",
                  company_url: company?.company_url || "",
                  province: company?.province || "",
                  city: company?.city || "",
                  industry: company?.industry || "",
                  employee_range: company?.employee_range || "",
                  description: company?.description || "",
                  address: company?.address || "",
                });
                setPreviewLogo(company.logo_url || null);
                setLogoFile(null);
                setShowEditModal(true);
              }}
              className="flex items-center gap-2 border border-[#409144] text-[#409144] px-5 py-2 rounded font-semibold hover:bg-[#409144] hover:text-white transition"
            >
              Edit / Update
            </button>
          </div>
        </div>
      </div>
    </AdminAumLayout>
  );
};

/* ROW STYLE (GARIS DALAM CARD) */
const Row = ({ label, value }) => (
  <div className="flex px-4 py-3">
    <span className="w-56 text-gray-500">{label}</span>
    <span className="font-medium break-all line-clamp-1">{value || '-'}</span>
  </div>
);

/* INPUT COMPONENT */
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-gray-500 text-xs">{label}</label>
    <input
      id={name}
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full rounded px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
    />
  </div>
);

export default DetailProfilAum;