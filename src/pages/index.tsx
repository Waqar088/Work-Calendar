
import { useState, useEffect } from "react";
import { Calendar } from "@/components/Calendar";
import { EventModal } from "@/components/EventModal";
import { FilterBar } from "@/components/FilterBar";
import { Header } from "@/components/Header";
import { Event, EventCategory } from "@/types/Event";
import { sampleEvents } from "@/data/sampleEvents";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('Fetching events from Supabase...');
      const { data, error } = await supabase.from('events').select('*');

      if (error) {
        console.error('Error fetching events:', error);
        // Fallback to sample events if there's an error
        setEvents(sampleEvents);
      } else {
        console.log('Raw Supabase data:', data);
        
        // Transform Supabase data using lowercase column names
        const transformedEvents: Event[] = data?.map(item => {
          const title = item.title || 'Untitled Event';
          const description = item.description || '';
          const rawDate = item.date;
          const category = (item.category || 'meeting') as EventCategory;
          const organizer = item.organizer || 'Admin';
          const color = item.color || '#3B82F6';
          
          // Parse the date properly
          let eventDate: Date;
          if (rawDate) {
            eventDate = new Date(rawDate);
            // If the date is invalid, use current date
            if (isNaN(eventDate.getTime())) {
              eventDate = new Date();
            }
          } else {
            eventDate = new Date();
          }
          
          return {
            id: item.id,
            title,
            description,
            date: eventDate,
            category,
            organizer,
            color
          };
        }) || [];
        
        console.log('Transformed events:', transformedEvents);
        setEvents(transformedEvents);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    selectedCategory === "all" || event.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Work Calendar Log
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay up-to-date with all company events, team meetings, training sessions, and important dates.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/admin/login')}
              variant="outline"
              className="ml-4"
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin Login
            </Button>
          </div>
        </div>

        <FilterBar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <Calendar
            events={filteredEvents}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            onEventClick={setSelectedEvent}
          />
        </div>

        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </main>
    </div>
  );
};

export default Index;
