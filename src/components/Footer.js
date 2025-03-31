export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-black">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto px-4 sm:px-6 sm:py-5 lg:px-8 lg:pt-12">
        <div className="border-t border-gray-600 pt-5 flex justify-between">
          <p className="text-xs text-gray-500">
            &copy; 2025 GRAPES STUDIO. ALL RIGHTS RESERVED
          </p>
          <a href="https://www.instagram.com/grapes.london/" target="_self">
            <img alt="" src="/images/logo.png" className="h-5 w-auto" />
          </a>
          <p className="text-xs text-gray-500">
            DEVELOPMENT & DESIGN BY SCARYTOYS
          </p>
        </div>
      </div>
    </footer>
  );
}
