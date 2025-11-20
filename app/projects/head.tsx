export default function Head() {
  const title = 'Projects | Jerome Boitenge';
  const description =
    'Explore the software products, platforms, and experiments Jerome Boitenge has designed, built, and shipped with modern web technologies.';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
}

