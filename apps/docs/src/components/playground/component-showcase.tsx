import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@tokiui/ui'

export function ComponentShowcase() {
  return (
    <div className="space-y-8">
      {/* Buttons */}
      <section>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Buttons</p>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Badges */}
      <section>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Badges</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="soft">Soft</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
        </div>
      </section>

      {/* Input */}
      <section>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Input</p>
        <Input placeholder="Type something..." className="max-w-sm" />
      </section>

      {/* Card */}
      <section>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Card</p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a card description.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content goes here. This component adapts to your theme automatically.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </section>

      {/* Dialog */}
      <section>
        <p className="mb-3 text-sm font-medium text-muted-foreground">Dialog</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This dialog uses your current theme tokens for background, border, and text colors.
              </DialogDescription>
            </DialogHeader>
            <Input placeholder="Type something..." />
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  )
}
