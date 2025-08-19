import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Eye, Trash2, Search, MessageSquare, Clock, Mail, Phone, Building, User } from "lucide-react";
import { format } from "date-fns";
import { apiRequest } from "@/lib/queryClient";
import type { ContactMessage } from "@shared/schema";

export function ContactMessagesManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/admin/contact-messages"],
    queryFn: async (): Promise<ContactMessage[]> => {
      const response = await apiRequest("/api/admin/contact-messages", "GET");
      return await response.json();
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await apiRequest(`/api/admin/contact-messages/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
      toast({ title: "Success", description: "Contact message deleted successfully." });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to delete contact message.", 
        variant: "destructive" 
      });
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: number): Promise<ContactMessage> => {
      const response = await apiRequest(`/api/admin/contact-messages/${id}`, "PATCH", { status: "read" });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
      toast({ title: "Success", description: "Message marked as read." });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to update message status.", 
        variant: "destructive" 
      });
    },
  });

  // Filter and sort messages
  const filteredMessages = messages
    .filter(message => {
      const matchesSearch = 
        message.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (message.company && message.company.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || message.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "fullName":
          comparison = a.fullName.localeCompare(b.fullName);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "createdAt":
        default:
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          comparison = bTime - aTime;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "read": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "replied": return "bg-green-100 text-green-800 hover:bg-green-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread": return <MessageSquare className="h-3 w-3" />;
      case "read": return <Eye className="h-3 w-3" />;
      case "replied": return <Mail className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  if (selectedMessage) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-gray-800">Contact Message Details</CardTitle>
              <CardDescription className="text-gray-600">
                View and manage contact message from {selectedMessage.fullName}
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedMessage(null)}
              className="hover:bg-gray-100"
            >
              ← Back to List
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {selectedMessage.fullName}</div>
                  <div><strong>Email:</strong> {selectedMessage.email}</div>
                  {selectedMessage.phone && (
                    <div><strong>Phone:</strong> {selectedMessage.phone}</div>
                  )}
                  {selectedMessage.company && (
                    <div><strong>Company:</strong> {selectedMessage.company}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Message Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Message Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <strong className="mr-2">Status:</strong>
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {getStatusIcon(selectedMessage.status)}
                      <span className="ml-1 capitalize">{selectedMessage.status}</span>
                    </Badge>
                  </div>
                  <div><strong>Received:</strong> {format(new Date(selectedMessage.createdAt!), 'PPpp')}</div>
                  {selectedMessage.updatedAt !== selectedMessage.createdAt && (
                    <div><strong>Updated:</strong> {format(new Date(selectedMessage.updatedAt!), 'PPpp')}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Message</h3>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-6">
            {selectedMessage.status === "unread" && (
              <Button
                onClick={() => markAsReadMutation.mutate(selectedMessage.id)}
                disabled={markAsReadMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Mark as Read
              </Button>
            )}
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Are you sure you want to delete this message?")) {
                  deleteMessageMutation.mutate(selectedMessage.id);
                  setSelectedMessage(null);
                }
              }}
              disabled={deleteMessageMutation.isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-2xl text-blue-900 flex items-center">
          <MessageSquare className="h-6 w-6 mr-3 text-blue-600" />
          Contact Messages
        </CardTitle>
        <CardDescription className="text-blue-700">
          Manage and respond to customer inquiries and contact form submissions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Enhanced Filter Section */}
        <Card className="mb-6 border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages, names, emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  data-testid="input-search-messages"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500" data-testid="select-status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-500 flex items-center justify-end">
                {filteredMessages.length} of {messages.length} messages
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading contact messages...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-500">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search criteria" 
                  : "Contact messages will appear here when customers submit the contact form"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("fullName")}
                    >
                      <div className="flex items-center">
                        Contact Info
                        {sortBy === "fullName" && (
                          <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Message Preview
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortBy === "status" && (
                          <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Received
                        {sortBy === "createdAt" && (
                          <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMessages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900 flex items-center">
                            <User className="h-4 w-4 mr-1 text-gray-400" />
                            {message.fullName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {message.email}
                          </div>
                          {message.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {message.phone}
                            </div>
                          )}
                          {message.company && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Building className="h-3 w-3 mr-1" />
                              {message.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {message.message.substring(0, 100)}
                          {message.message.length > 100 && "..."}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className={getStatusColor(message.status)}>
                          {getStatusIcon(message.status)}
                          <span className="ml-1 capitalize">{message.status}</span>
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(message.createdAt!), 'MMM dd, yyyy')}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedMessage(message)}
                          className="hover:bg-blue-100 hover:text-blue-700"
                          data-testid={`button-view-${message.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this message?")) {
                              deleteMessageMutation.mutate(message.id);
                            }
                          }}
                          disabled={deleteMessageMutation.isPending}
                          className="hover:bg-red-100 hover:text-red-700"
                          data-testid={`button-delete-${message.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}