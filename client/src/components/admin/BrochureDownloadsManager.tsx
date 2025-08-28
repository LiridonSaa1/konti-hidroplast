import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, Search, Trash2, Eye, Calendar, Building, Mail, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BrochureDownload {
  id: number;
  brochureId: number;
  brochureName: string;
  brochureCategory: string;
  fullName: string;
  companyName: string;
  email: string;
  description: string | null;
  downloadDate: string;
  createdAt: string;
}

export function BrochureDownloadsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: downloads = [], isLoading } = useQuery<BrochureDownload[]>({
    queryKey: ["/api/admin/brochure-downloads"]
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const result = await apiRequest(`/api/admin/brochure-downloads/${id}`, "DELETE");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/brochure-downloads"] });
      toast({
        title: "Success",
        description: "Download record deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete download record",
        variant: "destructive",
      });
    },
  });

  // Get unique categories for filtering
  const categories = Array.from(new Set(downloads.map(d => d.brochureCategory)));

  // Filter downloads based on search and filters
  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = 
      download.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      download.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      download.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      download.brochureName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (download.description && download.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || download.brochureCategory === selectedCategory;
    
    let matchesDateRange = true;
    if (selectedDateRange !== "all") {
      const downloadDate = new Date(download.downloadDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - downloadDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (selectedDateRange) {
        case "today":
          matchesDateRange = diffDays === 0;
          break;
        case "week":
          matchesDateRange = diffDays <= 7;
          break;
        case "month":
          matchesDateRange = diffDays <= 30;
          break;
        case "year":
          matchesDateRange = diffDays <= 365;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesDateRange;
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    const totalDownloads = downloads.length;
    const todayDownloads = downloads.filter(d => {
      const downloadDate = new Date(d.downloadDate);
      const today = new Date();
      return downloadDate.toDateString() === today.toDateString();
    }).length;
    
    const uniqueCompanies = new Set(downloads.map(d => d.companyName)).size;
    const uniqueEmails = new Set(downloads.map(d => d.email)).size;
    
    return { totalDownloads, todayDownloads, uniqueCompanies, uniqueEmails };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64" data-testid="downloads-loading">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="brochure-downloads-manager">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900" data-testid="downloads-title">
            Brochure Downloads Manager
          </h2>
          <p className="text-slate-600" data-testid="downloads-description">
            Track and manage brochure download analytics and lead information
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Total Downloads</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Today</p>
                <p className="text-2xl font-bold text-slate-900">{stats.todayDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Unique Companies</p>
                <p className="text-2xl font-bold text-slate-900">{stats.uniqueCompanies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-slate-600">Unique Emails</p>
                <p className="text-2xl font-bold text-slate-900">{stats.uniqueEmails}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card data-testid="downloads-filters">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by company, email, brochure name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-downloads"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger data-testid="select-download-category">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                <SelectTrigger data-testid="select-download-date-range">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Downloads Table */}
      {filteredDownloads.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle data-testid="downloads-table-title">
              Download Records ({filteredDownloads.length})
            </CardTitle>
            <CardDescription>
              All brochure download records with contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Brochure</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Download Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDownloads.map((download) => (
                  <TableRow key={download.id} data-testid={`download-row-${download.id}`}>
                    <TableCell className="font-medium" data-testid={`download-company-${download.id}`}>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-blue-600" />
                        {download.companyName}
                      </div>
                    </TableCell>
                    <TableCell data-testid={`download-contact-${download.id}`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Users className="h-3 w-3 text-blue-500" />
                          {download.fullName}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-gray-500" />
                          {download.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell data-testid={`download-brochure-${download.id}`}>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{download.brochureName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" data-testid={`download-category-${download.id}`}>
                        {download.brochureCategory}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`download-date-${download.id}`}>
                      {formatDate(download.downloadDate)}
                    </TableCell>
                    <TableCell data-testid={`download-description-${download.id}`}>
                      {download.description ? (
                        <span className="text-sm line-clamp-2 max-w-xs">
                          {download.description}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-sm">No description</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(`mailto:${download.email}?subject=Regarding ${download.brochureName} brochure`)}
                          title="Send Email"
                          data-testid={`button-email-download-${download.id}`}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              data-testid={`button-delete-download-${download.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Download Record</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this download record for "{download.companyName}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(download.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {filteredDownloads.length === 0 && (
        <Card className="p-8 text-center" data-testid="downloads-empty-state">
          <Download className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No download records found</h3>
          <p className="text-slate-600 mb-4">
            {searchTerm || selectedCategory !== "all" || selectedDateRange !== "all"
              ? "No download records match your current filters"
              : "Download records will appear here when users download brochures"
            }
          </p>
        </Card>
      )}
    </div>
  );
}
