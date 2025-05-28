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