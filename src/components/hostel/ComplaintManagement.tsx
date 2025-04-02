
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { mockHostelService } from "@/lib/mockDb";
import { Complaint } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(
    mockHostelService.getComplaints()
  );
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "resolved">("pending");
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const { toast } = useToast();

  const filteredComplaints = filterStatus === "all" 
    ? complaints 
    : complaints.filter(c => c.status === filterStatus);

  const handleStatusChange = (complaintId: string, newStatus: 'in-progress' | 'resolved') => {
    const updatedComplaint = mockHostelService.updateComplaintStatus(
      complaintId, 
      newStatus, 
      newStatus === 'resolved' ? response : undefined
    );
    
    if (updatedComplaint) {
      setComplaints(complaints.map(c => c.id === complaintId ? updatedComplaint : c));
      setDialogOpen(false);
      setResponse("");
      
      toast({
        title: `Complaint ${newStatus === 'in-progress' ? 'In Progress' : 'Resolved'}`,
        description: `The complaint has been marked as ${newStatus === 'in-progress' ? 'in progress' : 'resolved'}`,
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Complaint Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Complaints</CardTitle>
            <CardDescription>
              Review and manage student complaints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="pending" 
              value={filterStatus}
              onValueChange={(value) => setFilterStatus(value as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left border-b">Student</th>
                      <th className="py-2 px-4 text-left border-b">Title</th>
                      <th className="py-2 px-4 text-left border-b">Date</th>
                      <th className="py-2 px-4 text-center border-b">Status</th>
                      <th className="py-2 px-4 text-center border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map((complaint) => (
                        <tr key={complaint.id} className="hover:bg-muted/50">
                          <td className="py-2 px-4 border-b">{complaint.studentName}</td>
                          <td className="py-2 px-4 border-b">
                            {complaint.title.length > 40
                              ? complaint.title.substring(0, 40) + "..."
                              : complaint.title}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {format(new Date(complaint.createdAt), "MMM d, yyyy")}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                                complaint.status
                              )}`}
                            >
                              {complaint.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedComplaint(complaint);
                                setResponse(complaint.response || "");
                                setDialogOpen(true);
                              }}
                              disabled={complaint.status === "resolved"}
                            >
                              {complaint.status === "pending" ? "Process" : complaint.status === "in-progress" ? "Resolve" : "View"}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-muted-foreground">
                          No complaints found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {selectedComplaint && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Complaint Details</DialogTitle>
              <DialogDescription>
                Review the complaint details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <h4 className="font-medium">Student:</h4>
                <p>{selectedComplaint.studentName}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Title:</h4>
                <p>{selectedComplaint.title}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Description:</h4>
                <p className="whitespace-pre-line">{selectedComplaint.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Submitted on:</h4>
                <p>{format(new Date(selectedComplaint.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
              
              {selectedComplaint.status !== "pending" && (
                <div>
                  <h4 className="font-medium mb-2">{selectedComplaint.status === "resolved" ? "Response:" : "Add Response (when resolved):"}</h4>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response to the complaint"
                    disabled={selectedComplaint.status === "resolved"}
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              
              {selectedComplaint.status === "pending" && (
                <Button
                  onClick={() => handleStatusChange(selectedComplaint.id, "in-progress")}
                >
                  Mark as In Progress
                </Button>
              )}
              
              {selectedComplaint.status === "in-progress" && (
                <Button
                  onClick={() => handleStatusChange(selectedComplaint.id, "resolved")}
                  disabled={!response.trim()}
                >
                  Resolve Complaint
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
