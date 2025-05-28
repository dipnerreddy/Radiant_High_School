// // Example for src/app/page.tsx (App Router)
// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         {/* ... existing content ... */}
//       </div>

//       {/* ADD THIS TEST DIV */}
//       <div className="bg-blue-500 text-white p-8 rounded-lg shadow-lg">
//         <h1 className="text-4xl font-bold mb-4">Hello Tailwind!</h1>
//         <p className="text-lg">If this is styled, Tailwind CSS is working!</p>
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         {/* ... existing content ... */}
//       </div>
//     </main>
//   );
// }

// src/app/page.tsx
import HomeComponent1 from '@/components/homepage/HomeComponent1';
import HomeComponent2 from '@/components/homepage/HomeComponent2';
import HomeComponent3 from '@/components/homepage/HomeComponent3';

export default function HomePage() {
  return (
    <>
      <HomeComponent1 />
      <HomeComponent2 />
      <HomeComponent3 />
      {/* You can add more sections/components to your homepage here */}
    </>
  );
}