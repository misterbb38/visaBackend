// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Building,
//   Globe,
//   Users,
//   PhoneCall,
//   Mail,
//   MapPin,
//   HeartHandshake,
//   Settings2,
//   CheckCircle2,
//   Menu,
//   MessageCircle,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
// } from "lucide-react";
// import { FaTelegramPlane } from "react-icons/fa";
// import logo from "../assets/logo.png";

// const API_URL = import.meta.env.VITE_API_URL;

// function Home() {
//   const [contrats, setContrats] = useState([]);
//   const [currentContractIndex, setCurrentContractIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContrats = async () => {
//       try {
//         const res = await fetch(`${API_URL}/api/contrats/all`);
//         const data = await res.json();
//         if (res.ok) {
//           setContrats(data);
//         } else {
//           setError("Erreur lors de la récupération des contrats");
//         }
//       } catch (err) {
//         setError("Erreur de connexion au serveur");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContrats();
//   }, []);

//   const handleWhatsAppClick = () => {
//     window.open("https://wa.me/447852718415", "_blank");
//   };
//   const handleTelegramClick = () => {
//     window.open("https://t.me/YourTelegramHandle", "_blank");
//   };

//   const nextContract = () => {
//     setCurrentContractIndex((prev) =>
//       prev === contrats.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevContract = () => {
//     setCurrentContractIndex((prev) =>
//       prev === 0 ? contrats.length - 1 : prev - 1
//     );
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* NAVBAR */}

//       <header className="navbar bg-base-100 shadow px-4">
//         {/* Partie gauche : Logo / Titre */}
//         <div className="flex-1">
//           <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
//             <img src={logo} alt="" className="h-26 w-24" />
//           </Link>
//         </div>

//         {/* Partie droite : Menu desktop + dropdown mobile */}
//         <div className="flex-none">
//           {/* Menu pour mobile : hamburger (lg:hidden) */}
//           <div className="dropdown dropdown-end lg:hidden">
//             <label tabIndex={0} className="btn btn-ghost">
//               <Menu size={20} />
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
//             >
//               <li className="flex items-center">
//                 {/* Toggle de thème si besoin */}
//                 <label className="label cursor-pointer">
//                   <span>Thème</span>
//                   <input
//                     type="checkbox"
//                     value="synthwave"
//                     className="toggle theme-controller ml-2"
//                   />
//                 </label>
//               </li>
//               <li>
//                 <Link to="/login">Se connecter</Link>
//               </li>
//             </ul>
//           </div>

//           {/* Menu pour desktop : affiché sur écrans larges (hidden sur mobile) */}
//           <div className="hidden lg:flex items-center space-x-4">
//             {/* Toggle de thème (optionnel) */}
//             <input
//               type="checkbox"
//               value="synthwave"
//               className="toggle theme-controller"
//             />
//             {/* Bouton Se connecter */}
//             <Link to="/login" className="btn btn-primary">
//               Se connecter
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Section Hero avec bouton WhatsApp */}
//       <section className="hero min-h-[60vh] bg-base-100 py-10">
//         <div className="hero-content flex-col text-center max-w-3xl mx-auto">
//           <h1 className="text-5xl font-extrabold mb-4">
//             Trouvez votre contrat de travail à l'international
//           </h1>
//           <p className="mb-8 text-lg">
//             Accédez à des opportunités uniques dans le monde entier grâce à
//             notre expertise et un suivi de procédures efficace.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/login" className="btn btn-accent px-8 py-3">
//               Commencer
//             </Link>
//             <button
//               onClick={handleWhatsAppClick}
//               className="btn btn-success flex items-center gap-2"
//             >
//               <MessageCircle size={20} />
//               WhatsApp
//             </button>
//             <button
//               onClick={handleTelegramClick}
//               className="btn btn-info btn-circle shadow-lg"
//               title="Telegram"
//             >
//               <FaTelegramPlane size={24} />
//             </button>
//             <a href="#contact" className="btn btn-outline px-8 py-3">
//               Contactez-nous
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Section Carousel des Contrats */}
//       <section className="py-12 bg-base-200">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Nos Contrats Disponibles
//           </h2>

