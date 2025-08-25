// types/index.ts

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialties: Specialty[];
  clinicIds: number[];
  clinics: Clinic[];
  yearsOfExperience: number;
  profileImage?: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface Clinic {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  website?: string;
  acceptedInsurance: string[];
  doctorIds: string[]; // Doctors practicing at this clinic
}

export interface Review {
  id: string;
  doctorId: string;
  clinicId: string;
  patientAge?: number;
  visitDate: string; // ISO date string
  ratings: {
    overall: number; // 1-5
    bedside_manner: number;
    waitTime: number;
    officeEnvironment: number;
  };
}

// Helper types you might find useful
export type DoctorWithReviews = Doctor & {
  reviews: Review[];
};

export type SearchFilters = {
  name?: string;
  clinicId?: string;
};
export enum Specialty {
  // Primary Care
  FAMILY_MEDICINE = "Family Medicine",
  INTERNAL_MEDICINE = "Internal Medicine",
  PEDIATRICS = "Pediatrics",

  // Common Specialists
  CARDIOLOGY = "Cardiology",
  DERMATOLOGY = "Dermatology",
  ORTHOPEDIC_SURGERY = "Orthopedic Surgery",
  OBSTETRICS_GYNECOLOGY = "Obstetrics & Gynecology",
  PSYCHIATRY = "Psychiatry",
  OPHTHALMOLOGY = "Ophthalmology",
  OTOLARYNGOLOGY = "Otolaryngology (ENT)",
  UROLOGY = "Urology",
  GASTROENTEROLOGY = "Gastroenterology",
  PULMONOLOGY = "Pulmonology",
  ENDOCRINOLOGY = "Endocrinology",
  RHEUMATOLOGY = "Rheumatology",
  NEUROLOGY = "Neurology",
  ONCOLOGY = "Oncology",

  // Surgery Specialties
  GENERAL_SURGERY = "General Surgery",
  PLASTIC_SURGERY = "Plastic Surgery",
  NEUROSURGERY = "Neurosurgery",

  // Emergency & Critical Care
  EMERGENCY_MEDICINE = "Emergency Medicine",
  ANESTHESIOLOGY = "Anesthesiology",
  CRITICAL_CARE = "Critical Care",

  // Radiology & Pathology
  RADIOLOGY = "Radiology",
  PATHOLOGY = "Pathology",

  // Mental Health
  PSYCHOLOGY = "Psychology",

  // Other Common Specialties
  PHYSICAL_MEDICINE_REHABILITATION = "Physical Medicine & Rehabilitation",
  ALLERGY_IMMUNOLOGY = "Allergy & Immunology",
}
export enum Rating {
  EXCELLENT = 5,
  GOOD = 4,
  AVERAGE = 3,
  POOR = 2,
  TERRIBLE = 1,
}
