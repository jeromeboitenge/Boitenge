// components/GoogleMap.tsx

export default function GoogleMap() {
  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mt-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.965054765184!2d30.053803270024986!3d-1.956976718404552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42936c4fc0b%3A0x8c6a59bcc69b83fb!2sNyarugenge%2C%20Kigali!5e0!3m2!1sen!2srw!4v1763562439988!5m2!1sen!2srw"
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
