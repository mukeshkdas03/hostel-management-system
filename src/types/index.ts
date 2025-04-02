
export type UserRole = 'student' | 'mess' | 'hostel';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Student extends User {
  role: 'student';
  roomNumber: string;
  parentContactNumber: string;
  wardenName: string;
  wardenContactNumber: string;
  messAttendance: {
    date: string;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  }[];
}

export interface MessAuthority extends User {
  role: 'mess';
}

export interface HostelAuthority extends User {
  role: 'hostel';
}

export interface Outpass {
  id: string;
  studentId: string;
  studentName: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  response?: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface Schedule {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface HostelImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}
