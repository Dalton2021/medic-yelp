import { Clinic } from '@/types';

interface DoctorDropdownItem {
  item: {
    name: string;
    specialties: string[];
    clinics: Clinic[];
  };
}

const DoctorDropdownItem = ({ item }: DoctorDropdownItem) => {
  console.log('doctor', item.clinics);
  return (
    <div className="hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">{item.name}</h3>

          <div className="flex items-center gap-1 mb-2">
            {item.specialties.length >= 1 ? (
              <div className="flex items-center gap-1 truncate max-w-60">
                {item.specialties.slice(0, 2).map((spec) => (
                  <span
                    key={spec}
                    className=" px-0.5 bg-blue-50 text-blue-600 text-[0.7rem] font-medium rounded-md border border-blue-200">
                    {spec}
                  </span>
                ))}
                {item.specialties.length > 2 && (
                  <span className="text-xs text-gray-500 font-medium">
                    +{item.specialties.length - 2} more
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-gray-400 italic">Specialties not specified</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600 w-52 truncate">
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {item.clinics.length >= 1 ? (
              <span className="truncate">
                {item.clinics
                  .slice(0, 2)
                  .map((clinic) => clinic.name)
                  .join(', ')}
                {item.clinics.length > 2 && ` +${item.clinics.length - 2} more`}
              </span>
            ) : (
              <span className="italic text-gray-400">Clinic not specified</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDropdownItem;
