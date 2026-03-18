import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-svh w-full flex flex-col items-center justify-center p-6 md:p-10 bg-surface-container-lowest overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm">
        <ForgotPasswordForm />
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
          <p className="text-[10px] items-center flex gap-2 font-bold tracking-[0.2em] uppercase text-outline-variant opacity-40">
            Recovery Sub-Protocol <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span> Path 009
          </p>
      </div>
    </div>
  )
}
