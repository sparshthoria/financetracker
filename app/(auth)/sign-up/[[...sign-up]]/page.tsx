import { SignUp, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
  const features = [
    { src: '/savings.png', label: 'Earn' },
    { src: '/track.png', label: 'Track' },
    { src: '/earnings.png', label: 'Save' },
    { src: '/bar-chart.png', label: 'Grow' },
    { src: '/repeat.png', label: 'Repeat' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mt-4 lg:mt-0">
            <ClerkLoaded>
              <SignUp />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>
      </div>

      <div className="h-full bg-blue-600 hidden lg:flex lg:flex-col items-center justify-start gap-y-4 pt-32">
        <h2 className="ml-8 text-center text-3xl text-gray-50">
          Manage your finances with
        </h2>
        <div className="flex justify-center items-center gap-3">
        <Image src="/logo.png" height={75} width={75} alt="logo" />
          <h1 className="text-4xl font-bold text-white">BudgeBuddy</h1>
        </div>
        <h2 className="px-10 text-center text-xl text-gray-200">
          Track your incomes, expenses and budgets to save more for a better and
          risk-free future
        </h2>
        <div className="w-full flex items-center justify-evenly mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-white text-xl gap-2"
            >
              <Image src={feature.src} height={24} width={48} alt={feature.label} />
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}