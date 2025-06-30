
export type EventCategory = 
  | "team-event" 
  | "holiday" 
  | "training" 
  | "meeting" 
  | "social" 
  | "deadline"
  | "leave"
  | "annual-holidays";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  category: EventCategory;
  organizer: string;
  location?: string;
  link?: string;
  color: string;
}
