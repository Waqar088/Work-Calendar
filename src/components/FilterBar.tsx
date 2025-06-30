
import { EventCategory } from "@/types/Event";
import { Button } from "@/components/ui/button";
import { Calendar, Users, GraduationCap, Coffee, Heart, AlertCircle, UserX, Plane } from "lucide-react";

interface FilterBarProps {
  selectedCategory: EventCategory | "all";
  onCategoryChange: (category: EventCategory | "all") => void;
}

const categoryConfig = {
  all: { label: "All Events", icon: Calendar, color: "text-gray-600" },
  "team-event": { label: "Team Events", icon: Users, color: "text-red-600" },
  holiday: { label: "Holidays", icon: Coffee, color: "text-yellow-600" },
  training: { label: "Training", icon: GraduationCap, color: "text-purple-600" },
  meeting: { label: "Meetings", icon: Calendar, color: "text-blue-600" },
  social: { label: "Social", icon: Heart, color: "text-green-600" },
  deadline: { label: "Deadlines", icon: AlertCircle, color: "text-orange-600" },
  leave: { label: "Leave", icon: UserX, color: "text-rose-600" },
  "annual-holidays": { label: "Annual Holidays", icon: Plane, color: "text-teal-600" }
};

export const FilterBar = ({ selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const isSelected = selectedCategory === key;
            const Icon = config.icon;
            
            return (
              <Button
                key={key}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(key as EventCategory | "all")}
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  isSelected 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "hover:bg-gray-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-white" : config.color}`} />
                <span>{config.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
