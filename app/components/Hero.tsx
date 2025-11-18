'use client';

import ProfileIntro from './ProfileIntro';

export default function Hero() {
  return (
    <section className="min-h-screen flex justify-center items-center px-4">
      <ProfileIntro showButtons={true} />
    </section>
  );
}
