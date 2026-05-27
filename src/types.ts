/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  experience: string;
  rating: number;
  schedule: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  cost: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: 'Menunggu Konfirmasi' | 'Dikonfirmasi' | 'Selesai';
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  features: string[];
  recommendedFor: string;
}
