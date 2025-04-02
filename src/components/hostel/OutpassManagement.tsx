
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { mockHostelService } from "@/lib/mockDb";
import { Outpass } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

export const OutpassManagement = () => {
  const [outpasses, setOutpasses] = useState<Outpass[]>(
    mockHostelService.getOutpasses()
  );
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedOutpass, setSelectedOutpass] = useState<Outpass | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredOutpasses = filterStatus === "all" 
    ? outpasses 
    : outpasses.filter(o => o.status === filterStatus);

  const handleStatusChange = (outpassId: string, newStatus: 'approved' | 'rejected') => {
    const updatedOutpass = mockHostelService.updateOutpassStatus(outpassId, newStatus);
    
    if (updatedOutpass) {
      setOutpasses(outpasses.map(o => o.id === outpassId ? updatedOutpass : o));
      setDialogOpen(false);
      
      toast({
        title: `Outpass ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
        description: `The outpass request has been ${newStatus}${newStatus === 'approved' ? ' and a notification has been sent to the parent' : ''}`,
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Outpass Management</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Outpass Requests</CardTitle>
            <CardDescription>
              Review and manage student outpass requests
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
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 text-left border-b">Student</th>
                      <th className="py-2 px-4 text-left border-b">Duration</th>
                      <th className="py-2 px-4 text-left border-b">Reason</th>
                      <th className="py-2 px-4 text-center border-b">Status</th>
                      <th className="py-2 px-4 text-center border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOutpasses.length > 0 ? (
                      filteredOutpasses.map((outpass) => (
                        <tr key={outpass.id} className="hover:bg-muted/50">
                          <td className="py-2 px-4 border-b">{outpass.studentName}</td>
                          <td className="py-2 px-4 border-b">
                            {format(new Date(outpass.fromDate), "MMM d")} - {format(new Date(outpass.toDate), "MMM d")}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {outpass.reason.length > 40
                              ? outpass.reason.substring(0, 40) + "..."
                              : outpass.reason}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                                outpass.status
                              )}`}
                            >
                              {outpass.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedOutpass(outpass);
                                setDialogOpen(true);
                              }}
                              disabled={outpass.status !== "pending"}
                            >
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-muted-foreground">
                          No outpass requests found
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
      
      {selectedOutpass && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Outpass Request Review</DialogTitle>
              <DialogDescription>
                Review the outpass request details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Student:</h4>
                  <p>{selectedOutpass.studentName}</p>
                </div>
                <div>
                  <h4 className="font-medium">Duration:</h4>
                  <p>
                    {format(new Date(selectedOutpass.fromDate), "MMM d, yyyy")} - {format(new Date(selectedOutpass.toDate), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">Reason:</h4>
                <p>{selectedOutpass.reason}</p>
              </div>
              
              <div>
                <h4 className="font-medium">Requested on:</h4>
                <p>{format(new Date(selectedOutpass.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleStatusChange(selectedOutpass.id, "rejected")}
              >
                Reject
              </Button>
              <Button
                onClick={() => handleStatusChange(selectedOutpass.id, "approved")}
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
