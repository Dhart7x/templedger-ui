 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { X, Calendar, Clock } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 
 interface BookDemoModalProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 const BookDemoModal = ({ isOpen, onClose }: BookDemoModalProps) => {
   const [submitted, setSubmitted] = useState(false);
   const [formData, setFormData] = useState({
     name: "",
     businessName: "",
     businessEmail: "",
     date: "",
     time: "",
   });
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     setSubmitted(true);
   };
 
   const handleClose = () => {
     setSubmitted(false);
     setFormData({
       name: "",
       businessName: "",
       businessEmail: "",
       date: "",
       time: "",
     });
     onClose();
   };
 
   const timeSlots = [
     "09:00",
     "09:30",
     "10:00",
     "10:30",
     "11:00",
     "11:30",
     "14:00",
     "14:30",
     "15:00",
     "15:30",
     "16:00",
     "16:30",
   ];
 
   return (
     <AnimatePresence>
       {isOpen && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
           onClick={handleClose}
         >
           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.95, y: 20 }}
             transition={{ duration: 0.2 }}
             className="w-full max-w-md bg-card border border-border rounded-xl p-6 relative"
             onClick={(e) => e.stopPropagation()}
           >
             <button
               onClick={handleClose}
               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
 
             {!submitted ? (
               <>
                 <h2 className="text-xl font-semibold text-foreground mb-6">
                   Book Demo
                 </h2>
 
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="space-y-2">
                     <Label htmlFor="name">Name</Label>
                     <Input
                       id="name"
                       value={formData.name}
                       onChange={(e) =>
                         setFormData({ ...formData, name: e.target.value })
                       }
                       required
                     />
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="businessName">Business Name</Label>
                     <Input
                       id="businessName"
                       value={formData.businessName}
                       onChange={(e) =>
                         setFormData({ ...formData, businessName: e.target.value })
                       }
                       required
                     />
                   </div>
 
                   <div className="space-y-2">
                     <Label htmlFor="businessEmail">Business Email</Label>
                     <Input
                       id="businessEmail"
                       type="email"
                       value={formData.businessEmail}
                       onChange={(e) =>
                         setFormData({ ...formData, businessEmail: e.target.value })
                       }
                       required
                     />
                   </div>
 
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="date" className="flex items-center gap-2">
                         <Calendar className="w-4 h-4" />
                         Select Date
                       </Label>
                       <Input
                         id="date"
                         type="date"
                         value={formData.date}
                         onChange={(e) =>
                           setFormData({ ...formData, date: e.target.value })
                         }
                         required
                       />
                     </div>
 
                     <div className="space-y-2">
                       <Label htmlFor="time" className="flex items-center gap-2">
                         <Clock className="w-4 h-4" />
                         Select Time
                       </Label>
                       <Select
                         value={formData.time}
                         onValueChange={(value) =>
                           setFormData({ ...formData, time: value })
                         }
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Time" />
                         </SelectTrigger>
                         <SelectContent>
                           {timeSlots.map((slot) => (
                             <SelectItem key={slot} value={slot}>
                               {slot}
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>
                   </div>
 
                   <Button type="submit" className="w-full mt-6">
                     Submit
                   </Button>
                 </form>
               </>
             ) : (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-center py-8"
               >
                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                   <Calendar className="w-6 h-6 text-foreground" />
                 </div>
                 <h3 className="text-lg font-semibold text-foreground mb-2">
                   Thank you.
                 </h3>
                 <p className="text-sm text-muted-foreground">
                   We'll be in touch shortly to confirm.
                 </p>
               </motion.div>
             )}
           </motion.div>
         </motion.div>
       )}
     </AnimatePresence>
   );
 };
 
 export default BookDemoModal;