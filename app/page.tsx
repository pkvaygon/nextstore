import Image from 'next/image';
import ecommerce_banner from '@/public/—Slidesdocs—modern shopping experience 3d illustration_b788104cb8.jpg'

export default function Home() {
  return (
    <section>
      <div className='w-full h-screen'>
        {/* <Image width={1366} height={768} className="w-full h-full object-cover" src="https://via.placeholder.com/1366x768.png" alt='Askar Store' /> */}
        <Image className="w-full h-full object-cover" src={ecommerce_banner} alt='Askar Store' />
      </div>
    </section>
  );
}
