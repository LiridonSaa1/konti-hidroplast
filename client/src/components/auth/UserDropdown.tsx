import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { ProfileEditForm } from './ProfileEditForm';

export const UserDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" data-testid="button-user-dropdown">
          <User className="h-4 w-4" />
          <span data-testid="text-username">{user.username}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" data-testid="dropdown-user-menu">
        <DropdownMenuLabel data-testid="dropdown-label-user-info">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none" data-testid="text-user-name">{user.username}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground" data-testid="text-user-email">
                {user.email}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground capitalize" data-testid="text-user-role">
              {user.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} data-testid="dropdown-item-profile">
              <Settings className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]" data-testid="dialog-profile-settings">
            <DialogHeader>
              <DialogTitle data-testid="dialog-title-profile">Profile Settings</DialogTitle>
              <DialogDescription data-testid="dialog-description-profile">
                Update your username, email, and password.
              </DialogDescription>
            </DialogHeader>
            <ProfileEditForm onClose={() => setIsProfileOpen(false)} />
          </DialogContent>
        </Dialog>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout} data-testid="dropdown-item-logout">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};