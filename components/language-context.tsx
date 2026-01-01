"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "pt" | "es" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero
    heroTagline: "Global Digital Presence",
    heroDescription:
      "As our communities grow, so does the need for a strong and faithful digital presence. We pray this effort may move your heart and soul, allowing us to do more for those in need and to bring light in this time of apostasy.",
    tagline: "The Only Authentic Catholic Position for a Time of Apostasy.",
    domRodrigoTagline: "This project is led by Dom Rodrigo da Silva",
    donateNow: "Donate Now",

    // Digital Structure
    digitalStructureTitle: "Our Future Digital Structure",
    digitalStructureIntro:
      "We are building a modern, unified digital presence to strengthen our communities worldwide. Every component will be built with care, using modern technology to serve the True Faith and support our clergy and faithful.",

    websiteTitle: "Website",
    websiteDesc1: "Custom-made platform built with modern technology",
    websiteDesc2: "Feature-rich environment to share updates, events, sermons, and Catholic resources",
    websiteDesc3: "Designed to enrich faith and connect communities worldwide",

    storeTitle: "Store",
    storeDesc1: "Complete online store with full admin capabilities",
    storeDesc2: "Manage orders, users, inventory, shipping",
    storeDesc3: "Modern checkout with related products, bump offers, and delivery integrations",

    aiChatTitle: "AI Chat – Faith Answers",
    aiChatDesc1: "Portal hub with a curated traditional Catholic knowledge base",
    aiChatDesc2: "Users can interact with AI to understand traditional Catholicism",
    aiChatDesc3: "Clarifies the crisis in the Church and offers guidance rooted in the Faith",

    socialTitle: "Social Media Presence",
    socialDesc1: "Consistent publishing across platforms",
    socialDesc2: "Evangelization, updates, and global outreach",

    // Funding
    fundingTitle: "Help Us Build This Mission",
    fundingIntro:
      "This mission can only move forward through the generosity of the faithful. You may support us with a one-time gift today, and if you wish, become a monthly supporter in the future. Every contribution—large or small—directly builds and sustains this digital apostolate.",

    setupCosts: "Setup Costs",
    phase1SetupCosts: "Phase 1: Setup Costs",
    setupCostsDesc:
      "Full foundational infrastructure for our Website, E-commerce system, and Faith Answers AI Portal — covering custom development, hosting architecture, payment processing setup, user management, security layers, email systems, content delivery, and all essential tools required to launch our digital apostolate.",
    maintenanceCosts: "Maintenance Costs",
    maintenanceDesc: "Content creation, social media, support, operations",
    maintenanceNote: "Maintenance contributions will begin once the infrastructure is launched.",
    goalLabel: "Goal",

    progressTitle: "Progress Toward Our Goal",
    raised: "Raised",
    goal: "Goal",

    oneTimeDonation: "One-Time Donation",
    monthlyDonation: "Monthly Supporter",
    selectAmount: "Select Amount",
    customAmount: "Custom Amount",
    currency: "Currency",
    proceedToCheckout: "Proceed to Checkout",
    backToOptions: "← Back to options",
    choosePaymentMethod: "Choose Payment Method",
    selectPaymentMethod: "Select how you would like to make your donation of",
    creditCard: "Credit Card",
    backToPaymentMethods: "← Back to payment methods",
    paymentConfirmed: "Payment Confirmed!",
    thankYouDonation: "Thank you for your generous donation to CatholicVacante.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faq1Question: "Who is leading this project?",
    faq1Answer:
      "This project is overseen by Dom Rodrigo da Silva, under his spiritual direction and with full authorization.",

    faq2Question: "What is the purpose of this initiative?",
    faq2Answer:
      "We believe that only the traditional Catholic position — especially the sedevacante understanding — provides clarity and peace in today's crisis within the Church. Our communities urgently need a strong digital presence to unify the faithful, protect our clergy from unjust attacks, and offer guidance to those still confused by modernist errors. This project is meant to be both a shield and a light.",

    faq3Question: "How can I verify the legitimacy of this project?",
    faq3Answer:
      "For help in English:\n• Email: Jener@duobro.com\n• WhatsApp: +1 (786) 414-2643\n\nFor help in Spanish or Portuguese:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",

    // Footer
    copyright: "©Sedevacante — All Rights Reserved",
  },
  pt: {
    // Hero
    heroTagline: "Presença Digital Global",
    heroDescription:
      "Conforme nossas comunidades crescem, cresce também a necessidade de uma forte e fiel presença digital. Oramos para que esse esforço toque seu coração e alma, permitindo-nos fazer mais pelos necessitados e trazer luz em tempos de apostasia.",
    tagline: "A Única Posição Católica Autêntica para um Tempo de Apostasia.",
    domRodrigoTagline: "Este projeto é liderado por Dom Rodrigo da Silva",
    donateNow: "Doe Agora",

    // Digital Structure
    digitalStructureTitle: "Nossa Futura Estrutura Digital",
    digitalStructureIntro:
      "Estamos construindo uma presença digital moderna e unificada para fortalecer nossas comunidades em todo o mundo. Cada componente será construído com cuidado, usando tecnologia moderna para servir a Verdadeira Fé e apoiar nosso clero e fiéis.",

    websiteTitle: "Website",
    websiteDesc1: "Plataforma personalizada construída com tecnologia moderna",
    websiteDesc2: "Ambiente rico em recursos para compartilhar atualizações, eventos, sermões e recursos católicos",
    websiteDesc3: "Projetado para enriquecer a fé e conectar comunidades em todo o mundo",

    storeTitle: "Loja",
    storeDesc1: "Loja online completa com recursos administrativos completos",
    storeDesc2: "Gerenciar pedidos, usuários, inventário, envio",
    storeDesc3: "Checkout moderno com produtos relacionados, ofertas adicionais e integrações de entrega",

    aiChatTitle: "Chat IA – Respostas da Fé",
    aiChatDesc1: "Portal hub com uma base de conhecimento católica tradicional curada",
    aiChatDesc2: "Os usuários podem interagir com IA para entender o catolicismo tradicional",
    aiChatDesc3: "Esclarece a crise na Igreja e oferece orientação enraizada na Fé",

    socialTitle: "Presença nas Redes Sociais",
    socialDesc1: "Publicação consistente em todas as plataformas",
    socialDesc2: "Evangelização, atualizações e alcance global",

    // Funding
    fundingTitle: "Ajude-nos a Construir Esta Missão",
    fundingIntro:
      "Esta missão só pode avançar através da generosidade dos fiéis. Você pode nos apoiar com uma doação única hoje e, se desejar, tornar-se um apoiador mensal no futuro. Cada contribuição—grande ou pequena—constrói e sustenta diretamente este apostolado digital.",

    setupCosts: "Custos de Instalação",
    phase1SetupCosts: "Fase 1: Custos de Instalação",
    setupCostsDesc:
      "Infraestrutura completa para nosso Website, sistema de E-commerce e Portal de IA Respostas da Fé — incluindo desenvolvimento personalizado, arquitetura de hospedagem, configuração de processamento de pagamentos, gerenciamento de usuários, camadas de segurança, sistemas de e-mail, entrega de conteúdo e todas as ferramentas essenciais para lançar nosso apostolado digital.",
    maintenanceCosts: "Custos de Manutenção",
    maintenanceDesc: "Criação de conteúdo, redes sociais, suporte, operações",
    maintenanceNote: "As contribuições de manutenção começarão assim que a infraestrutura for lançada.",
    goalLabel: "Meta",

    progressTitle: "Progresso em Direção à Nossa Meta",
    raised: "Arrecadado",
    goal: "Meta",

    oneTimeDonation: "Doação Única",
    monthlyDonation: "Apoiador Mensal",
    selectAmount: "Selecione o Valor",
    customAmount: "Valor Personalizado",
    currency: "Moeda",
    proceedToCheckout: "Prosseguir para o Checkout",
    backToOptions: "← Voltar às opções",
    choosePaymentMethod: "Escolha o Método de Pagamento",
    selectPaymentMethod: "Selecione como deseja fazer sua doação de",
    creditCard: "Cartão de Crédito",
    backToPaymentMethods: "← Voltar aos métodos de pagamento",
    paymentConfirmed: "Pagamento Confirmado!",
    thankYouDonation: "Obrigado pela sua generosa doação ao CatholicVacante.",

    // FAQ
    faqTitle: "Perguntas Frequentes",
    faq1Question: "Quem está liderando este projeto?",
    faq1Answer:
      "Este projeto é supervisionado por Dom Rodrigo da Silva, sob sua direção espiritual e com total autorização.",

    faq2Question: "Qual é o propósito desta iniciativa?",
    faq2Answer:
      "Acreditamos que apenas a posição católica tradicional — especialmente a compreensão sedevacantista — proporciona clareza e paz na crise atual dentro da Igreja. Nossas comunidades precisam urgentemente de uma forte presença digital para unificar os fiéis, proteger nosso clergé de ataques injustos e oferecer orientação àqueles ainda confusos pelos erros modernistas. Este projeto pretende ser tanto um escudo quanto uma luz.",

    faq3Question: "Como posso verificar a legitimidade deste projeto?",
    faq3Answer:
      "Para ajuda em inglês:\n• Email: Jener@duobro.com\n• WhatsApp: +1 (786) 414-2643\n\nPara ajuda em espanhol ou português:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",

    // Footer
    copyright: "©Sedevacante — Todos os Direitos Reservados",
  },
  es: {
    // Hero
    heroTagline: "Presencia Digital Global",
    heroDescription:
      "Conforme nuestras comunidades crecen, también crece la necesidad de una fuerte y fiel presencia digital. Oramos para que este esfuerzo toque su corazón y alma, permitiéndonos hacer más por los necesitados y traer luz en este tiempo de apostasía.",
    tagline: "La Única Posición Católica Auténtica para un Tiempo de Apostasía.",
    domRodrigoTagline: "Este proyecto es liderado por Dom Rodrigo da Silva",
    donateNow: "Donar Ahora",

    // Digital Structure
    digitalStructureTitle: "Nuestra Futura Estructura Digital",
    digitalStructureIntro:
      "Estamos construyendo una presencia digital moderna y unificada para fortalecer nuestras comunidades en todo el mundo. Cada componente será construido con cuidado, utilizando tecnología moderna para servir a la Verdadera Fe y apoyar a nuestro clergé y fieles.",

    websiteTitle: "Sitio Web",
    websiteDesc1: "Plataforma personalizada construida con tecnología moderna",
    websiteDesc2: "Entorno rico en funciones para compartir actualizaciones, eventos, sermones y recursos católicos",
    websiteDesc3: "Diseñado para enriquecer la fe y conectar comunidades en todo el mundo",

    storeTitle: "Tienda",
    storeDesc1: "Tienda en línea completa con capacidades de administración completas",
    storeDesc2: "Gestionar pedidos, usuarios, inventario, envío",
    storeDesc3: "Checkout moderno con productos relacionados, ofertas adicionales e integraciones de entrega",

    aiChatTitle: "Chat IA – Respuestas de Fe",
    aiChatDesc1: "Portal hub con una base de conocimiento católico tradicional curada",
    aiChatDesc2: "Los usuarios pueden interactuar con IA para entender el catolicismo tradicional",
    aiChatDesc3: "Aclara la crisis en la Iglesia y ofrece orientación arraigada en la Fe",

    socialTitle: "Presencia en Redes Sociales",
    socialDesc1: "Publicación consistente en todas las plataformas",
    socialDesc2: "Evangelización, actualizaciones y alcance global",

    // Funding
    fundingTitle: "Ayúdanos a Construir Esta Misión",
    fundingIntro:
      "Esta misión solo puede avanzar gracias a la generosidad de los fieles. Puede apoyarnos con una donación única hoy y, si lo desea, convertirse en un donante mensual en el futuro. Cada contribución—grande o pequeña—construye y sostiene directamente este apostolado digital.",

    setupCosts: "Costos de Instalación",
    phase1SetupCosts: "Fase 1: Costos de Instalación",
    setupCostsDesc:
      "Infraestructura completa para nuestro Sitio Web, sistema de E-commerce y Portal de IA Respuestas de Fe — incluyendo desarrollo personalizado, arquitectura de alojamiento, configuración de procesamiento de pagos, gestión de usuarios, capas de seguridad, sistemas de correo electrónico, entrega de contenido y todas las herramientas esenciales para lanzar nuestro apostolado digital.",
    maintenanceCosts: "Costos de Mantenimiento",
    maintenanceDesc: "Creación de contenido, redes sociales, soporte, operaciones",
    maintenanceNote: "Las contribuciones de mantenimiento comenzarán una vez que se lance la infraestructura.",
    goalLabel: "Meta",

    progressTitle: "Progreso Hacia Nuestra Meta",
    raised: "Recaudado",
    goal: "Meta",

    oneTimeDonation: "Donación Única",
    monthlyDonation: "Donante Mensual",
    selectAmount: "Seleccionar Cantidad",
    customAmount: "Cantidad Personalizada",
    currency: "Moneda",
    proceedToCheckout: "Proceder al Checkout",
    backToOptions: "← Volver a opciones",
    choosePaymentMethod: "Elegir Método de Pago",
    selectPaymentMethod: "Seleccione cómo desea hacer su donación de",
    creditCard: "Tarjeta de Crédito",
    backToPaymentMethods: "← Volver a métodos de pago",
    paymentConfirmed: "¡Pago Confirmado!",
    thankYouDonation: "Gracias por su generosa donación a CatholicVacante.",

    // FAQ
    faqTitle: "Preguntas Frecuentes",
    faq1Question: "¿Quién lidera este proyecto?",
    faq1Answer:
      "Este proyecto es supervisado por Dom Rodrigo da Silva, bajo su dirección espiritual y con plena autorización.",

    faq2Question: "¿Cuál es el propósito de esta iniciativa?",
    faq2Answer:
      "Creemos que solo la posición católica tradicional — especialmente la comprensión sedevacantista — proporciona claridad y paz en la crisis actual dentro de la Iglesia. Nuestras comunidades necesitan urgentemente de una fuerte presencia digital para unificar a los fieles, proteger a nuestro clero de ataques injustos y ofrecer orientación a aquellos todavía confusos por los errores modernistas. Este proyecto pretende ser tanto un escudo como una luz.",

    faq3Question: "¿Cómo puedo verificar la legitimidad de este proyecto?",
    faq3Answer:
      "Para ayuda en inglés:\n• Email: Jener@duobro.com\n• WhatsApp: +1 (786) 414-2643\n\nPara ayuda en español o português:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",

    // Footer
    copyright: "©Sedevacante — Todos los Dereitos Reservados",
  },
  fr: {
    // Hero
    heroTagline: "Présence Numérique Mondiale",
    heroDescription:
      "Alors que nos communautés grandissent, le besoin d'une présence numérique forte et fidèle grandit également. Nous prions pour que cet effort touche votre cœur et votre âme, nous permettant d'en faire plus pour ceux dans le besoin et d'apporter la lumière en ce temps d'apostasie.",
    tagline: "La Seule Position Catholique Authentique pour un Temps d'Apostasie.",
    domRodrigoTagline: "Ce projet est dirigé par Dom Rodrigo da Silva",
    donateNow: "Faire un Don",

    // Digital Structure
    digitalStructureTitle: "Notre Future Structure Numérique",
    digitalStructureIntro:
      "Nous construisons une présence numérique moderne et unifiée pour renforcer nos communautés dans le monde entier. Chaque composant sera construit avec soin, en utilisant une technologie moderne pour servir la Vraie Foi et soutenir notre clergé et nos fidèles.",

    websiteTitle: "Site Web",
    websiteDesc1: "Plateforme personnalisée construite avec une technologie moderne",
    websiteDesc2:
      "Environnement riche en fonctionnalités pour partager des mises à jour, des événements, des sermons et des ressources catholiques",
    websiteDesc3: "Conçu pour enrichir la foi et connecter les communautés du monde entier",

    storeTitle: "Boutique",
    storeDesc1: "Boutique en ligne complète avec des capacités d'administration complètes",
    storeDesc2: "Gérer les commandes, les utilisateurs, l'inventaire, l'expédition",
    storeDesc3:
      "Checkout moderne avec des produits connexes, des offres supplémentaires et des intégrations de livraison",

    aiChatTitle: "Chat IA – Réponses de Foi",
    aiChatDesc1: "Portail hub avec une base de connaissances catholiques traditionnelles curatées",
    aiChatDesc2: "Les utilisateurs peuvent interagir avec l'IA pour comprendre le catholicisme traditionnel",
    aiChatDesc3: "Clarifie la crise dans l'Église et offre des conseils enracinés dans la Foi",

    socialTitle: "Présence sur les Réseaux Sociaux",
    socialDesc1: "Publication cohérente sur toutes les plateformes",
    socialDesc2: "Évangélisation, mises à jour et portée mondiale",

    // Funding
    fundingTitle: "Aidez-nous à Construire Cette Mission",
    fundingIntro:
      "Cette mission ne peut avancer que grâce à la générosité des fidèles. Vous pouvez nous soutenir avec un don unique aujourd'hui et, si vous le souhaitez, devenir un donateur mensuel à l'avenir. Chaque contribution—grande ou petite—construit et soutient directamente cet apostolat numérique.",

    setupCosts: "Coûts d'Installation",
    phase1SetupCosts: "Phase 1: Coûts d'Installation",
    setupCostsDesc:
      "Infrastructure complète pour notre Site Web, système E-commerce et Portail IA Réponses de Foi — incluant le développement personnalisé, l'architecture d'hébergement, la configuration du traitement des paiements, la gestion des utilisateurs, les couches de sécurité, les systèmes de messagerie, la livraison de contenu et tous les outils essentiels pour lancer notre apostolat numérique.",
    maintenanceCosts: "Coûts de Maintenance",
    maintenanceDesc: "Création de contenu, réseaux sociaux, support, opérations",
    maintenanceNote: "Les contributions de maintenance commenceront une fois l'infrastructure lancée.",
    goalLabel: "Objectif",

    progressTitle: "Progression Vers Notre Objectif",
    raised: "Collecté",
    goal: "Objectif",

    oneTimeDonation: "Don Unique",
    monthlyDonation: "Donateur Mensuel",
    selectAmount: "Sélectionner le Montant",
    customAmount: "Montant Personnalisé",
    currency: "Devise",
    proceedToCheckout: "Procéder au Checkout",
    backToOptions: "← Retour aux options",
    choosePaymentMethod: "Choisir le Mode de Paiement",
    selectPaymentMethod: "Sélectionnez comment vous souhaitez faire votre don de",
    creditCard: "Carte de Crédit",
    backToPaymentMethods: "← Retour aux modes de paiement",
    paymentConfirmed: "Paiement Confirmé!",
    thankYouDonation: "Merci pour votre généreuse donation à CatholicVacante.",

    // FAQ
    faqTitle: "Questions Fréquentes",
    faq1Question: "Qui dirige ce projet?",
    faq1Answer:
      "Ce projet est supervisé par Dom Rodrigo da Silva, sous sa direction spirituelle et avec pleine autorisation.",

    faq2Question: "Quel est le but de cette initiative?",
    faq2Answer:
      "Nous croyons que seule la position catholique traditionnelle — en particulier la compréhension sédévacantiste — apporte clarté et paix dans la crise actuelle au sein de l'Église. Nos communautés ont un besoin urgent d'une forte présence numérique pour unifier les fidèles, protéger notre clergé des attaques injustes et offrir des conseils à ceux qui sont encore confus par les erreurs modernistes. Ce projet se veut à la fois un bouclier et une lumière.",

    faq3Question: "Comment puis-je vérifier la légitimité de ce projet?",
    faq3Answer:
      "Pour de l'aide en anglais:\n• Email: Jener@duobro.com\n• WhatsApp: +1 (786) 414-2643\n\nPour de l'aide en espagnol ou português:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",

    // Footer
    copyright: "©Sedevacante — Tous Droits Réservés",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Try to detect language from browser
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("pt")) {
      setLanguage("pt")
    } else if (browserLang.startsWith("es")) {
      setLanguage("es")
    } else if (browserLang.startsWith("fr")) {
      setLanguage("fr")
    }
  }, [])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
