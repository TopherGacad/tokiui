import Link from 'next/link'
import { Card, Input, Button, Checkbox } from '@tokiui/ui'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.6l-6.6-5.6C29.7 34.5 27 35.5 24 35.5c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.6 5.6C42.9 35.6 44 30.1 44 24c0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
      <Card shadow="sm" className="w-full max-w-sm p-7">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">
            tu
          </div>
          <h1 className="text-xl font-medium tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your tokiui account</p>
        </div>

        <div className="grid gap-2">
          <Button variant="outline" color="neutral" className="w-full">
            <GitHubIcon />
            Continue with GitHub
          </Button>
          <Button variant="outline" color="neutral" className="w-full">
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <Input id="email" type="email" placeholder="you@example.com" className="w-full" />
          </div>
          <div className="grid gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
              <Link href="#" className="text-xs text-muted-foreground no-underline hover:text-foreground">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder="••••••••" className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" defaultChecked />
            <label htmlFor="remember" className="cursor-pointer select-none text-sm text-muted-foreground">
              Remember me for 30 days
            </label>
          </div>
          <Button className="w-full">Sign in</Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="#" className="font-medium text-foreground no-underline hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}
