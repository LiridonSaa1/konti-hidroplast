import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

const updateProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  confirmPassword: z.string().optional().or(z.literal('')),
}).refine((data) => {
  if (data.password && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

interface ProfileEditFormProps {
  onClose: () => void;
}

export const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onClose }) => {
  const { user, updateProfile } = useAuth();
  
  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    const updateData: { username?: string; email?: string; password?: string } = {};
    
    if (data.username && data.username !== user?.username) {
      updateData.username = data.username;
    }
    
    if (data.email && data.email !== user?.email) {
      updateData.email = data.email;
    }
    
    if (data.password) {
      updateData.password = data.password;
    }

    // Only send update if there are changes
    if (Object.keys(updateData).length > 0) {
      await updateProfile(updateData);
      onClose();
    } else {
      onClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="profile-edit-form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-profile-username">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter username"
                  data-testid="input-profile-username"
                />
              </FormControl>
              <FormMessage data-testid="error-profile-username" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-profile-email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  data-testid="input-profile-email"
                />
              </FormControl>
              <FormMessage data-testid="error-profile-email" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-profile-password">New Password (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                  data-testid="input-profile-password"
                />
              </FormControl>
              <FormMessage data-testid="error-profile-password" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel data-testid="label-profile-confirm-password">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm new password"
                  data-testid="input-profile-confirm-password"
                />
              </FormControl>
              <FormMessage data-testid="error-profile-confirm-password" />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="button-profile-cancel"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            data-testid="button-profile-save"
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};