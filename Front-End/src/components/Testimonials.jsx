// import { motion } from "framer-motion";

// const testimonials = [
//   {
//     name: "Rahul Sharma",
//     image: "/assets/user1.jpg", // Make sure the image exists in /src/assets
//     review: "GreenRide has completely changed how I navigate the city. The eco-friendly routes and traffic updates are amazing!",
//   },
//   {
//     name: "Neha Verma",
//     image: "/assets/user2.jpg",
//     review: "I love how easy it is to find safe bike routes. The air quality insights help me plan my rides better!",
//   },
//   {
//     name: "Amit Patel",
//     image: "/assets/user3.jpg",
//     review: "The website’s real-time updates make cycling in the city so much smoother. Highly recommend it!",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="py-12 bg-gradient-to-r from-black via-green-400  to-green- text-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           What Our Users Say
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               className="relative bg-transparent p-8 rounded-lg shadow-lg text-center overflow-hidden hover:shadow-5xl transition"
//             >
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-16 h-16 mx-auto rounded-full border-2 border-green-500"
//               />
//               <h3 className="mt-4 text-lg font-semibold text-gray-800">
//                 {testimonial.name}
//               </h3>
//               <p className="mt-2 text-gray-600">{testimonial.review}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
