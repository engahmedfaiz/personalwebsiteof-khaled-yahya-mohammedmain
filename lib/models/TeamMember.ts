export interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  image: string;
  specializations: string[];
  experience: string;
  education: string[];
  achievements: string[];
  phone: string;
  email: string;
  address?: string;
  bio: string;
  training?: string[];
  trainingCourses?: string[];
  expertise?: string[];
  additionalSkills?: string[];
  experienceDetails?: string[];
  trainingPrograms?: string[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}