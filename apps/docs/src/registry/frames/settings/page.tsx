import {
  Tabs, TabsList, TabsTrigger, TabsContent,
  Card, Input, Textarea, Button, Switch, SwitchField, Avatar, Separator,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@tokiui/ui'

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList variant="line" className="mb-6 w-full justify-start">
          <TabsTrigger variant="line" value="profile">Profile</TabsTrigger>
          <TabsTrigger variant="line" value="account">Account</TabsTrigger>
          <TabsTrigger variant="line" value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card shadow="none" className="p-6">
            <div className="flex items-center gap-4">
              <Avatar size="xl" color="auto" fallback="JD" />
              <div className="flex gap-2">
                <Button variant="outline" color="neutral" size="sm">Change avatar</Button>
                <Button variant="ghost" color="destructive" size="sm">Remove</Button>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Full name</label>
                <Input id="name" defaultValue="Jane Doe" className="w-full" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="username" className="text-sm font-medium text-foreground">Username</label>
                <Input id="username" defaultValue="janedoe" className="w-full" />
              </div>
              <div className="grid gap-1.5">
                <label htmlFor="bio" className="text-sm font-medium text-foreground">Bio</label>
                <Textarea id="bio" defaultValue="Design engineer. Building component systems." showCount maxLength={160} className="w-full" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" color="neutral">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <Card shadow="none" className="p-6">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email address</label>
                <Input id="email" type="email" defaultValue="jane@example.com" className="w-full" />
              </div>
              <div className="grid gap-1.5">
                <span className="text-sm font-medium text-foreground">Language</span>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <span className="text-sm font-medium text-foreground">Timezone</span>
                <Select defaultValue="utc">
                  <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="pt">Pacific Time</SelectItem>
                    <SelectItem value="et">Eastern Time</SelectItem>
                    <SelectItem value="cet">Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Delete account</p>
                <p className="text-sm text-muted-foreground">Permanently remove your account and all data.</p>
              </div>
              <Button color="destructive" variant="outline">Delete</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card shadow="none" className="p-6">
            <div className="grid gap-1">
              <SwitchField label="Product updates" description="News about features and improvements.">
                <Switch defaultChecked />
              </SwitchField>
              <Separator className="my-4" />
              <SwitchField label="Security alerts" description="Important notifications about your account security.">
                <Switch defaultChecked />
              </SwitchField>
              <Separator className="my-4" />
              <SwitchField label="Marketing emails" description="Tips, offers, and other promotional messages.">
                <Switch />
              </SwitchField>
              <Separator className="my-4" />
              <SwitchField label="Weekly digest" description="A summary of your activity, every Monday.">
                <Switch defaultChecked />
              </SwitchField>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Save preferences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
