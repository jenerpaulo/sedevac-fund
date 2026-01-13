"use client"

import type React from "react"

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
    websiteStatus: "Status: in progress",
    websiteViewLink: "View here",
    storeStatus: "Status: in progress",
    storeViewLink: "View here",
    aiChatStatus: "Status: planned",
    socialStatus: "Status: planned",

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
    donateForPhase1: "Donate for Phase 1",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    faq1Question: "Who is leading this project?",
    faq1Answer:
      "This project is overseen by Dom Rodrigo da Silva, under his spiritual direction and with full authorization.",
    faq2Question: "Why is this project important?",
    faq2Answer:
      "We believe that only the traditional Catholic position — especially the sedevacante understanding — provides clarity and peace in today's crisis within the Church. Our communities urgently need a strong digital presence to unify the faithful, protect our clergy from unjust attacks, and offer guidance to those still confused by modernist errors. This project is meant to be both a shield and a light.",
    faq3Question: "How can I get help?",
    faq3Answer:
      "For help in English:\n• Email: Jener@duobro.com.br\n• WhatsApp: +1 (786) 414-2643\n\nFor help in Spanish or Portuguese:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",
    copyright: "Copyright © 2026 FundSedevacante",
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
    websiteStatus: "Status: em progresso",
    websiteViewLink: "Ver aqui",
    storeStatus: "Status: em progresso",
    storeViewLink: "Ver aqui",
    aiChatStatus: "Status: planejado",
    socialStatus: "Status: planejado",

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
    donateForPhase1: "Doe para a Fase 1",

    // FAQ
    faqTitle: "Perguntas Frequentes",
    faq1Question: "Quem está liderando este projeto?",
    faq1Answer:
      "Este projeto é supervisionado por Dom Rodrigo da Silva, sob sua direção espiritual e com autorização total.",
    faq2Question: "Por que este projeto é importante?",
    faq2Answer:
      "Acreditamos que apenas a posição católica tradicional — especialmente o entendimento sedevacantista — oferece clareza e paz na crise atual da Igreja. Nossas comunidades precisam urgentemente de uma forte presença digital para unificar os fiéis, proteger nosso clergé de ataques injustos e oferecer orientação aos ainda confusos com erros modernistas. Este projeto visa ser tanto um escudo quanto uma luz.",
    faq3Question: "Como posso obter ajuda?",
    faq3Answer:
      "Para ajuda em inglês:\n• Email: Jener@duobro.com.br\n• WhatsApp: +1 (786) 414-2643\n\nPara ajuda em espanhol ou português:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",
    copyright: "Copyright © 2026 FundSedevacante",
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
    websiteStatus: "Estado: en progreso",
    websiteViewLink: "Ver aquí",
    storeStatus: "Estado: en progreso",
    storeViewLink: "Ver aquí",
    aiChatStatus: "Estado: planificado",
    socialStatus: "Estado: planificado",

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
      "Infraestructura completa para nuestro Sitio Web, sistema de E-commerce y Portal de IA Respuestas de Fe — incluyendo desarrollo personalizado, arquitectura de alojamiento, configuración de procesamiento de pagamentos, gestión de usuarios, capas de seguridad, sistemas de correo electrónico, entrega de contenido y todas las herramientas esenciales para lanzar nuestro apostolado digital.",
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
    donateForPhase1: "Doe para la Fase 1",

    // FAQ
    faqTitle: "Preguntas Frecuentes",
    faq1Question: "¿Quién está liderando este proyecto?",
    faq1Answer:
      "Este proyecto está supervisado por Dom Rodrigo da Silva, bajo su dirección espiritual y con autorización total.",
    faq2Question: "¿Por qué es importante este proyecto?",
    faq2Answer:
      "Creemos que solo la posición católica tradicional — especialmente el entendimiento sedevacantista — proporciona clareza y paz en la crisis actual de la Iglesia. Nuestras comunidades necesitan urgentemente una fuerte presencia digital para unificar a los fieles, proteger a nuestro clergé de ataques injustos y ofrecer orientación a aquellos aún confundidos por los errores modernistas. Este proyecto es diseñado para ser tanto un escudo como una luz.",
    faq3Question: "¿Cómo puedo obtener ayuda?",
    faq3Answer:
      "Para ayuda en inglés:\n• Email: Jener@duobro.com.br\n• WhatsApp: +1 (786) 414-2643\n\nPara ayuda en español o português:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",
    copyright: "Copyright © 2026 FundSedevacante",
  },
  fr: {
    // Hero
    heroTagline: "Présence Numérique Mondiale",
    heroDescription:
      "Tout en nous développant, la nécessité d'une présence numérique forte et fidèle augmente. Nous prions que cet effort touche votre cœur et votre âme, nous permettant de faire plus pour ceux qui en ont besoin et de briller dans cette époque d'apostasie.",
    tagline: "La Position Catholique Authentique et Unique pour une Époque d'Apostasie.",
    domRodrigoTagline: "Ce projet est dirigé par Dom Rodrigo da Silva",
    donateNow: "Donnez Maintenant",

    // Digital Structure
    digitalStructureTitle: "Notre Structure Numérique Future",
    digitalStructureIntro:
      "Nous construisons une présence numérique moderne et unifiée pour renforcer nos communautés à travers le monde. Chaque composant sera construit avec soin, en utilisant des technologies modernes pour servir la Véritable Foi et soutenir notre clergé et nos fidèles.",
    websiteStatus: "Statut: en cours",
    websiteViewLink: "Voir ici",
    storeStatus: "Statut: en cours",
    storeViewLink: "Voir ici",
    aiChatStatus: "Statut: prévu",
    socialStatus: "Statut: prévu",

    websiteTitle: "Site Web",
    websiteDesc1: "Plateforme personnalisée construite avec des technologies modernes",
    websiteDesc2:
      "Environnement riche en fonctionnalités pour partager des mises à jour, des événements, des sermons et des ressources catholiques",
    websiteDesc3: "Conçu pour enrichir la foi et connecter les communautés à travers le monde",

    storeTitle: "Boutique",
    storeDesc1: "Boutique en ligne complète avec des capacités d'administration complètes",
    storeDesc2: "Gérer les commandes, les utilisateurs, l'inventaire, l'expédition",
    storeDesc3:
      "Checkout moderne avec des produits connexes, des offres supplémentaires et des intégrations de livraison",

    aiChatTitle: "Chat IA – Réponses de la Foi",
    aiChatDesc1: "Portail central avec une base de connaissances catholiques traditionnelles curée",
    aiChatDesc2: "Les utilisateurs peuvent interagir avec l'IA pour comprendre le catholisme traditionnel",
    aiChatDesc3: "Clarifie la crise dans l'Église et offre des conseils enracinés dans la Foi",

    socialTitle: "Présence sur les Réseaux Sociaux",
    socialDesc1: "Publication cohérente sur toutes les plateformes",
    socialDesc2: "Évangélisation, mises à jour et diffusion mondiale",

    // Funding
    fundingTitle: "Aidez-nous à Construire Cette Mission",
    fundingIntro:
      "Cette mission ne peut avancer que grâce à la générosité des fidèles. Vous pouvez nous soutenir avec un don unique aujourd'hui et, si vous le souhaitez, devenir un souteneur mensuel à l'avenir. Chaque contribution—grande ou petite—construit et soutient directement cet apostolat numérique.",
    setupCosts: "Coûts d'Installation",
    phase1SetupCosts: "Phase 1: Coûts d'Installation",
    setupCostsDesc:
      "Infrastructure complète pour notre Site Web, système de commerce électronique et Portail IA Réponses de la Foi — couvrant le développement personnalisé, l'architecture d'hébergement, la configuration du traitement des paiements, la gestion des utilisateurs, les couches de sécurité, les systèmes de messagerie électronique, la livraison de contenu et toutes les outils essentiels nécessaires pour lancer notre apostolat numérique.",
    maintenanceCosts: "Coûts de Maintenance",
    maintenanceDesc: "Création de contenu, réseaux sociaux, soutien, opérations",
    maintenanceNote: "Les contributions de maintenance commenceront une fois que l'infrastructure sera lancée.",
    goalLabel: "Objectif",

    progressTitle: "Progression Vers Notre Objectif",
    raised: "Collecté",
    goal: "Objectif",

    oneTimeDonation: "Don Unique",
    monthlyDonation: "Souteneur Mensuel",
    selectAmount: "Sélectionnez le Montant",
    customAmount: "Montant Personalisé",
    currency: "Devise",
    proceedToCheckout: "Passer à la Caisse",
    backToOptions: "← Retour aux options",
    choosePaymentMethod: "Choisissez la Méthode de Paiement",
    selectPaymentMethod: "Sélectionnez comment vous souhaitez faire votre don de",
    creditCard: "Carte de Crédit",
    backToPaymentMethods: "← Retour aux méthodes de paiement",
    paymentConfirmed: "Paiement Confirmé!",
    thankYouDonation: "Merci pour votre généreux don à CatholicVacante.",
    donateForPhase1: "Donnez pour la Phase 1",

    // FAQ
    faqTitle: "Questions Fréquentes",
    faq1Question: "Qui dirige ce projet?",
    faq1Answer:
      "Ce projet est supervisé par Dom Rodrigo da Silva, sous sa direction spirituelle et avec une autorisation totale.",
    faq2Question: "Pourquoi ce projet est-il important?",
    faq2Answer:
      "Nous croyons que seule la position catholique traditionnelle — surtout l'entendement sedevacantiste — offre clarté et paix dans la crise actuelle de l'Église. Nos communautés ont besoin urgent d'une présence numérique forte pour unifier les fidèles, protéger notre clergé des attaques injustes et offrir des conseils aux ceux qui sont encore confus par les erreurs modernistes. Ce projet est destiné à être à la fois un bouclier et une lumière.",
    faq3Question: "Comment puis-je obtenir de l'aide?",
    faq3Answer:
      "Pour l'aide en anglais:\n• Email: Jener@duobro.com.br\n• WhatsApp: +1 (786) 414-2643\n\nPour l'aide en espagnol ou en portugais:\n• Email: Jones@duobro.com.br\n• WhatsApp: +55 11 96583-6064",
    copyright: "Copyright © 2026 FundSedevacante",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage && (storedLanguage as Language) in translations) {
      setLanguage(storedLanguage as Language)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
