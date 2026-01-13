import React from "react";
import docTextIcon from "../../assets/icons/ProfilAum/document-text.svg";
import checkIcon from "../../assets/icons/ProfilAum/check.svg";


/* ================= Sub Component ================= */
const DocumentItem = ({ title, isUploaded, onUpload }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-800">{title}</label>


      <div className="flex items-center border border-gray-300 overflow-hidden bg-gray-100">
        
        {/* BUTTON PILIH FILE */}
        <label className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 cursor-pointer text-blue-600 font-medium whitespace-nowrap">
          Pilih File
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={onUpload}
          />
        </label>

        {/* PLACEHOLDER */}
        <div className="flex items-center gap-2 px-4 py-2 text-sm flex-1">
          {isUploaded ? (
            <>
              <img src={checkIcon} alt="uploaded" className="w-4 h-4" />
              <span className="text-green-600 font-medium">
                Terunggah
              </span>
            </>
          ) : (
            <span className="text-gray-500">
              Belum ada file dipilih!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
/* ================= Main Component ================= */
const DokumenAum = ({ formData, setFormData }) => {
  const requiredDocuments = [
    { id: "ad_art", label: "AD/ART Muhammadiyah", value: "AD_ART" },
    { id: "sk", label: "Surat Keputusan (SK)", value: "SK" },
    { id: "qaidah", label: "Qaidah PPM", value: "QAIDAH_PPM" },
    { id: "npwp", label: "NPWP Perusahaan", value: "NPWP" },
  ];

  const handleUpload = (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => {
      const filteredDocs = prev.documents.filter(
        (d) => d.name !== docType
      );

      return {
        ...prev,
        documents: [
          ...filteredDocs,
          { name: docType, file },
        ],
      };
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}
      <div
        className="text-white font-medium px-4 py-3 rounded-t-lg"
        style={{
          background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
        }}
      >
        Dokumen Legalitas
      </div>

      {/* BODY */}
      <div className="bg-white rounded-b-lg p-8 border border-gray-200 flex flex-col gap-5">
        {requiredDocuments.map((doc) => {
          const uploadedFile = formData.documents.find(
            (d) => d.name === doc.value
          );

          return (
            <DocumentItem
              key={doc.id}
              title={`Unggah Dokumen ${doc.label} (PDF, Maks 5MB)`}
              isUploaded={!!uploadedFile}
              onUpload={(e) => handleUpload(e, doc.value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DokumenAum;
