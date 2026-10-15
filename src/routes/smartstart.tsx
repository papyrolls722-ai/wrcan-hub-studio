import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, BookOpen, MapPin, Radio, WifiOff, Users } from 'lucide-react';
import { Shell } from '@/components/Shell';

export const Route = createFileRoute('/smartstart')({ head: () => ({ meta: [
  { title: 'SmartStart — WRCAN Hub' }, { name: 'description', content: 'Access WRCAN learning, live training sessions, field attendance and saved lessons from SmartStart.' },
  { property: 'og:title', content: 'SmartStart — WRCAN Hub' }, { property: 'og:description', content: 'Your WRCAN learning and community workspace, all in one place.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
] }), component: SmartStart });
function SmartStart() {
  return <Shell title="SmartStart" subtitle="Learning · People · Opportunity">
    <div className="border-y border-border py-6 mb-4"><h2 className="font-display text-3xl text-primary">Your next step starts here.</h2><p className="mt-3 text-sm text-muted-foreground">WRCAN learning and community workspace.</p></div>
    <div className="divide-y divide-border">{[
      { to: '/training', title: 'Training modules', text: 'Browse the WRCAN training catalogue', icon: BookOpen },
      { to: '/sessions', title: 'Live training & field sessions', text: 'Join a broadcast or share session attendance', icon: Radio },
      { to: '/offline', title: 'Saved learning', text: 'Your saved lessons and personal drafts', icon: WifiOff },
      { to: '/media-studio', title: 'Interactive classroom', text: 'Small-group video training', icon: Users },
      { to: '/chat', title: 'Community', text: 'Connect with your WRCAN groups', icon: MapPin },
    ].map(({ to, title, text, icon: Icon }) => <Link key={to} to={to} className="flex gap-4 items-center py-5"><Icon className="size-6 shrink-0 text-primary" /><div className="min-w-0 flex-1"><h3 className="font-display text-xl">{title}</h3><p className="text-xs text-muted-foreground mt-1">{text}</p></div><ArrowUpRight className="size-4 shrink-0 text-primary" /></Link>)}</div>
    <p className="mt-6 text-xs text-muted-foreground">This workspace contains WRCAN resources. Official SmartStart partner tools or materials have not been connected.</p>
  </Shell>;
}