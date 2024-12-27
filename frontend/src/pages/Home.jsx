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
import logo from "../assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [contrats, setContrats] = useState([]);
  const [currentContractIndex, setCurrentContractIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/447852718415", "_blank");
  };

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
            <img src={logo} alt="" className="h-26 w-24" />
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
      {/* Section Hero avec bouton WhatsApp */}
      <section className="hero min-h-[60vh] bg-base-100 py-10">
        <div className="hero-content flex-col text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">
            Trouvez votre contrat de travail à l'international
          </h1>
          <p className="mb-8 text-lg">
            Accédez à des opportunités uniques dans le monde entier grâce à
            notre expertise et un suivi de procédures efficace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                  <div className="card-body">
                    <h3 className="card-title text-2xl mb-4">
                      {contrats[currentContractIndex].nom}
                    </h3>
                    <div className="space-y-3">
                      <p className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-semibold capitalize">
                          {contrats[currentContractIndex].type}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Prix Total:</span>
                        <span className="font-semibold">
                          {contrats[currentContractIndex].prixTotal}€
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Avance:</span>
                        <span className="font-semibold">
                          {contrats[currentContractIndex].prixAvance}€
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Délai de traitement:</span>
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
              3. Nous vous guidons dans toutes les étapes de la procédure, du
              contrat au visa.
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
            {/* Chaque pays */}
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <MapPin size={40} className="text-primary mb-2" />
              <h3 className="font-semibold">Pays Schengen</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <MapPin size={40} className="text-primary mb-2" />
              <h3 className="font-semibold">Canada</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <MapPin size={40} className="text-primary mb-2" />
              <h3 className="font-semibold">États-Unis</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <MapPin size={40} className="text-primary mb-2" />
              <h3 className="font-semibold">Colombie</h3>
            </div>
            <div className="card bg-base-100 shadow p-4 flex flex-col items-center">
              <MapPin size={40} className="text-primary mb-2" />
              <h3 className="font-semibold">Brésil</h3>
            </div>
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

      {/* FOOTER */}
      <footer className="bg-base-300 text-base-content py-4 text-center">
        <p className="text-sm">
          © 2024 Agence Internationale - Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

export default Home;
