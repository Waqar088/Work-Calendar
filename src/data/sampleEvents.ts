import { Event } from "@/types/Event";

export const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Q4 All Hands Meeting",
    description: "Quarterly company-wide meeting to discuss achievements, goals, and upcoming initiatives.",
    date: new Date(2024, 11, 15), // December 15, 2024
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    category: "meeting",
    organizer: "Leadership Team",
    location: "Main Conference Room",
    color: "#3B82F6"
  },
  {
    id: "2",
    title: "Holiday Party",
    description: "Annual company holiday celebration with dinner, drinks, and entertainment.",
    date: new Date(2024, 11, 20), // December 20, 2024
    startTime: "6:00 PM",
    endTime: "10:00 PM",
    category: "social",
    organizer: "HR Department",
    location: "Downtown Event Center",
    color: "#10B981"
  },
  {
    id: "3",
    title: "New Year's Day",
    description: "Company holiday - office closed",
    date: new Date(2025, 0, 1), // January 1, 2025
    category: "holiday",
    organizer: "HR Department",
    color: "#F59E0B"
  },
  {
    id: "4",
    title: "React Advanced Training",
    description: "Advanced React development workshop covering hooks, context, and performance optimization.",
    date: new Date(2025, 0, 15), // January 15, 2025
    startTime: "9:00 AM",
    endTime: "4:00 PM",
    category: "training",
    organizer: "Tech Lead",
    location: "Training Room B",
    link: "https://training.company.com/react-advanced",
    color: "#8B5CF6"
  },
  {
    id: "5",
    title: "Team Building Event",
    description: "Monthly team building activity to strengthen collaboration and communication.",
    date: new Date(2025, 0, 25), // January 25, 2025
    startTime: "2:00 PM",
    endTime: "5:00 PM",
    category: "team-event",
    organizer: "Team Leads",
    location: "Offsite Location TBD",
    color: "#EF4444"
  },
  {
    id: "6",
    title: "Project Alpha Deadline",
    description: "Final deadline for Project Alpha deliverables and documentation.",
    date: new Date(2025, 1, 1), // February 1, 2025
    category: "deadline",
    organizer: "Project Manager",
    color: "#F97316"
  },
  {
    id: "7",
    title: "Valentine's Day Office Social",
    description: "Casual office celebration with treats and team bonding activities.",
    date: new Date(2025, 1, 14), // February 14, 2025
    startTime: "3:00 PM",
    endTime: "4:30 PM",
    category: "social",
    organizer: "Social Committee",
    location: "Office Kitchen Area",
    color: "#EC4899"
  },
  {
    id: "8",
    title: "John Smith - Annual Leave",
    description: "John Smith will be on annual leave for vacation.",
    date: new Date(2025, 0, 20), // January 20, 2025
    category: "leave",
    organizer: "HR Department",
    color: "#F43F5E"
  },
  {
    id: "9",
    title: "Christmas Break",
    description: "Company-wide annual holiday period. Office closed for Christmas celebrations.",
    date: new Date(2024, 11, 25), // December 25, 2024
    category: "annual-holidays",
    organizer: "HR Department",
    color: "#14B8A6"
  },
  {
    id: "10",
    title: "Sarah Johnson - Sick Leave",
    description: "Sarah Johnson on medical leave as approved by management.",
    date: new Date(2025, 1, 5), // February 5, 2025
    category: "leave",
    organizer: "HR Department",
    color: "#F43F5E"
  }
];
