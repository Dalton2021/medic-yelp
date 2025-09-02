// types/index.ts

export interface Doctor {
  id: number;
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
  doctorIds: number[]; // Doctors practicing at this clinic
}

export interface Review {
  id: string;
  doctorId: number;
  clinicId: number;
  patientAge?: number;
  visitDate: string; // ISO date string
  ratings: {
    overall: Rating;
    bedside_manner: Rating;
    waitTime: Rating;
    officeEnvironment: Rating;
  };
}

export interface ReviewBundle {
  id: number;
  total: number;
  ratings: number[];
  overall: number;
}

export interface ClinicAndReviews {
  Clinic: Clinic;
  Ratings: ReviewBundle;
}
export interface DoctorAndReviews {
  Doctor: Doctor;
  Ratings: ReviewBundle;
}

// Helper types you might find useful

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

export interface ClinicSummary {
  id: number;
  summary: string;
  foundedYear: number;
  services: string[];
}

export interface ClinicRating {
  clinicId: number;
  waitTimes: number;
  staff: number;
  patientCareSatisfaction: number;
  affordability: number;
  atmosphere: number;
  overallRating: number;
}
