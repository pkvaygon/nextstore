import Image from 'next/image';
import CardBanner from './../components/Cards/CardBanner';

export default function Home() {
  return (
    <section>
      <div className='w-full h-screen relative'>
        <Image priority fill className="absolute top-0 left-0 object-cover object-right sm:object-center" src="https://res.cloudinary.com/dxvf93ovn/image/upload/v1707270360/nextstore/AdobeStock_377454427_h0z9zf.jpg" alt='Askar Store' />
      
        <div className='container'>
        <CardBanner />
        </div>
      </div>
    </section>
  );
}
