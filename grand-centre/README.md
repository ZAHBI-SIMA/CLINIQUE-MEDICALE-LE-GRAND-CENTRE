# Clinique Médicale Le Grand Centre — Site Vitrine & Plateforme de Rendez-vous

Site web vitrine moderne et performant pour la **Clinique Médicale Le Grand Centre** (Abidjan, Côte d'Ivoire).

## Stack Technique
* **HTML5 sémantique**
* **CSS3 moderne** (Variables CSS, Flexbox, CSS Grid, Transitions fluides)
* **JavaScript Vanilla (ES6+)** (Zéro framework lourd)
* **Google Fonts** : Plus Jakarta Sans
* **Google Maps** : Localisation réactive & calcul d'itinéraire
* **WhatsApp Business** : Prise de contact directe et confirmation de RDV

## Architecture des Fichiers

```text
grand-centre/
│
├── index.html                  # Page d'accueil complète (Hero, Spécialités, Services, Médecins, RDV, Avis, FAQ)
│
├── pages/
│   ├── clinique.html           # Présentation de l'établissement et valeurs
│   ├── specialites.html        # Pôles d'excellence médicale
│   ├── services.html           # Urgences 24/7, Laboratoire, Scanner, Hospitalisation
│   ├── medecins.html           # Liste et profils des praticiens
│   ├── rendez-vous.html        # Module de réservation en ligne
│   ├── actualites.html         # Conseils santé et actualités
│   ├── contact.html            # Coordonnées complètes, formulaire & horaires
│   ├── urgences.html           # Ligne rouge 24/7 et consignes d'arrivée
│   ├── faq.html                # Foire aux questions en accordéon
│   ├── mentions-legales.html   # Mentions réglementaires et déontologie
│   └── confidentialite.html    # Protection des données et secret médical
│
├── css/
│   ├── style.css               # Feuille de style principale avec la palette exacte
│   ├── responsive.css          # Adaptation mobile-first, tablette et desktop
│   └── animations.css          # Animations sobres et IntersectionObserver
│
├── js/
│   ├── main.js                 # Défilement sticky, analytics et écouteurs globaux
│   ├── menu.js                 # Tiroir de navigation mobile
│   ├── appointment.js          # Wizard de prise de rendez-vous en 4 étapes + reçu
│   ├── faq.js                  # Accordéon interactif
│   ├── modal.js                # Gestionnaire des fenêtres modales
│   └── validation.js           # Validation en direct des formulaires
│
└── README.md
```

## Palette Officielle (Alignée sur le logo CMGC)
* `--primary`: `#163E93` (Bleu Roi Médical Officiel Le Grand Centre)
* `--primary-dark`: `#0E2866` (Bleu Nuit Profond d'autorité & prestige)
* `--secondary`: `#2563EB` (Bleu Cobalt éclatant & confiance)
* `--accent`: `#F59E0B` (Doré ambre chaleureux)
* `--background`: `#F8FAFC` (Blanc bleuté hygiénique et apaisant)
* `--white`: `#FFFFFF`
* `--text`: `#0F172A`
* `--text-light`: `#64748B`

## Fonctionnalités Clés
1. **Header Sticky & Menu Mobile** : Réduction fluide au scroll, CTA visible en permanence.
2. **Hero Révélateur** : Accroche rassurante, badges de réassurance et appels à l'action immédiats.
3. **Parcours Prise de RDV en < 2 min** :
   - Spécialité ➔ Praticien ➔ Date ➔ Heure ➔ Coordonnées ➔ Bon de convocation imprimable avec référence unique.
4. **Bouton WhatsApp Flottant** : Ouverture directe d'une conversation pré-remplie avec le secrétariat.
5. **Barre Mobile Fixe** : `📞 Appeler` | `📅 RDV` | `💬 WhatsApp` optimisée pour le taux de conversion sur smartphone.
6. **Référencement & Données Structurées** : Balisage Schema.org `MedicalClinic` et métadonnées OpenGraph intégrés.
