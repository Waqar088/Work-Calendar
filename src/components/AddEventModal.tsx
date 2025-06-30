
import { useState, useEffect } from 'react';
import { Event, EventCategory } from '@/types/Event';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  onEventSaved: () => void;
}

const categoryColors = {
  'team-event': '#ef4444',
  'holiday': '#eab308',
  'training': '#8b5cf6',
  'meeting': '#3b82f6',
  'social': '#10b981',
  'deadline': '#f97316',
  'leave': '#f43f5e',
  'annual-holidays': '#14b8a6'
};

export const AddEventModal = ({ isOpen, onClose, event, onEventSaved }: AddEventModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<EventCategory>('meeting');
  const [organizer, setOrganizer] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date.toISOString().split('T')[0]);
      setCategory(event.category);
      setOrganizer(event.organizer);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setCategory('meeting');
      setOrganizer('');
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const eventData = {
      title,
      description,
      date,
      category,
      organizer,
      color: categoryColors[category]
    };

    let error;
    if (event) {
      const result = await supabase
        .from('events')
        .update(eventData)
        .eq('id', event.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('events')
        .insert([eventData]);
      error = result.error;
    }

    if (error) {
      toast({
        title: "Error",
        description: `Failed to ${event ? 'update' : 'create'} event: ${error.message}`,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: `Event ${event ? 'updated' : 'created'} successfully`
      });
      onEventSaved();
      onClose();
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value: EventCategory) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team-event">Team Event</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
                <SelectItem value="annual-holidays">Annual Holidays</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organizer">Organizer</Label>
            <Input
              id="organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="Event organizer name"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (event ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
