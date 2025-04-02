
import { Student, MessAuthority, HostelAuthority, Outpass, Complaint, MenuItem, Schedule, HostelImage } from "@/types";

// Sample data
export const students: Student[] = [
  {
    id: "s1",
    username: "student1",
    name: "Alex Johnson",
    role: "student",
    email: "alex@example.com",
    roomNumber: "A-101",
    parentContactNumber: "+1234567890",
    wardenName: "Dr. Smith",
    wardenContactNumber: "+1987654321",
    messAttendance: [
      {
        date: new Date().toISOString().split('T')[0],
        breakfast: true,
        lunch: true,
        dinner: false,
      },
    ],
  },
];

export const messAuthorities: MessAuthority[] = [
  {
    id: "m1",
    username: "mess1",
    name: "Mike Wilson",
    role: "mess",
    email: "mike@example.com",
  },
];

export const hostelAuthorities: HostelAuthority[] = [
  {
    id: "h1",
    username: "hostel1",
    name: "Sarah Parker",
    role: "hostel",
    email: "sarah@example.com",
  },
];

export const outpasses: Outpass[] = [
  {
    id: "o1",
    studentId: "s1",
    studentName: "Alex Johnson",
    reason: "Family function",
    fromDate: "2023-11-15",
    toDate: "2023-11-17",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export const complaints: Complaint[] = [
  {
    id: "c1",
    studentId: "s1",
    studentName: "Alex Johnson",
    title: "Water leakage in room",
    description: "There is water leaking from the ceiling in my room",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    day: "monday",
    breakfast: "Bread, Eggs, Milk",
    lunch: "Rice, Dal, Paneer",
    dinner: "Chapati, Vegetables, Soup",
  },
  {
    id: "m2",
    day: "tuesday",
    breakfast: "Idli, Sambar, Coffee",
    lunch: "Rice, Sambar, Curd",
    dinner: "Chapati, Curry, Pulao",
  },
  {
    id: "m3",
    day: "wednesday",
    breakfast: "Poha, Tea",
    lunch: "Rice, Dal, Chicken",
    dinner: "Chapati, Vegetables, Milk",
  },
  {
    id: "m4",
    day: "thursday",
    breakfast: "Sandwich, Juice",
    lunch: "Rice, Dal, Fish",
    dinner: "Chapati, Curry, Fruits",
  },
  {
    id: "m5",
    day: "friday",
    breakfast: "Upma, Coffee",
    lunch: "Rice, Dal, Egg Curry",
    dinner: "Chapati, Vegetables, Ice Cream",
  },
  {
    id: "m6",
    day: "saturday",
    breakfast: "Dosa, Chutney",
    lunch: "Rice, Sambar, Payasam",
    dinner: "Chapati, Paneer, Fruits",
  },
  {
    id: "m7",
    day: "sunday",
    breakfast: "Paratha, Curd",
    lunch: "Rice, Dal, Special Dessert",
    dinner: "Chapati, Mixed Vegetables, Milk",
  },
];

export const schedules: Schedule[] = [
  {
    id: "s1",
    title: "Mid-term Exams",
    date: "2023-11-20",
    description: "Mid-term examinations starting from 9 AM",
  },
  {
    id: "s2",
    title: "Cultural Fest",
    date: "2023-12-05",
    description: "Annual cultural festival from 10 AM to 8 PM",
  },
];

export const hostelImages: HostelImage[] = [
  {
    id: "i1",
    url: "/hostel/hostel-front.jpg",
    title: "Hostel Front View",
  },
  {
    id: "i2",
    url: "/hostel/hostel-room.jpg",
    title: "Student Room",
  },
  {
    id: "i3",
    url: "/hostel/mess-hall.jpg",
    title: "Mess Hall",
  },
  {
    id: "i4",
    url: "/hostel/recreation-area.jpg",
    title: "Recreation Area",
  },
];

// Mock credentials
type Credentials = {
  username: string;
  password: string;
  role: "student" | "mess" | "hostel";
  userId: string;
};

export const credentials: Credentials[] = [
  {
    username: "student1",
    password: "password123",
    role: "student",
    userId: "s1",
  },
  {
    username: "mess1",
    password: "password123",
    role: "mess",
    userId: "m1",
  },
  {
    username: "hostel1",
    password: "password123",
    role: "hostel",
    userId: "h1",
  },
];

// Mock service functions
export const mockAuthService = {
  login: (username: string, password: string) => {
    const user = credentials.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) return null;

    switch (user.role) {
      case "student":
        return students.find((s) => s.id === user.userId);
      case "mess":
        return messAuthorities.find((m) => m.id === user.userId);
      case "hostel":
        return hostelAuthorities.find((h) => h.id === user.userId);
      default:
        return null;
    }
  },

  register: (
    username: string,
    password: string,
    name: string,
    email: string,
    role: "student" | "mess" | "hostel",
    additionalInfo?: any
  ) => {
    // Check if user exists
    if (credentials.some((c) => c.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    const newUserId = `${role[0]}${credentials.length + 1}`;
    
    // Add credentials
    credentials.push({
      username,
      password,
      role,
      userId: newUserId,
    });

    // Add user data
    switch (role) {
      case "student":
        const newStudent: Student = {
          id: newUserId,
          username,
          name,
          role: "student",
          email,
          roomNumber: additionalInfo?.roomNumber || "Not assigned",
          parentContactNumber: additionalInfo?.parentContactNumber || "Not provided",
          wardenName: "Not assigned",
          wardenContactNumber: "Not provided",
          messAttendance: [],
        };
        students.push(newStudent);
        return { success: true, user: newStudent };
      
      case "mess":
        const newMessAuthority: MessAuthority = {
          id: newUserId,
          username,
          name,
          role: "mess",
          email,
        };
        messAuthorities.push(newMessAuthority);
        return { success: true, user: newMessAuthority };
      
      case "hostel":
        const newHostelAuthority: HostelAuthority = {
          id: newUserId,
          username,
          name,
          role: "hostel",
          email,
        };
        hostelAuthorities.push(newHostelAuthority);
        return { success: true, user: newHostelAuthority };
      
      default:
        return { success: false, message: "Invalid role" };
    }
  },
  
  resetPassword: (username: string, newPassword: string) => {
    const userIndex = credentials.findIndex(u => u.username === username);
    if (userIndex === -1) return false;
    
    credentials[userIndex].password = newPassword;
    return true;
  }
};

export const mockStudentService = {
  getStudentById: (id: string) => {
    return students.find((s) => s.id === id);
  },

  getAllStudents: () => {
    return [...students];
  },

  updateStudent: (id: string, data: Partial<Student>) => {
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return null;

    students[index] = { ...students[index], ...data };
    return students[index];
  },

  createOutpass: (outpass: Omit<Outpass, "id" | "createdAt" | "status">) => {
    const newOutpass: Outpass = {
      ...outpass,
      id: `o${outpasses.length + 1}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    outpasses.push(newOutpass);
    return newOutpass;
  },

  createComplaint: (complaint: Omit<Complaint, "id" | "createdAt" | "status">) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: `c${complaints.length + 1}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    complaints.push(newComplaint);
    return newComplaint;
  },

  getOutpassesByStudentId: (studentId: string) => {
    return outpasses.filter((o) => o.studentId === studentId);
  },

  getComplaintsByStudentId: (studentId: string) => {
    return complaints.filter((c) => c.studentId === studentId);
  },
};

export const mockMessService = {
  updateAttendance: (studentId: string, date: string, meal: 'breakfast' | 'lunch' | 'dinner', attended: boolean) => {
    const studentIndex = students.findIndex((s) => s.id === studentId);
    if (studentIndex === -1) return null;
    
    // Find attendance for date
    const attendanceIndex = students[studentIndex].messAttendance.findIndex(a => a.date === date);
    
    if (attendanceIndex === -1) {
      // Create new attendance record
      students[studentIndex].messAttendance.push({
        date,
        breakfast: meal === 'breakfast' ? attended : false,
        lunch: meal === 'lunch' ? attended : false,
        dinner: meal === 'dinner' ? attended : false,
      });
    } else {
      // Update existing record
      students[studentIndex].messAttendance[attendanceIndex][meal] = attended;
    }
    
    // Simulate sending message to parent
    console.log(`Message sent to parent of ${students[studentIndex].name}: Your ward ${attended ? 'has taken' : 'has missed'} ${meal} on ${date}`);
    
    return students[studentIndex];
  },
  
  getMenuItems: () => {
    return [...menuItems];
  },
  
  updateMenuItem: (id: string, data: Partial<MenuItem>) => {
    const index = menuItems.findIndex((m) => m.id === id);
    if (index === -1) return null;
    
    menuItems[index] = { ...menuItems[index], ...data };
    return menuItems[index];
  }
};

export const mockHostelService = {
  getOutpasses: (status?: 'pending' | 'approved' | 'rejected') => {
    if (status) {
      return outpasses.filter(o => o.status === status);
    }
    return [...outpasses];
  },
  
  updateOutpassStatus: (id: string, status: 'approved' | 'rejected') => {
    const index = outpasses.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    outpasses[index].status = status;
    
    // Simulate sending message to parent
    const student = students.find(s => s.id === outpasses[index].studentId);
    if (student) {
      console.log(`Message sent to parent of ${student.name}: Outpass request from ${outpasses[index].fromDate} to ${outpasses[index].toDate} has been ${status}`);
    }
    
    return outpasses[index];
  },
  
  getComplaints: (status?: 'pending' | 'in-progress' | 'resolved') => {
    if (status) {
      return complaints.filter(c => c.status === status);
    }
    return [...complaints];
  },
  
  updateComplaintStatus: (id: string, status: 'in-progress' | 'resolved', response?: string) => {
    const index = complaints.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    complaints[index].status = status;
    if (response) {
      complaints[index].response = response;
    }
    
    return complaints[index];
  },
  
  updateStudentDetails: (id: string, data: Partial<Student>) => {
    return mockStudentService.updateStudent(id, data);
  },
};
