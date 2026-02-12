import React, { useEffect, useRef } from 'react';
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";
import logo from "../../static/images/logo/logo.png";


function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const headerRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const createIcon = (x, y, velocityX = 0, velocityY = 0) => {
      const el = document.createElement("div");
      el.className = styles.cursorIcon;
      const randomIcon = Math.floor(Math.random() * 3); // 0: book, 1: pencil, 2: graduation
      const size = Math.random() * 6 + 14; // Random size between 14-20px

      el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="${getIconPath(randomIcon)}" stroke="currentColor" stroke-width="1.2" fill="none"/>
      </svg>`;

      // Calculate position with velocity influence
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 20 + 5; // Closer to cursor (5-25px)
      const offsetX = Math.cos(angle) * distance;
      const offsetY = Math.sin(angle) * distance;

      el.style.left = `${x + offsetX}px`;
      el.style.top = `${y + offsetY}px`;
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.color = 'rgba(255, 255, 255, 0.85)';
      el.style.transform = 'scale(0) rotate(0deg)';
      el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      el.style.filter = 'blur(0px)';
      el.style.opacity = '0';

      document.body.appendChild(el);

      // Calculate random rotation and movement
      const rotation = (Math.random() - 0.5) * 180; // Less rotation
      const moveX = (Math.random() - 0.5) * 60 + velocityX; // Less spread
      const moveY = -Math.random() * 60 - 30 + velocityY; // Less vertical movement

      // Trigger animation
      requestAnimationFrame(() => {
        el.style.transform = `scale(1) rotate(${rotation}deg) translate(${moveX}px, ${moveY}px)`;
        el.style.opacity = '1';
        el.style.filter = 'blur(0.5px)'; // Less blur
      });

      // Remove after animation
      setTimeout(() => {
        el.remove();
      }, 800);
    };

    const handleMouseMove = (e) => {
      // Calculate velocity
      const currentX = e.clientX;
      const currentY = e.clientY;
      velocity.current = {
        x: currentX - lastMousePos.current.x,
        y: currentY - lastMousePos.current.y
      };
      lastMousePos.current = { x: currentX, y: currentY };

      // Create icons based on velocity
      const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
      const numIcons = Math.min(Math.floor(speed / 8), 3); // Fewer icons, higher speed threshold

      for (let i = 0; i < numIcons; i++) {
        setTimeout(() => {
          createIcon(currentX, currentY, velocity.current.x, velocity.current.y);
        }, i * 40);
      }
    };

    const handleMouseEnter = (e) => {
      // Create initial burst of icons
      for (let i = 0; i < 8; i++) { // Fewer initial icons
        setTimeout(() => {
          createIcon(e.clientX, e.clientY);
        }, i * 40);
      }
    };

    header.addEventListener("mousemove", handleMouseMove);
    header.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      header.removeEventListener("mousemove", handleMouseMove);
      header.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Helper function to get SVG path data
  const getIconPath = (idx) => {
    switch (idx) {
      case 0: // book
        return "M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235 M8 7H16 M8 10.5H13 M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12";
      case 1: // pencil
        return "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z";
      case 2: // graduation
        return "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z";
      default:
        return "";
    }
  };

  return (
    <header ref={headerRef} className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="eSchool SaaS Logo"
            width="120"
            height="120"
            className={styles.logo}
          />
        </div>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/installation/intro"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  {/* Admin icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
                  </svg>
                </div>
                <h3>Installation</h3>
              </div>
              <div className="card__body">
                <p>
                  Comprehensive installation guide with step by step instructions
                  for setting up eSchool SaaS.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/installation/intro"
                >
                  Setup eSchool SaaS
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                  </svg>
                </div>
                <h3>Super Admin</h3>
              </div>
              <div className="card__body">
                <p>
                  Explore all the powerful features available in the eSchool SaaS Super Admin Panel.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/superadmin/intro"
                >
                  View Super Admin Features
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--4">
            <div className="card margin-bottom--lg">
              <div className="card__header">
                <div className={styles.cardIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="38"
                    viewBox="0 0 100 100"
                    fill="currentColor">

                    <path d="M68,49.1c0,1.1-0.9,2-2,2H47.4c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2H66c1.1,0,2,0.9,2,2V49.1z" />
                    <path d="M39.4,49.1c0,1.1-0.9,2-2,2H34c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h3.4c1.1,0,2,0.9,2,2V49.1z" />
                    <path d="M73.8,20H26.2c-3.4,0-6.2,2.8-6.2,6.2v47.6c0,3.4,2.8,6.2,6.2,6.2h47.6c3.4,0,6.2-2.8,6.2-6.2V26.2
	C80,22.8,77.2,20,73.8,20z M47.4,27.4c0-0.8,0.8-1.4,1.6-1.4h23.4c0.8,0,1.4,0.8,1.4,1.6v3c0,0.8-0.8,1.4-1.6,1.4H48.8
	c-0.8,0-1.4-0.8-1.4-1.6V27.4z M39.4,26c1.7,0,3,1.3,3,3c0,1.7-1.3,3-3,3s-3-1.3-3-3C36.4,27.3,37.7,26,39.4,26z M29,26
	c1.7,0,3,1.3,3,3c0,1.7-1.3,3-3,3s-3-1.3-3-3C26,27.3,27.3,26,29,26z M74,72.6c0,0.8-0.8,1.4-1.6,1.4H68V59.1c0-1.1-0.9-2-2-2H34
	c-1.1,0-2,0.9-2,2V74h-4.6c-0.8,0-1.4-0.8-1.4-1.6v-33c0-0.8,0.8-1.4,1.6-1.4h45c0.8,0,1.4,0.8,1.4,1.6V72.6z"/>
                  </svg>
                </div>
                <h3>School Admin</h3>
              </div>
              <div className="card__body">
                <p>
                  Discover the tools and functionalities available to School Admins in eSchool SaaS.
                </p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--outline button--primary"
                  to="/schooladmin/intro"
                >
                  View School Admin Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  return (
    <section className={styles.support}>
      <div className="container text--center">
        <h2>Need Help?</h2>
        <p>
          Our support team is ready to assist you with any questions or issues.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg margin-right--md"
            to="/installation/support"
          >
            Support
          </Link>
          <Link className="button button--secondary button--lg" to="/installation/contact-us">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <SupportSection />
      </main>
    </Layout>
  );
}
