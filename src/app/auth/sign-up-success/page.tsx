import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MailCheck } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccessPage() {
  return (
    <div className="relative min-h-svh w-full flex flex-col items-center justify-center p-6 md:p-10 bg-surface-container-lowest overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-sm">
        <Card className="border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary-container"></div>
          <CardHeader className="space-y-4 pt-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
              <MailCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <CardTitle className="font-headline font-semibold text-2xl tracking-tight text-primary">Transmission Sent</CardTitle>
              <CardDescription className="text-on-surface-variant font-medium">Verify your corporate credentials</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-10">
            <p className="text-sm text-on-surface-variant leading-relaxed opacity-70">
              Your registration request has been processed. A secure verification link has been dispatched to your corporate inbox. Confirm to activate your node access.
            </p>
          </CardContent>
          <CardFooter className=" flex justify-center items-center border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden text-center">
            <Button className="border-outline-variant/10 shadow-2xl shadow-primary/5 overflow-hidden text-center">
              <Link href="/auth/login">
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="absolute bottom-10 left-0 w-full flex justify-center z-10">
          <p className="text-[10px] items-center flex gap-2 font-bold tracking-[0.2em] uppercase text-outline-variant opacity-40">
            Verification Pending <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span> Network Entry Port
          </p>
      </div>
    </div>
  )
}