//           {isLoading ? (
//             <div className="flex justify-center items-center py-12">
//               <Loader2 className="animate-spin w-12 h-12 text-primary" />
//             </div>
//           ) : error ? (
//             <div className="alert alert-error">
//               <p>{error}</p>
//             </div>
//           ) : contrats.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-lg">Aucun contrat disponible pour le moment</p>
//             </div>
//           ) : (
//             <div className="relative">
//               <div className="flex items-center justify-center">
//                 <button
//                   onClick={prevContract}
//                   className="btn btn-circle btn-ghost absolute left-0 lg:left-4 z-10"
//                   disabled={contrats.length <= 1}
//                 >
//                   <ChevronLeft size={24} />
//                 </button>

//                 {/* Carte du Contrat */}
//                 <div className="card w-full max-w-lg bg-base-100 shadow-xl">
//                   <div className="card-body">
//                     <h3 className="card-title text-2xl mb-4">
//                       {contrats[currentContractIndex].nom}
//                     </h3>
//                     <div className="space-y-3">
//                       <p className="flex justify-between">
//                         <span>Type:</span>
//                         <span className="font-semibold capitalize">
//                           {contrats[currentContractIndex].type}
//                         </span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span>Prix Total:</span>
//                         <span className="font-semibold">
//                           {contrats[currentContractIndex].prixTotal}€
//                         </span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span>Avance:</span>
//                         <span className="font-semibold">
//                           {contrats[currentContractIndex].prixAvance}€
//                         </span>
//                       </p>
//                       <p className="flex justify-between">
//                         <span>Délai de traitement:</span>
//                         <span className="font-semibold">
//                           {contrats[currentContractIndex].delaisTraitement}{" "}
//                           jours
//                         </span>
//                       </p>
//                     </div>
//                     <div className="card-actions justify-end mt-6">
//                       <button
//                         onClick={handleWhatsAppClick}
//                         className="btn btn-success"
//                       >
//                         Nous contacter
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={nextContract}
//                   className="btn btn-circle btn-ghost absolute right-0 lg:right-4 z-10"
//                   disabled={contrats.length <= 1}
//                 >
//                   <ChevronRight size={24} />
//                 </button>
//               </div>

//               {/* Indicateurs */}
//               {contrats.length > 1 && (
//                 <div className="flex justify-center mt-4 gap-2">
//                   {contrats.map((_, index) => (
//                     <button
//                       key={index}
//                       className={`w-3 h-3 rounded-full ${
//                         index === currentContractIndex
//                           ? "bg-primary"
//                           : "bg-base-300"
//                       }`}
//                       onClick={() => setCurrentContractIndex(index)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </section>
//       {/* SECTION INFORMATIONS */}
//       <section className="py-10 bg-base-200">
//         <div className="max-w-6xl mx-auto px-4 grid gap-6 lg:grid-cols-3">
//           {/* À PROPOS DE NOUS */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-primary">
//               <Building size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">À propos de nous</h2>
//             </div>
//             <p className="text-sm">
//               Nous sommes une agence spécialisée dans la connexion entre talents
//               et employeurs à travers le monde. Avec plusieurs années
//               d’expérience, nous vous accompagnons pour dénicher la meilleure
//               opportunité de travail.
//             </p>
//           </div>

//           {/* NOTRE MISSION */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-primary">
//               <Globe size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">Notre mission</h2>
//             </div>
//             <p className="text-sm">
//               Simplifier et accélérer toutes les démarches liées à l’emploi à
//               l’international, en vous offrant un suivi personnalisé et fiable
//               depuis la recherche de contrat jusqu’à l’obtention du visa.
//             </p>
//           </div>

//           {/* NOS SERVICES */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-primary">
//               <Users size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">Nos services</h2>
//             </div>
//             <p className="text-sm">
//               Nous proposons un accompagnement complet : négociation de contrat,
//               constitution de dossiers et facilitation de visa. Rejoignez-nous
//               pour une expérience simplifiée et sécurisée.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* NOUVELLES SECTIONS */}
//       <section className="py-10 bg-base-100">
//         <div className="max-w-6xl mx-auto px-4 grid gap-6 lg:grid-cols-3">
//           {/* NOS VALEURS */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-secondary">
//               <HeartHandshake size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">Nos valeurs</h2>
//             </div>
//             <p className="text-sm">
//               L’intégrité, la transparence et le respect sont au cœur de notre
//               approche. Nous mettons un point d’honneur à vous accompagner avec
//               bienveillance, pour une collaboration gagnant-gagnant.
//             </p>
//           </div>

//           {/* COMMENT ÇA MARCHE */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-secondary">
//               <Settings2 size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">Comment ça marche</h2>
//             </div>
//             <p className="text-sm">
//               1. Vous nous contactez avec votre projet. <br />
//               2. Nous analysons vos besoins et recherchons les opportunités
//               adaptées. <br />
//               3. Nous vous guidons dans toutes les étapes de la procédure, du
//               contrat au visa.
//             </p>
//           </div>

//           {/* POURQUOI NOUS CHOISIR */}
//           <div className="card bg-base-100 shadow p-6">
//             <div className="flex items-center mb-3 text-secondary">
//               <CheckCircle2 size={32} className="mr-2" />
//               <h2 className="text-xl font-bold">Pourquoi nous choisir</h2>
//             </div>
//             <p className="text-sm">
//               Bénéficiez d’un large réseau international, d’un suivi
//               personnalisé et d’une équipe dédiée. Notre priorité : rendre votre
//               recherche à l’étranger simple et sécurisée.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* SECTION PAYS */}
//       <section className="py-10 bg-base-200">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-6 text-center">
//             Nos destinations phares
//           </h2>
//           <div className="grid md:grid-cols-5 gap-4">
//             {/* Chaque pays */}
//             <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
//               <MapPin size={40} className="text-primary mb-2" />
//               <h3 className="font-semibold">Pays Schengen</h3>
//             </div>
//             <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
//               <MapPin size={40} className="text-primary mb-2" />
//               <h3 className="font-semibold">Canada</h3>
//             </div>
//             <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
//               <MapPin size={40} className="text-primary mb-2" />
//               <h3 className="font-semibold">États-Unis</h3>
//             </div>
//             <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
//               <MapPin size={40} className="text-primary mb-2" />
//               <h3 className="font-semibold">Colombie</h3>
//             </div>
//             <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
//               <MapPin size={40} className="text-primary mb-2" />
//               <h3 className="font-semibold">Brésil</h3>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION CONTACT (sans formulaire) */}
//       <section id="contact" className="py-10 bg-base-100">
//         <div className="max-w-xl mx-auto bg-base-100 shadow p-6 rounded-lg">
//           <div className="flex items-center mb-4 text-primary">
//             <PhoneCall size={28} className="mr-2" />
//             <h2 className="text-2xl font-bold">Contactez-nous</h2>
//           </div>
//           <p className="text-sm mb-4">
//             Pour plus d’informations ou pour commencer vos démarches, n’hésitez
//             pas à nous joindre.
//           </p>
//           <div className="flex flex-col space-y-3">
//             <div className="flex items-center">
//               <PhoneCall size={20} className="mr-2 text-secondary" />
//               <span className="text-sm">+447852718415</span>
//             </div>
//             <div className="flex items-center">
//               <Mail size={20} className="mr-2 text-secondary" />
//               <span className="text-sm">contact@agence-intl.com</span>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Social Media Section */}
//       <section className="py-10 bg-base-200">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-6">Suivez-nous sur</h2>
//           <div className="flex justify-center space-x-6">
//             {/* Facebook */}
//             <a
//               href="https://www.facebook.com/YourPage"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-primary"
//               aria-label="Facebook"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8"
//               >
//                 <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.344v21.312C0 23.4.597 24 1.325 24h11.494v-9.294H9.69v-3.622h3.13V8.413c0-3.1 1.895-4.788 4.662-4.788 1.325 0 2.464.1 2.796.144v3.24h-1.919c-1.507 0-1.799.716-1.799 1.764v2.314h3.588l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.4 24 22.656V1.344C24 .6 23.403 0 22.675 0z" />
//               </svg>
//             </a>
//             {/* Instagram */}
//             <a
//               href="https://www.instagram.com/YourProfile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-secondary"
//               aria-label="Instagram"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8"
//               >
//                 <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.314 3.608 1.288.975.975 1.226 2.242 1.288 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.314 2.633-1.288 3.608-.975.975-2.242 1.226-3.608 1.288-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.314-3.608-1.288-.975-.975-1.226-2.242-1.288-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.314-2.633 1.288-3.608.975-.975 2.242-1.226 3.608-1.288C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.014 7.052.072 5.771.131 4.64.346 3.678 1.308 2.716 2.27 2.5 3.4 2.441 4.679c-.058 1.28-.072 1.683-.072 5.048s.014 3.768.072 5.048c.058 1.279.275 2.409 1.237 3.371.962.962 2.092 1.179 3.371 1.237 1.28.058 1.683.072 5.048.072s3.768-.014 5.048-.072c1.279-.058 2.409-.275 3.371-1.237.962-.962 1.179-2.092 1.237-3.371.058-1.28.072-1.683.072-5.048s-.014-3.768-.072-5.048c-.058-1.279-.275-2.409-1.237-3.371C19.677.346 18.548.131 17.269.072 15.988.014 15.565 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-8 3.999 3.999 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
//               </svg>
//             </a>
//             {/* TikTok */}
//             <a
//               href="https://www.tiktok.com/@YourProfile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-primary"
//               aria-label="TikTok"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="w-8 h-8"
//               >
//                 <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm5.143 8.506a5.526 5.526 0 01-3.178-1.015v4.79a3.927 3.927 0 11-4.654-3.876v2.16a1.643 1.643 0 101.012 1.538V5.648h2.16a5.528 5.528 0 004.66 4.16z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-base-300 text-base-content py-4 text-center">
//         <p className="text-sm">
//           © 2024 Agence Internationale - Tous droits réservés.
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building,
  Globe,
  Users,
  PhoneCall,
  Mail,
  MapPin,
  HeartHandshake,
  Settings2,
  CheckCircle2,
  Menu,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";

// === Imports d'images (exemples) ===
import logo from "../assets/logo.png";
import heroBg from "../assets/hero-bg.jpg";
import contractPlaceholder from "../assets/contract-placeholder.jpg";

// Destinations
import schengenImg from "../assets/destination-schengen.jpg";
import canadaImg from "../assets/destination-canada.jpg";
import usaImg from "../assets/destination-usa.jpg";
import colombieImg from "../assets/destination-colombie.jpg";
import bresilImg from "../assets/destination-bresil.jpg";

// Témoignages
import testimonial1 from "../assets/testimonial1.jpg";
import testimonial2 from "../assets/testimonial2.jpg";
import testimonial3 from "../assets/testimonial3.jpg";

// Galerie
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";

// Récupération de l'URL de l'API depuis l'environnement
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [contrats, setContrats] = useState([]);
  const [currentContractIndex, setCurrentContractIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch des contrats depuis l'API
  useEffect(() => {
    const fetchContrats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contrats/all`);
        const data = await res.json();
        if (res.ok) {
          setContrats(data);
        } else {
          setError("Erreur lors de la récupération des contrats");
        }
      } catch (err) {
        setError("Erreur de connexion au serveur");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContrats();
  }, []);

  // Handlers pour WhatsApp et Telegram
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/447852718415", "_blank");
  };
  const handleTelegramClick = () => {
    window.open("https://t.me/visionworlde7", "_blank");
  };

  // Navigation dans le carousel
  const nextContract = () => {
    setCurrentContractIndex((prev) =>
      prev === contrats.length - 1 ? 0 : prev + 1
    );
  };
  const prevContract = () => {
    setCurrentContractIndex((prev) =>
      prev === 0 ? contrats.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <header className="navbar bg-base-100 shadow px-4">
        {/* Partie gauche : Logo / Titre */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
            <img src={logo} alt="Agence Logo" className="h-26 w-24" />
          </Link>
        </div>

        {/* Partie droite : Menu desktop + dropdown mobile */}
        <div className="flex-none">
          {/* Menu pour mobile : hamburger (lg:hidden) */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <Menu size={20} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li className="flex items-center">
                {/* Toggle de thème si besoin */}
                <label className="label cursor-pointer">
                  <span>Thème</span>
                  <input
                    type="checkbox"
                    value="synthwave"
                    className="toggle theme-controller ml-2"
                  />
                </label>
              </li>
              <li>
                <Link to="/login">Se connecter</Link>
              </li>
            </ul>
          </div>

          {/* Menu pour desktop : affiché sur écrans larges (hidden sur mobile) */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Toggle de thème (optionnel) */}
            <input
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
            {/* Bouton Se connecter */}
            <Link to="/login" className="btn btn-primary">
              Se connecter
            </Link>
          </div>
        </div>
      </header>

      {/* Section Hero avec background image */}
      <section
        className="hero min-h-[70vh] relative flex items-center justify-center bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="hero-content relative z-10 w-full max-w-3xl mx-auto px-4 py-10 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Trouvez votre contrat de travail à l'international
          </h1>
          <p className="text-base md:text-lg mb-8 px-2">
            Accédez à des opportunités uniques dans le monde entier grâce à
            notre expertise et un suivi de procédures efficace.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link to="/login" className="btn btn-accent px-8 py-3">
              Commencer
            </Link>
            <button
              onClick={handleWhatsAppClick}
              className="btn btn-success flex items-center gap-2"
            >
              <MessageCircle size={20} />
              WhatsApp
            </button>
            <button
              onClick={handleTelegramClick}
              className="btn btn-info btn-circle shadow-lg"
              title="Telegram"
            >
              <FaTelegramPlane size={24} />
            </button>
            <a href="#contact" className="btn btn-outline px-8 py-3">
              Contactez-nous
            </a>
          </div>
        </div>
      </section>

      {/* Section Carousel des Contrats */}
      <section className="py-12 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nos Contrats Disponibles
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin w-12 h-12 text-primary" />
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <p>{error}</p>
            </div>
          ) : contrats.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg">Aucun contrat disponible pour le moment</p>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center justify-center">
                <button
                  onClick={prevContract}
                  className="btn btn-circle btn-ghost absolute left-0 lg:left-4 z-10"
                  disabled={contrats.length <= 1}
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Carte du Contrat */}
                <div className="card w-full max-w-lg bg-base-100 shadow-xl">
                  {/* Image du contrat (ou placeholder) */}
                  <figure>
                    <img
                      src={
                        contrats[currentContractIndex].imageUrl ||
                        contractPlaceholder
                      }
                      alt={
                        contrats[currentContractIndex].nom ||
                        "Contrat disponible"
                      }
                      className="w-full h-48 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-2xl mb-4">
                      {contrats[currentContractIndex].nom}
                    </h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span>Type :</span>
                        <span className="font-semibold capitalize">
                          {contrats[currentContractIndex].type}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Prix Total :</span>
                        <span className="font-semibold">
                          {contrats[currentContractIndex].prixTotal} €
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Avance :</span>
                        <span className="font-semibold">
                          {contrats[currentContractIndex].prixAvance} €
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Délai de traitement :</span>
                        <span className="font-semibold">
                          {contrats[currentContractIndex].delaisTraitement}{" "}
                          jours
                        </span>
                      </p>
                    </div>
                    <div className="card-actions justify-end mt-6">
                      <button
                        onClick={handleWhatsAppClick}
                        className="btn btn-success"
                      >
                        Nous contacter
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={nextContract}
                  className="btn btn-circle btn-ghost absolute right-0 lg:right-4 z-10"
                  disabled={contrats.length <= 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Indicateurs */}
              {contrats.length > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                  {contrats.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentContractIndex
                          ? "bg-primary"
                          : "bg-base-300"
                      }`}
                      onClick={() => setCurrentContractIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* SECTION INFORMATIONS */}
      <section className="py-10 bg-base-200">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 lg:grid-cols-3">
          {/* À PROPOS DE NOUS */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-primary">
              <Building size={32} className="mr-2" />
              <h2 className="text-xl font-bold">À propos de nous</h2>
            </div>
            <p className="text-sm">
              Nous sommes une agence spécialisée dans la connexion entre talents
              et employeurs à travers le monde. Avec plusieurs années
              d’expérience, nous vous accompagnons pour dénicher la meilleure
              opportunité de travail.
            </p>
          </div>

          {/* NOTRE MISSION */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-primary">
              <Globe size={32} className="mr-2" />
              <h2 className="text-xl font-bold">Notre mission</h2>
            </div>
            <p className="text-sm">
              Simplifier et accélérer toutes les démarches liées à l’emploi à
              l’international, en vous offrant un suivi personnalisé et fiable
              depuis la recherche de contrat jusqu’à l’obtention du visa.
            </p>
          </div>

          {/* NOS SERVICES */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-primary">
              <Users size={32} className="mr-2" />
              <h2 className="text-xl font-bold">Nos services</h2>
            </div>
            <p className="text-sm">
              Nous proposons un accompagnement complet : négociation de contrat,
              constitution de dossiers et facilitation de visa. Rejoignez-nous
              pour une expérience simplifiée et sécurisée.
            </p>
          </div>
        </div>
      </section>

      {/* NOUVELLES SECTIONS */}
      <section className="py-10 bg-base-100">
        <div className="max-w-6xl mx-auto px-4 grid gap-6 lg:grid-cols-3">
          {/* NOS VALEURS */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-secondary">
              <HeartHandshake size={32} className="mr-2" />
              <h2 className="text-xl font-bold">Nos valeurs</h2>
            </div>
            <p className="text-sm">
              L’intégrité, la transparence et le respect sont au cœur de notre
              approche. Nous mettons un point d’honneur à vous accompagner avec
              bienveillance, pour une collaboration gagnant-gagnant.
            </p>
          </div>

          {/* COMMENT ÇA MARCHE */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-secondary">
              <Settings2 size={32} className="mr-2" />
              <h2 className="text-xl font-bold">Comment ça marche</h2>
            </div>
            <p className="text-sm">
              1. Vous nous contactez avec votre projet. <br />
              2. Nous analysons vos besoins et recherchons les opportunités
              adaptées. <br />
              3. Nous vous guidons dans toutes les étapes, du contrat au visa.
            </p>
          </div>

          {/* POURQUOI NOUS CHOISIR */}
          <div className="card bg-base-100 shadow p-6">
            <div className="flex items-center mb-3 text-secondary">
              <CheckCircle2 size={32} className="mr-2" />
              <h2 className="text-xl font-bold">Pourquoi nous choisir</h2>
            </div>
            <p className="text-sm">
              Bénéficiez d’un large réseau international, d’un suivi
              personnalisé et d’une équipe dédiée. Notre priorité : rendre votre
              recherche à l’étranger simple et sécurisée.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION PAYS */}
      <section className="py-10 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Nos destinations phares
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <img
                src={schengenImg}
                alt="Pays Schengen"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-primary mt-2">Pays Schengen</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <img
                src={canadaImg}
                alt="Canada"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-primary mt-2">Canada</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <img
                src={usaImg}
                alt="États-Unis"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-primary mt-2">États-Unis</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <img
                src={colombieImg}
                alt="Colombie"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-primary mt-2">Colombie</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <img
                src={bresilImg}
                alt="Brésil"
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h3 className="font-semibold text-primary mt-2">Brésil</h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TÉMOIGNAGES */}
      <section className="py-10 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Témoignages de nos clients
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="card bg-base-200 shadow">
              <figure>
                <img
                  src={testimonial1}
                  alt="Témoignage client 1"
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Cherifo D</h3>
                <p className="text-sm mt-2">
                  "Grâce à l’agence, j’ai pu décrocher un contrat de développeur
                  en Allemagne. Processus rapide et efficace !"
                </p>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="card bg-base-200 shadow">
              <figure>
                <img
                  src={testimonial2}
                  alt="Témoignage client 2"
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Pape Assane</h3>
                <p className="text-sm mt-2">
                  "Ils m’ont accompagné pour un poste au Canada. Tout s’est
                  parfaitement déroulé ! Super expérience."
                </p>
              </div>
            </div>
            {/* Testimonial 3 */}
            <div className="card bg-base-200 shadow">
              <figure>
                <img
                  src={testimonial3}
                  alt="Témoignage client 3"
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Ali Ben</h3>
                <p className="text-sm mt-2">
                  "Équipe très professionnelle, j’ai pu obtenir mon contrat
                  rapidement et le visa en un temps record."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION GALERIE D'IMAGES */}
      <section className="py-10 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Galerie</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <img
              src={gallery1}
              alt="Galerie 1"
              className="w-full h-48 object-cover rounded shadow"
            />
            <img
              src={gallery2}
              alt="Galerie 2"
              className="w-full h-48 object-cover rounded shadow"
            />
            <img
              src={gallery3}
              alt="Galerie 3"
              className="w-full h-48 object-cover rounded shadow"
            />
            <img
              src={gallery4}
              alt="Galerie 4"
              className="w-full h-48 object-cover rounded shadow"
            />
            {/* Ajoute autant d'images que tu veux */}
          </div>
        </div>
      </section>

      {/* SECTION CONTACT (sans formulaire) */}
      <section id="contact" className="py-10 bg-base-100">
        <div className="max-w-xl mx-auto bg-base-100 shadow p-6 rounded-lg">
          <div className="flex items-center mb-4 text-primary">
            <PhoneCall size={28} className="mr-2" />
            <h2 className="text-2xl font-bold">Contactez-nous</h2>
          </div>
          <p className="text-sm mb-4">
            Pour plus d’informations ou pour commencer vos démarches, n’hésitez
            pas à nous joindre.
          </p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <PhoneCall size={20} className="mr-2 text-secondary" />
              <span className="text-sm">+447852718415</span>
            </div>
            <div className="flex items-center">
              <Mail size={20} className="mr-2 text-secondary" />
              <span className="text-sm">contact@agence-intl.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-10 bg-base-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Suivez-nous sur</h2>
          <div className="flex justify-center space-x-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61571938981718&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.344v21.312C0 23.4.597 24 1.325 24h11.494v-9.294H9.69v-3.622h3.13V8.413c0-3.1 1.895-4.788 4.662-4.788 1.325 0 2.464.1 2.796.144v3.24h-1.919c-1.507 0-1.799.716-1.799 1.764v2.314h3.588l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.4 24 22.656V1.344C24 .6 23.403 0 22.675 0z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/YourProfile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.314 3.608 1.288.975.975 1.226 2.242 1.288 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.314 2.633-1.288 3.608-.975.975-2.242 1.226-3.608 1.288-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.314-3.608-1.288-.975-.975-1.226-2.242-1.288-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.314-2.633 1.288-3.608.975-.975 2.242-1.226 3.608-1.288C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.735 0 8.332.014 7.052.072 5.771.131 4.64.346 3.678 1.308 2.716 2.27 2.5 3.4 2.441 4.679c-.058 1.28-.072 1.683-.072 5.048s.014 3.768.072 5.048c.058 1.279.275 2.409 1.237 3.371.962.962 2.092 1.179 3.371 1.237 1.28.058 1.683.072 5.048.072s3.768-.014 5.048-.072c1.279-.058 2.409-.275 3.371-1.237.962-.962 1.179-2.092 1.237-3.371.058-1.28.072-1.683.072-5.048s-.014-3.768-.072-5.048c-.058-1.279-.275-2.409-1.237-3.371C19.677.346 18.548.131 17.269.072 15.988.014 15.565 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-8 3.999 3.999 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@worldwidevision7?_t=ZG-8t7D9wjPYTB&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
              aria-label="TikTok"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm5.143 8.506a5.526 5.526 0 01-3.178-1.015v4.79a3.927 3.927 0 11-4.654-3.876v2.16a1.643 1.643 0 101.012 1.538V5.648h2.16a5.528 5.528 0 004.66 4.16z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-base-300 text-base-content py-4 text-center mt-auto">
        <p className="text-sm">
          © 2025 Agence Internationale - Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

export default Home;
