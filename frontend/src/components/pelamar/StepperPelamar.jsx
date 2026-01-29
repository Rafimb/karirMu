import { TickCircle } from "iconsax-react";
import pieIcon from "../../assets/icons/ProfilAum/pie-chart-alt.svg";

const StepperPelamar = ({ currentStep = 1 }) => {
  const steps = [
    { id: 1, title: "Biodata & Dokumen", label: "Optional Label" },
    { id: 2, title: "Pendidikan", label: "Optional Label" },
    { id: 3, title: "Pengalaman & Keahlian", label: "Incomplete step" },
  ];

  return (
    <div className="relative bg-white rounded-b-xl shadow-sm px-6 py-5 overflow-hidden">

      {/* ===== GARIS PROGRESS ATAS (GRADIENT) ===== */}
      <div className="absolute top-0 left-0 w-full h-1">
        <div
          className="h-full"
          style={{
            width: `${(currentStep / steps.length) * 100}%`,
            background: "linear-gradient(90deg, #004F8F 0%, #009B49 100%)",
          }}
        />
      </div>

      {/* ===== ISI STEPPER ===== */}
      <div className="flex items-center pt-4">
        {steps.map((step, index) => {
          const done = step.id < currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-3">

                {/* DONE */}
                {done ? (
                  <TickCircle size={22} color="#22C55E" variant="Bold" />
                ) : (
                  <img
                    src={pieIcon}
                    alt="step"
                    className="w-4 h-4"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(18%) sepia(97%) saturate(5196%) hue-rotate(349deg) brightness(93%) contrast(95%)",
                    }}
                  />
                )}

                {/* TEXT */}
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      done ? "text-gray-800" : "text-[#DA1E28]"
                    }`}
                  >
                    {step.id}. {step.title}
                  </p>
                  <p
                    className={`text-xs ${
                      done ? "text-gray-500" : "text-[#DA1E28]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* ===== GARIS HORIZONTAL (HITAM) ===== */}
              {index !== steps.length - 1 && (
                <div className="flex-1 mx-6 h-px bg-black" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepperPelamar;