export interface Specialty {
  id: string;
  name: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  procedures: string[];
  headDoctor: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  title: string;
  experienceYears: number;
  education: string;
  languages: string[];
  days: string[];
  avatarUrl: string;
  availableNext: string;
}

export interface ClinicService {
  id: string;
  title: string;
  icon: string;
  description: string;
  schedule: string;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const CLINIC_INFO = {
  name: "Clinique Médicale Le Grand Centre",
  tagline: "Votre santé, notre priorité",
  description: "La Clinique Médicale Le Grand Centre vous accompagne avec une prise en charge médicale professionnelle, humaine et adaptée à vos besoins.",
  phoneMain: "+225 27 22 55 00 00",
  phoneMainRaw: "+2252722550000",
  phoneEmergency: "+225 07 07 11 22 33",
  phoneEmergencyRaw: "+2250707112233",
  whatsappNumber: "+2250707112233",
  email: "contact@legrandcentre-clinique.com",
  emailRdv: "rendezvous@legrandcentre-clinique.com",
  address: "Boulevard Hassan II, Carrefour du Grand Centre, Cocody, Abidjan",
  openingHours: "Lundi - Vendredi: 07h30 - 20h00 | Samedi: 08h00 - 18h00",
  emergencyHours: "Service d'Urgences & Réanimation ouvert 24h/24 et 7j/7",
  googleMapsUrl: "https://maps.google.com/?q=Cocody+Abidjan+Clinique+Medicale",
  mapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.482813589408!2d-3.989912!3d5.358241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1945638c4b7b3%3A0x6bfa9e67ad10850!2sCocody%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1700000000000!5m2!1sfr!2sci"
};

export const SPECIALTIES: Specialty[] = [
  {
    id: "cardio",
    name: "Cardiologie",
    iconName: "HeartPulse",
    shortDesc: "Diagnostic complet, prévention et suivi rigoureux des pathologies cardiovasculaires.",
    longDesc: "Notre unité de cardiologie dispose de technologies d'exploration non invasives avancées pour le dépistage et le traitement des maladies du cœur et des vaisseaux sanguins.",
    procedures: ["Échocardiographie Doppler", "Holter tensionnel (MAPA)", "Holter ECG 24-48h", "Épreuve d'effort assistée", "Bilan d'hypertension artérielle"],
    headDoctor: "Dr Jean-Marc Kouassi"
  },
  {
    id: "pediatrie",
    name: "Pédiatrie & Néonatalogie",
    iconName: "Baby",
    shortDesc: "Prise en charge pédiatrique bienveillante de la naissance à l'adolescence.",
    longDesc: "Des pédiatres attentifs et un espace dédié aux tout-petits pour assurer le suivi vaccinal, la croissance harmonieuse et le traitement des urgences infantiles.",
    procedures: ["Suivi du développement & croissance", "Calendrier vaccinal complet", "Urgences pédiatriques", "Dépistage auditif et visuel du nourrisson", "Nutrition infantile"],
    headDoctor: "Dr Aminata Touré"
  },
  {
    id: "gyneco",
    name: "Gynécologie - Obstétrique",
    iconName: "Flower2",
    shortDesc: "Accompagnement de la femme à chaque étape de la vie et maternité d'excellence.",
    longDesc: "Une maternité moderne dotée de blocs d'accouchement sécurisés, de chambres de travail équipées et d'échographes haute définition 3D/4D.",
    procedures: ["Suivi de grossesse & préparation à l'accouchement", "Échographie obstétricale 3D/4D", "Dépistage des cancers gynécologiques", "Chirurgie gynécologique mini-invasive", "Contraception & fertilité"],
    headDoctor: "Dr Philippe Moreau"
  },
  {
    id: "medecine-generale",
    name: "Médecine Générale & Interne",
    iconName: "Stethoscope",
    shortDesc: "Consultations polyvalentes, bilans de santé complets et médecine préventive.",
    longDesc: "La première ligne de soins pour toute la famille, coordonnant la prise en charge globale et l'orientation vers les spécialistes appropriés.",
    procedures: ["Bilan de santé annuel", "Dépistage métabolique (diabète, cholestérol)", "Prise en charge des maladies chroniques", "Certificats d'aptitude", "Vaccinations adultes"],
    headDoctor: "Dr Sarah Benali"
  },
  {
    id: "chirurgie",
    name: "Chirurgie Générale & Digestive",
    iconName: "ShieldAlert",
    shortDesc: "Blocs opératoires aux normes internationales et techniques cœlioscopiques.",
    longDesc: "Interventions programmées ou en urgence dans un environnement aseptique certifié, privilégiant la chirurgie ambulatoire et la récupération rapide.",
    procedures: ["Chirurgie cœlioscopique", "Chirurgie herniaire & viscérale", "Chirurgie ambulatoire", "Prise en charge des urgences chirurgicales", "Soins post-opératoires surveillés"],
    headDoctor: "Dr Eric Koffi"
  },
  {
    id: "ophtalmo",
    name: "Ophtalmologie",
    iconName: "Eye",
    shortDesc: "Explorations visuelles complètes et soins médico-chirurgicaux de l'œil.",
    longDesc: "Équipement de pointe pour la détection précoce du glaucome, des anomalies de la rétine et la correction de la réfraction.",
    procedures: ["Mesure de la réfraction & acuité", "Tonométrie & mesure pression oculaire", "Fond d'œil & OCT", "Dépistage de la rétinopathie", "Chirurgie de la cataracte"],
    headDoctor: "Dr Hélène Diallo"
  },
  {
    id: "imagerie",
    name: "Imagerie Médicale & Radiologie",
    iconName: "ScanLine",
    shortDesc: "Plateau d'imagerie numérique haute résolution pour des diagnostics précis et rapides.",
    longDesc: "Scanner multibarettes, radiographie numérisée, échographies générales et doppler avec interprétation immédiate par des radiologues seniors.",
    procedures: ["Scanner (Tomodensitométrie) corps entier", "Radiographie osseuse & pulmonaire numérisée", "Échographie générale, abdominale et thyroïdienne", "Doppler vasculaire", "Mammographie numérique"],
    headDoctor: "Dr Christian Bédié"
  },
  {
    id: "dentaire",
    name: "Odontologie & Stomatologie",
    iconName: "Smile",
    shortDesc: "Soins dentaires, orthodontie, implantologie et esthétique du sourire.",
    longDesc: "Fauteuils ergonomiques et protocoles rigoureux de désinfection pour préserver votre santé bucco-dentaire en toute sérénité.",
    procedures: ["Détartrage & soins conservateurs", "Implantologie dentaire", "Blanchiment dentaire médical", "Prothèses fixes & amovibles", "Urgences dentaires"],
    headDoctor: "Dr Vanessa Yao"
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr Jean-Marc Kouassi",
    specialtyId: "cardio",
    specialtyName: "Cardiologie",
    title: "Cardiologue Rythmologue · Chef de Service",
    experienceYears: 18,
    education: "Ancien Interne des Hôpitaux de Paris, Diplômé en Cardiologie Interventionnelle",
    languages: ["Français", "Anglais"],
    days: ["Lundi", "Mercredi", "Vendredi"],
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    availableNext: "Aujourd'hui à 15h30"
  },
  {
    id: "doc-2",
    name: "Dr Aminata Touré",
    specialtyId: "pediatrie",
    specialtyName: "Pédiatrie & Néonatalogie",
    title: "Pédiatre Urgentiste · Spécialiste Néonatale",
    experienceYears: 14,
    education: "Faculté de Médecine d'Abidjan, DU de Réanimation Néonatale (Bordeaux)",
    languages: ["Français", "Anglais", "Baoulé"],
    days: ["Mardi", "Jeudi", "Samedi"],
    avatarUrl: "https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&q=80&w=400",
    availableNext: "Demain à 09h00"
  },
  {
    id: "doc-3",
    name: "Dr Philippe Moreau",
    specialtyId: "gyneco",
    specialtyName: "Gynécologie - Obstétrique",
    title: "Chirurgien Gynécologue · Obstétricien",
    experienceYears: 20,
    education: "Université Libre de Bruxelles, Diplôme d'Échographie Fœtale Avancée",
    languages: ["Français", "Anglais"],
    days: ["Lundi", "Mardi", "Jeudi"],
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    availableNext: "Aujourd'hui à 17h00"
  },
  {
    id: "doc-4",
    name: "Dr Sarah Benali",
    specialtyId: "medecine-generale",
    specialtyName: "Médecine Générale",
    title: "Médecin Généraliste & Diabétologue",
    experienceYears: 11,
    education: "Faculté de Médecine de Montpellier, DU d'Éducation Thérapeutique",
    languages: ["Français", "Arabe", "Anglais"],
    days: ["Du Lundi au Vendredi"],
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    availableNext: "Aujourd'hui à 11h15"
  },
  {
    id: "doc-5",
    name: "Dr Eric Koffi",
    specialtyId: "chirurgie",
    specialtyName: "Chirurgie Générale & Digestive",
    title: "Chirurgien Viscéral · Chef du Bloc Opératoire",
    experienceYears: 16,
    education: "Centre Hospitalier Universitaire de Lyon, Spécialisation Cœlioscopie",
    languages: ["Français", "Anglais"],
    days: ["Mardi", "Mercredi", "Vendredi"],
    avatarUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    availableNext: "Mercredi à 10h30"
  },
  {
    id: "doc-6",
    name: "Dr Hélène Diallo",
    specialtyId: "ophtalmo",
    specialtyName: "Ophtalmologie",
    title: "Ophtalmologue Médico-Chirurgicale",
    experienceYears: 12,
    education: "Université Cheikh Anta Diop, DU de Chirurgie Réfractive (Paris)",
    languages: ["Français", "Anglais"],
    days: ["Lundi", "Mercredi", "Samedi"],
    avatarUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400",
    availableNext: "Jeudi à 14h00"
  },
  {
    id: "doc-7",
    name: "Dr Christian Bédié",
    specialtyId: "imagerie",
    specialtyName: "Imagerie Médicale & Radiologie",
    title: "Radiologue Interventionnel",
    experienceYears: 17,
    education: "CHU de Rennes, Spécialiste Imagerie Cardio-Thoracique & Scanner",
    languages: ["Français", "Anglais"],
    days: ["Du Lundi au Vendredi"],
    avatarUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    availableNext: "Aujourd'hui à 14h15"
  },
  {
    id: "doc-8",
    name: "Dr Vanessa Yao",
    specialtyId: "dentaire",
    specialtyName: "Odontologie & Soins Dentaires",
    title: "Chirurgien-Dentiste · Esthétique & Prothèse",
    experienceYears: 9,
    education: "UFR d'Odonto-Stomatologie d'Abidjan, Certificat d'Implantologie",
    languages: ["Français", "Anglais"],
    days: ["Lundi", "Mardi", "Jeudi", "Vendredi"],
    avatarUrl: "https://images.unsplash.com/photo-1594824813583-a442750a9829?auto=format&fit=crop&q=80&w=400",
    availableNext: "Demain à 11h30"
  }
];

export const SERVICES: ClinicService[] = [
  {
    id: "urgences",
    title: "Urgences 24/7 & Réanimation",
    icon: "Ambulance",
    description: "Une équipe médicale d'urgence prête à intervenir jour et nuit avec lit de déchocage, monitorage haute intensité et flotte d'ambulances médicalisées.",
    schedule: "24 heures sur 24, 7 jours sur 7 sans interruption",
    badge: "Permanence 24/7"
  },
  {
    id: "laboratoire",
    title: "Laboratoire d'Analyses Médicales",
    icon: "FlaskConical",
    description: "Automates d'hématologie, biochimie, sérologie et microbiologie permettant la délivrance de résultats fiables en moins de 2 heures pour les bilans urgents.",
    schedule: "06h30 - 20h00 (Urgences en continu 24/7)"
  },
  {
    id: "hospitalisation",
    title: "Pôle Hospitalisation & Suites",
    icon: "BedDouble",
    description: "Chambres individuelles climatisées, suites VIP, lits médicalisés ergonomiques, sonnette infirmière connectée et restauration diététique supervisée.",
    schedule: "Visites quotidiennes de 13h00 à 15h00 et 18h00 à 20h00"
  },
  {
    id: "maternite",
    title: "Maternité & Pôle Mère-Enfant",
    icon: "HeartHandshake",
    description: "Salles de travail chaleureuses, réanimation néonatale attenante, monitoring foetal sans fil et accompagnement personnalisé par des sages-femmes dévouées.",
    schedule: "Permanence obstétricale 24/7"
  },
  {
    id: "imagerie-service",
    title: "Imagerie & Scanner Numérique",
    icon: "Scan",
    description: "Plateau d'imagerie moderne équipé d'un scanner 64 coupes, radiologie numérique capteur plan, ostéodensitométrie et échographes doppler couleur.",
    schedule: "07h30 - 19h00 (Gardes de nuit sur appel d'urgence)"
  },
  {
    id: "pharmacie",
    title: "Pharmacie Hospitalière Intégrée",
    icon: "Pill",
    description: "Dispensation immédiate des médicaments prescrits lors des consultations ou de l'hospitalisation, garantissant traçabilité et authenticité rigoureuse.",
    schedule: "Accessible aux patients 24h/24"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Excellence Médicale & Éthique",
    description: "Des praticiens formés dans les plus grands centres hospitaliers internationaux, guidés par la bienveillance et le serment d'Hippocrate."
  },
  {
    title: "Plateau Technique Innovant",
    description: "Des blocs opératoires à flux laminaire, un scanner haute résolution et des équipements biomédicaux soumis à une maintenance certifiée."
  },
  {
    title: "Prise en Charge Sans Délai",
    description: "Un parcours patient optimisé pour réduire au maximum le temps d'attente et garantir un accueil digne et chaleureux."
  },
  {
    title: "Conventionnement Assurances",
    description: "Partenaire de plus de 20 compagnies d'assurance nationales et internationales pour une prise en charge directe de vos soins en tiers payant."
  }
];

export const KEY_STATS = [
  { value: "25 000+", label: "Patients soignés chaque année", subtext: "Prise en charge personnalisée" },
  { value: "35+", label: "Médecins & Chirurgiens spécialistes", subtext: "Équipe pluridisciplinaire" },
  { value: "24/7", label: "Permanence Urgences Médicales", subtext: "365 jours par an" },
  { value: "98.4%", label: "Taux de satisfaction patients", subtext: "Audit qualité certifié" }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    author: "Mme Clarisse K.",
    city: "Abidjan, Cocody",
    rating: 5,
    department: "Maternité & Gynécologie",
    comment: "J'ai accouché de mon deuxième enfant à la Clinique Le Grand Centre. L'équipe médicale a été d'une douceur et d'un professionnalisme remarquables. Les chambres sont impeccables et rassurantes.",
    date: "Il y a 2 semaines"
  },
  {
    id: "t2",
    author: "M. Marc-Antoine D.",
    city: "Abidjan, Plateau",
    rating: 5,
    department: "Cardiologie",
    comment: "Pris en charge en urgence suite à un malaise cardiaque. La réactivité du Dr Kouassi et de l'équipe de réanimation a été salvatrice. Le plateau technique n'a rien à envier aux cliniques européennes.",
    date: "Il y a 1 mois"
  },
  {
    id: "t3",
    author: "Mme Fatou S.",
    city: "Grand-Bassam",
    rating: 5,
    department: "Pédiatrie",
    comment: "Le Dr Touré est une pédiatre exceptionnelle qui prend le temps d'écouter les parents et de rassurer les enfants. La prise de rendez-vous en ligne m'a évité toute attente inutile.",
    date: "Il y a 3 semaines"
  }
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "Hypertension artérielle : 5 gestes quotidiens pour protéger son cœur",
    category: "Cardiologie & Prévention",
    date: "04 Octobre 2026",
    readTime: "4 min de lecture",
    excerpt: "L'hypertension est souvent silencieuse mais peut être prévenue efficacement par des ajustements nutritionnels et une activité physique mesurée.",
    content: "L'hypertension artérielle (HTA) représente un facteur de risque majeur pour les accidents vasculaires cérébraux et l'infarctus du myocarde. À la Clinique Le Grand Centre, notre département de cardiologie rappelle les 5 piliers préventifs : 1. Réduire l'apport en sel à moins de 5g par jour ; 2. Pratiquer 30 minutes de marche rapide quotidienne ; 3. Contrôler régulièrement sa tension à domicile ; 4. Limiter la consommation de tabac et d'alcool ; 5. Gérer le stress grâce au sommeil régulier et à des exercices de respiration. En cas de doute, prenez rendez-vous pour un Holter tensionnel.",
    author: "Dr Jean-Marc Kouassi"
  },
  {
    id: "art-2",
    title: "Préparer l'arrivée de bébé : le guide du suivi prénatal au Grand Centre",
    category: "Maternité & Bien-être",
    date: "28 Septembre 2026",
    readTime: "5 min de lecture",
    excerpt: "De l'échographie du premier trimestre aux séances d'accompagnement à l'allaitement, découvrez les étapes clés d'une grossesse sereine.",
    content: "Une grossesse harmonieuse repose sur un accompagnement médical et émotionnel constant. Notre pôle mère-enfant propose un parcours sur-mesure comprenant des bilans biologiques réguliers, des échographies 3D/4D permettant d'observer en détail le développement fœtal, ainsi que des ateliers de préparation à l'accouchement animés par nos sages-femmes. La maternité dispose également d'un bloc d'urgence obstétricale immédiatement disponible 24h/24.",
    author: "Dr Philippe Moreau"
  },
  {
    id: "art-3",
    title: "Vaccination infantile : calendrier et recommandations officielles",
    category: "Pédiatrie",
    date: "15 Septembre 2026",
    readTime: "3 min de lecture",
    excerpt: "Protéger les nourrissons contre les infections respiratoires et bactériennes dès leurs premiers mois de vie grâce à un calendrier vaccinal à jour.",
    content: "La vaccination est le moyen le plus efficace et éprouvé de protéger les enfants contre des pathologies potentiellement graves. À la Clinique Le Grand Centre, nous veillons au strict respect de la chaîne du froid et accompagnons les parents avec un carnet de santé numérique. Nos pédiatres examinent chaque enfant avant toute injection afin de garantir une tolérance optimale.",
    author: "Dr Aminata Touré"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Rendez-vous",
    question: "Comment prendre rendez-vous à la Clinique Le Grand Centre ?",
    answer: "Vous pouvez réserver directement en ligne sur ce site en moins de 2 minutes via notre formulaire interactif, ou nous appeler directement au +225 27 22 55 00 00. Vous pouvez également nous contacter par WhatsApp pour une réservation instantanée."
  },
  {
    id: "faq-2",
    category: "Urgences",
    question: "Le service des urgences est-il ouvert la nuit et les jours fériés ?",
    answer: "Oui, notre service d'urgences médico-chirurgicales est ouvert 24 heures sur 24, 7 jours sur 7, y compris les week-ends et tous les jours fériés. Des médecins urgentistes, anesthésistes et infirmiers sont en garde permanente sur place."
  },
  {
    id: "faq-3",
    category: "Assurances",
    question: "Quelles assurances et mutuelles acceptez-vous en tiers payant ?",
    answer: "Nous sommes conventionnés avec les principales compagnies d'assurance ivoiriennes et internationales : Ascoma, Sanlam, Sunu Assurances, Saham, Cigna Global, Allianz, MSH International, AXA, GMC Henner et bien d'autres. Présentez simplement votre carte d'assuré en cours de validité à l'accueil."
  },
  {
    id: "faq-4",
    category: "Consultation",
    question: "Quels documents dois-je apporter lors de ma première consultation ?",
    answer: "Pensez à vous munir d'une pièce d'identité officielle, de votre carnet de santé ou dossier médical antérieur (ordonnances récentes, résultats d'analyses, compte-rendus de scanner ou radiographies) ainsi que de votre carte d'assurance si vous bénéficiez d'une prise en charge."
  },
  {
    id: "faq-5",
    category: "Laboratoire",
    question: "En combien de temps puis-je obtenir mes résultats d'analyses médicales ?",
    answer: "Pour les analyses courantes (NFS, glycémie, créatinine, tests rapides), les résultats sont disponibles en moins de 2 heures. Vous pouvez les récupérer à l'accueil du laboratoire ou les recevoir de manière sécurisée par email ou WhatsApp."
  },
  {
    id: "faq-6",
    category: "Accès & Parking",
    question: "La clinique dispose-t-elle d'un parking sécurisé ?",
    answer: "Oui, la clinique dispose d'un parking privé sécurisé de plus de 80 places, surveillé 24h/24, avec un accès direct dédié pour les ambulances et personnes à mobilité réduite."
  }
];

export const INSURANCE_PARTNERS = [
  "Ascoma", "Sanlam", "Sunu Assurances", "Saham", "Allianz", "MSH International", "Cigna", "AXA Côte d'Ivoire", "GMC Henner", "Gras Savoye"
];
