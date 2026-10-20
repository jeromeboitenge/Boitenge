'use client';

import ProfileIntro from './ProfileIntro';

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden px-4 md:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(20,90,74,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,90,74,0.07)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/80 to-transparent dark:from-darkBg/70" />
      <div className="mx-auto w-full max-w-7xl">
        <ProfileIntro showButtons={true} />
      </div>
    </section>
  );
}