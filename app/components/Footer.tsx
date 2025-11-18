export default function Footer() {
  return (
    <footer className="bg-lightBg dark:bg-darkText py-6 text-center text-darkText dark:text-lightBg">
      <p>© {new Date().getFullYear()} Jerome Boitenge. All rights reserved.</p>
    </footer>
  );
}
