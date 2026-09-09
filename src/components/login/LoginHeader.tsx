import Image from 'next/image'

export function LoginHeader() {
  return (
    <div className="mb-6 text-center">
      <div className="mb-4 flex justify-center">
        <Image
          src="/vexa-insight-icon.svg"
          alt="Vexa Insight"
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Sign In
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Welcome back to Vexa Mail Insight
      </p>
    </div>
  )
}
