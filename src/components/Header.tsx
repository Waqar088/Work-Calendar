
import { Building2 } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">ABC Company</h2>
              <p className="text-sm text-gray-500">Employee Portal</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600">Welcome back!</p>
            <p className="text-xs text-gray-400">Stay updated with company events</p>
          </div>
        </div>
      </div>
    </header>
  );
};
