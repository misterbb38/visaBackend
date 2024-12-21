// src/pages/Home.jsx

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
} from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      {/* <header className="navbar bg-base-100 shadow px-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
            Agence Internationale
          </Link>
        </div>
        <div>
          <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          />
        </div>

        <div className="flex-none">
          <Link to="/login" className="btn btn-primary">
            Se connecter
          </Link>
        </div>
      </header> */}

      <header className="navbar bg-base-100 shadow px-4">
        {/* Partie gauche : Logo / Titre */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
            Agence Internationale
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="flex items-center">
                {/* Toggle de thème si besoin */}
                <label className="label cursor-pointer">
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

      {/* HERO SECTION */}
      <section className="hero min-h-[60vh] bg-base-100  py-10">
        <div className="hero-content flex-col text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">
            Trouvez votre contrat de travail à l’international
          </h1>
          <p className="mb-8 text-lg">
            Accédez à des opportunités uniques dans le monde entier grâce à
            notre expertise et un suivi de procédures efficace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn btn-accent px-8 py-3">
              Commencer
            </Link>
            <a href="#contact" className="btn btn-outline px-8 py-3">
              Contactez-nous
            </a>
          </div>
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
              <span className="text-sm">+1 234 567 890</span>
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
