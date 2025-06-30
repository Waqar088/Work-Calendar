
import { Event } from "@/types/Event";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, ExternalLink } from "lucide-react";

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal = ({ event, isOpen, onClose }: EventModalProps) => {
  if (!event) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "team-event": "bg-red-100 text-red-800",
      "holiday": "bg-yellow-100 text-yellow-800",
      "training": "bg-purple-100 text-purple-800",
      "meeting": "bg-blue-100 text-blue-800",
      "social": "bg-green-100 text-green-800",
      "deadline": "bg-orange-100 text-orange-800",
      "leave": "bg-rose-100 text-rose-800",
      "annual-holidays": "bg-teal-100 text-teal-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      "team-event": "Team Event",
      "holiday": "Holiday",
      "training": "Training",
      "meeting": "Meeting",
      "social": "Social Event",
      "deadline": "Deadline",
      "leave": "Leave",
      "annual-holidays": "Annual Holiday"
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {event.title}
              </DialogTitle>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                {getCategoryLabel(event.category)}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Event Details */}
          <div className="grid gap-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>

            {(event.startTime || event.endTime) && (
              <div className="flex items-center space-x-3 text-gray-700">
                <Clock className="w-5 h-5 text-gray-400" />
                <span>
                  {event.startTime && event.endTime 
                    ? `${event.startTime} - ${event.endTime}`
                    : event.startTime || event.endTime
                  }
                </span>
              </div>
            )}

            <div className="flex items-center space-x-3 text-gray-700">
              <User className="w-5 h-5 text-gray-400" />
              <span>Organized by {event.organizer}</span>
            </div>

            {event.location && (
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {event.link && (
              <Button variant="outline" className="flex items-center space-x-2" asChild>
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  <span>View Details</span>
                </a>
              </Button>
            )}
            
            <div className="flex items-center space-x-2 ml-auto">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
