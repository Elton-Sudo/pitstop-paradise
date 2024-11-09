import { useForm } from 'react-hook-form';
import { send } from '@emailjs/browser';
import { useState } from 'react'; 
import CircularProgress from '@mui/material/CircularProgress';
import { toast} from 'react-hot-toast';
import { Box, Typography } from '@mui/material';
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const ContactUs = () => {
  const phoneNumber = "+27 72 660 7265"; 
  const emailAddress = "pitstopparadisesales@gmail.com"; 
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false); 

  const onSubmit = (data) => {
    setIsLoading(true);
    send(
      'service_ytibsqu',
      'template_po7hhjy',
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      },
      'WcgFAm5rRLJBMvIgU'
    )
      .then(() => {
        toast.success('Message sent successfully!');
        reset();
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/daynaexaz/image/upload/v1728893288/blue-smokebg_cegir0.jpg')",
      }}
    >
      <div className="w-full max-w-md p-8 bg-black/70 rounded-lg shadow-md">
        <img
          src="https://res.cloudinary.com/daynaexaz/image/upload/v1728726708/Pitstop_Paradise_logo_1_optimized_1000_ko3i9s.png"
          alt="Pitstop Paradise Logo"
          className="mb-3 mx-auto h-24 object-contain"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="block mb-1 text-white">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Subject</label>
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter the subject"
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-white">Message</label>
            <textarea
              {...register("message", { required: "Message is required" })}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              placeholder="Enter your message"
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
          </button>
        </form>
      </div>
      <Box sx={{ mt: 2}}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
  <PhoneIcon sx={{ marginRight: 1, color: 'white' }} />
  <Typography variant="body1" sx={{ color: 'white' }}>
    {phoneNumber}
  </Typography>
</Box>

<Box sx={{ display: "flex", alignItems: "center" }}>
  <EmailIcon sx={{ marginRight: 1, color: 'white' }} />
  <Typography variant="body1" sx={{ color: 'white' }}>
    {emailAddress}
  </Typography>
</Box>
</Box>
    </div>
  );
};

export default ContactUs;

