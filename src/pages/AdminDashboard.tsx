
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Event, EventCategory } from '@/types/Event';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LogOut, Calendar, Trash2, Edit } from 'lucide-react';
import { AddEventModal } from '@/components/AddEventModal';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('AdminDashboard render:', { user: !!user, isAdmin, loading });

  // Redirect if not logged in or not admin
  useEffect(() => {
    console.log('AdminDashboard useEffect:', { user: !!user, isAdmin, loading });
    if (!loading && (!user || !isAdmin)) {
      console.log('Redirecting to admin login');
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      console.log('Fetching events for admin dashboard');
      fetchEvents();
    }
  }, [user, isAdmin]);

  const fetchEvents = async () => {
    console.log('Fetching events from Supabase...');
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive"
      });
    } else {
      console.log('Events fetched:', data);
      const transformedEvents: Event[] = data?.map(item => ({
        id: item.id,
        title: item.title || 'Untitled Event',
        description: item.description || '',
        date: item.date ? new Date(item.date) : new Date(),
        category: (item.category as EventCategory) || 'meeting',
        organizer: item.organizer || 'Admin',
        color: item.color || '#3B82F6'
      })) || [];
      setEvents(transformedEvents);
    }
  };

  const deleteEvent = async (eventId: string) => {
    console.log('Deleting event:', eventId);
    const { error } = await supabase.from('events').delete().eq('id', eventId);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Event deleted successfully"
      });
      fetchEvents();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage company events - Welcome, {user.email}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/')} variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button onClick={() => setShowAddModal(true)} size="lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Event
          </Button>
        </div>

        <div className="grid gap-4">
          {events.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 mb-4">No events found. Create your first event!</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {event.date.toLocaleDateString()} - {event.category}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingEvent(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Organizer: {event.organizer}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <AddEventModal
        isOpen={showAddModal || !!editingEvent}
        onClose={() => {
          setShowAddModal(false);
          setEditingEvent(null);
        }}
        event={editingEvent}
        onEventSaved={fetchEvents}
      />
    </div>
  );
};

export default AdminDashboard;
