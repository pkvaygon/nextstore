import Image from 'next/image';
import CardBanner from './../components/Cards/CardBanner';

export default function Home() {
  return (
    <section>
      <div className='w-full h-screen relative'>
        <Image priority fill  className="-z-1 absolute bg-fixed top-0 left-0 object-cover object-right sm:object-center" src="https://res.cloudinary.com/dxvf93ovn/image/upload/v1707726651/nextstore/shoesbanner_dpxumh.jpg" alt='Askar Store' />
        <div className='container'>
        <CardBanner />
        </div>
      </div>
    </section>
  );
}
