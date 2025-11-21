'use client';

import ProfileIntro from './ProfileIntro';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <ProfileIntro showButtons={true} />
      </div>
    </section>
  );
}
