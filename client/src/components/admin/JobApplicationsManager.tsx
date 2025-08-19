import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Eye, 
  Trash2, 
  Search,
  Calendar,
  Mail,
  Phone,
  User,
  Briefcase
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { JobApplication } from "@shared/schema";

interface JobApplicationWithActions extends JobApplication {
  // Add any additional properties if needed
}

export function JobApplicationsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["/api/admin/job-applications"],
    queryFn: async (): Promise<JobApplicationWithActions[]> => {
      const response = await apiRequest("/api/admin/job-applications", "GET");
      return await response.json();
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<JobApplication> }): Promise<JobApplication> => {
      const response = await apiRequest(`/api/admin/job-applications/${id}`, "PATCH", data);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-applications"] });
      toast({
        title: "Success",
        description: "Job application updated successfully.",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update job application.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await apiRequest(`/api/admin/job-applications/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-applications"] });
      toast({
        title: "Success",
        description: "Job application deleted successfully.",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete job application.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesPosition = positionFilter === "all" || app.position.toLowerCase().includes(positionFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const uniquePositions = Array.from(new Set(applications.map(app => app.position)));

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "reviewed": return "default";
      case "shortlisted": return "outline";
      case "hired": return "default";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "reviewed": return "text-blue-600 bg-blue-50";
      case "shortlisted": return "text-green-600 bg-green-50";
      case "hired": return "text-green-800 bg-green-100";
      case "rejected": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    updateApplicationMutation.mutate({ 
      id: applicationId, 
      data: { status: newStatus } 
    });
  };

  const handleNotesChange = (applicationId: number, notes: string) => {
    updateApplicationMutation.mutate({ 
      id: applicationId, 
      data: { notes } 
    });
  };

  const handleDeleteApplication = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job application?")) {
      deleteApplicationMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading job applications...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Job Applications Management
              </CardTitle>
              <CardDescription>
                Manage job applications and track candidate progress
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {applications.length} Applications
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Search Applications
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Position Filter</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All positions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Positions</SelectItem>
                  {uniquePositions.map(position => (
                    <SelectItem key={position} value={position.toLowerCase()}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchTerm || statusFilter !== "all" || positionFilter !== "all" 
                        ? "No applications match your filters"
                        : "No job applications submitted yet"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {application.fullName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {application.email}
                          </div>
                          {application.phoneNumber && (
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {application.phoneNumber}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {application.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {application.experience || "Not specified"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <Badge 
                              variant={getStatusBadgeVariant(application.status)}
                              className={getStatusColor(application.status)}
                            >
                              {application.status}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "Unknown"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setViewModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {application.resumeUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(application.resumeUrl || "", "_blank")}
                              className="text-green-600 hover:text-green-800 hover:bg-green-50"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteApplication(application.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            disabled={deleteApplicationMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Application Details Modal */}
      {viewModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Job Application Details</CardTitle>
              <CardDescription>
                Application from {selectedApplication.fullName} for {selectedApplication.position}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.phoneNumber || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Position</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.position}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Experience</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedApplication.experience || "Not provided"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Application Date</Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedApplication.createdAt ? new Date(selectedApplication.createdAt).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
              </div>

              {selectedApplication.coverLetter && (
                <div>
                  <Label className="text-sm font-medium">Cover Letter</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {selectedApplication.resumeUrl && (
                <div>
                  <Label className="text-sm font-medium">Resume</Label>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      onClick={() => window.open(selectedApplication.resumeUrl || "", "_blank")}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Admin Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about this application..."
                  value={selectedApplication.notes || ""}
                  onChange={(e) => {
                    setSelectedApplication({
                      ...selectedApplication,
                      notes: e.target.value
                    });
                  }}
                  onBlur={(e) => handleNotesChange(selectedApplication.id, e.target.value)}
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setViewModalOpen(false);
                    setSelectedApplication(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}