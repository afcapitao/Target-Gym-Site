import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "pt" | "en";

export const translations = {
  pt: {
    navbar: {
      links: [
        { label: "Início", href: "#inicio" },
        { label: "Sobre", href: "#sobre" },
        { label: "Serviços", href: "#servicos" },
        { label: "Galeria", href: "#galeria" },
        { label: "Equipa", href: "#equipa" },
        { label: "Contacto", href: "#contacto" },
      ],
      cta: "Marcar Sessão",
      menuAriaLabel: "Abrir menu",
    },
    hero: {
      location: "Parque das Nações · Lisboa",
      titleLine1: "Treina Como",
      titleLine2: "Um Campeão",
      subtitle:
        "Personal training de elite no coração de Lisboa. Resultados reais, metodologias comprovadas e treinadores certificados ao teu lado em cada repetição.",
      ctaStart: "Começar Agora",
      ctaLearnMore: "Saber Mais",
    },
    stats: [
      { value: 500, suffix: "+", label: "Membros Activos" },
      { value: 12, suffix: "+", label: "Anos de Experiência" },
      { value: 98, suffix: "%", label: "Taxa de Satisfação" },
      { value: 15, suffix: "+", label: "Treinadores Certificados" },
    ],
    about: {
      sectionLabel: "Sobre Nós",
      titleLine1: "Onde a Precisão",
      titleLine2: "Encontra a Performance",
      p1: "Fundado com a missão de democratizar o acesso a treino de elite, o Target Personal Training Gym nasceu em Lisboa com uma convicção: resultados extraordinários exigem abordagens extraordinárias.",
      p2: "Situado no Passeio do Adamastor, Parque das Nações, o nosso espaço é mais do que um ginásio — é um laboratório de performance humana. Aqui, cada máquina, cada metro quadrado e cada treinador existem com um único propósito: levar-te mais longe do que julgavas ser possível.",
      p3: "Da primeira sessão de avaliação ao treino que rompe os teus limites, a Target está contigo em cada passo da jornada.",
      cta: "Agendar Avaliação Gratuita",
      imgAlt: "Interior do Target Personal Training Gym com equipamento profissional",
      pillars: [
        {
          title: "Foco Total",
          desc: "Cada sessão é desenhada em torno dos teus objetivos, não de um programa genérico.",
        },
        {
          title: "Excelência Comprovada",
          desc: "Metodologias baseadas em ciência do exercício aplicada por treinadores certificados.",
        },
        {
          title: "Localização Privilegiada",
          desc: "No Parque das Nações, com acesso a espaços ao ar livre para treinos em ambiente natural sempre que possível.",
        },
      ],
    },
    services: {
      sectionLabel: "O Que Oferecemos",
      titleLine1: "Serviços Concebidos",
      titleLine2: "Para Resultados Reais",
      bookCta: "Marcar Sessão",
      items: [
        {
          title: "Personal Training",
          tag: "Principal",
          bookingValue: "personal-training",
          desc: "Treino individualizado com plano totalmente personalizado ao teu corpo, objetivos e disponibilidade. Avaliação física, plano de treino e acompanhamento contínuo.",
          highlights: ["Avaliação física completa", "Plano 100% personalizado", "Acompanhamento semanal", "Ajuste progressivo de cargas"],
          image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&fit=crop",
        },
        {
          title: "Aulas de Grupo",
          tag: "Popular",
          bookingValue: "group-class",
          desc: "Treinos em grupo com energia coletiva e resultados individuais. HIIT, Functional Training, Circuit e muito mais. Motivação garantida.",
          highlights: ["HIIT", "Functional Training", "Circuit Training", "Treino de Força Coletivo"],
          image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80&fit=crop",
        },
        {
          title: "Nutrição Desportiva",
          tag: "Novo",
          bookingValue: "nutrition",
          desc: "Acompanhamento nutricional especializado em performance e composição corporal. Planos alimentares adaptados ao teu estilo de vida e objetivos.",
          highlights: ["Análise de composição corporal", "Plano alimentar personalizado", "Suplementação orientada", "Consultas mensais"],
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&fit=crop",
        },
        {
          title: "Treino Online",
          tag: "Flexível",
          bookingValue: "online-training",
          desc: "A mesma qualidade Target, em qualquer lugar do mundo. Treino remoto com videochamada, plano digital e suporte via chat.",
          highlights: ["Sessões por videochamada", "App de treino dedicada", "Plano de treino digital", "Suporte diário via chat"],
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&fit=crop",
        },
      ],
    },
    gallery: {
      sectionLabel: "As Nossas Instalações",
      titleLine1: "O Teu Novo",
      titleLine2: "Campo de Batalha",
      subtitle:
        "Equipamento de última geração, espaços desenhados para máxima performance e uma atmosfera que te empurra para além dos teus limites.",
      images: [
        { alt: "Sala de pesos do Target Gym com equipamento profissional", caption: "Sala de Pesos" },
        { alt: "Sessão de personal training no Target Gym", caption: "Personal Training" },
        { alt: "Área de treino funcional com kettlebells", caption: "Treino Funcional" },
        { alt: "Equipamento cardiovascular moderno", caption: "Zona Cardio" },
        { alt: "Plataforma de levantamento olímpico", caption: "Levantamento Olímpico" },
        { alt: "Área de treino de combate e boxe", caption: "Treino de Combate" },
        { alt: "Vista geral do ginásio Target", caption: "Target Gym" },
        { alt: "Treinador e atleta em sessão intensa", caption: "Sessão Intensa" },
      ],
      lightboxAriaLabel: "Galeria ampliada",
      closeLabel: "Fechar",
    },
    trainers: {
      sectionLabel: "A Nossa Equipa",
      titleLine1: "Os Especialistas",
      titleLine2: "Por Trás dos Resultados",
      subtitle:
        "Treinadores certificados, apaixonados pela performance humana e comprometidos com o teu progresso pessoal.",
      bookCta: (firstName: string) => `Treinar com ${firstName}`,
      items: [
        {
          name: "Miguel Santos",
          role: "Head Coach · Personal Trainer",
          specialty: "Força & Condicionamento",
          certs: "NSCA-CPT · FMS Level 2 · Corrective Exercise",
          bio: "12 anos de experiência em treino de alto rendimento. Ex-atleta de halterofilismo, Miguel combina ciência do exercício com abordagem prática para resultados mensuráveis.",
        },
        {
          name: "Ana Rodrigues",
          role: "Personal Trainer · Nutrição",
          specialty: "Transformação Corporal",
          certs: "ACSM-CPT · Nutrição Desportiva · HIIT Specialist",
          bio: "Especialista em transformação corporal feminina com foco em saúde hormonal e performance. Já acompanhou mais de 200 clientes em jornadas de mudança real.",
        },
        {
          name: "João Ferreira",
          role: "Personal Trainer",
          specialty: "Treino Funcional & HIIT",
          certs: "NASM-CPT · CrossFit L2 · TRX Certified",
          bio: "Apaixonado por movimento funcional e treino de alta intensidade. João adapta cada treino ao nível do cliente, garantindo progressão segura e resultados rápidos.",
        },
        {
          name: "Sofia Lopes",
          role: "Nutricionista Desportiva",
          specialty: "Nutrição & Performance",
          certs: "Licenciatura em Nutrição · Pós-grad. Desporto",
          bio: "Nutricionista especializada em performance desportiva e composição corporal. Sofia cria estratégias nutricionais que potenciam o treino e respeitam o estilo de vida de cada pessoa.",
        },
      ],
    },
    testimonials: {
      sectionLabel: "Histórias Reais",
      titleLine1: "O Que os Nossos",
      titleLine2: "Clientes Dizem",
      verifiedLabel: "Cliente verificado · Google",
    },
    contact: {
      sectionLabel: "Fala Connosco",
      titleLine1: "Dá o Primeiro",
      titleLine2: "Passo Hoje",
      subtitle:
        "Agenda uma avaliação gratuita e descobre o plano de treino ideal para os teus objetivos. Sem compromisso.",
      formTitle: "Avaliação Gratuita",
      nameLbl: "Nome Completo",
      namePlaceholder: "O teu nome",
      emailPlaceholder: "o-teu@email.com",
      messageLbl: "Mensagem",
      messagePlaceholder: "Conta-nos os teus objetivos e disponibilidade...",
      sendBtn: "Enviar Mensagem",
      sendingBtn: "A enviar...",
      successTitle: "Mensagem Enviada!",
      successSubtitle: "A nossa equipa entrará em contacto em menos de 24 horas.",
      sendAnother: "Enviar outra mensagem",
      infoLabels: { address: "Morada", phone: "Telefone", email: "Email", hours: "Horário" },
      hours: "Seg–Sex: 06h–22h · Sáb–Dom: 08h–20h",
      mapTitle: "Localização Target Gym - Parque das Nações, Lisboa",
    },
    footer: {
      tagline: "Ginásio de personal training no Parque das Nações. Comprometidos com a tua performance desde 2012.",
      navTitle: "Navegação",
      servicesTitle: "Serviços",
      contactTitle: "Contacto",
      quickLinks: [
        { label: "Início", href: "#inicio" },
        { label: "Sobre Nós", href: "#sobre" },
        { label: "Serviços", href: "#servicos" },
        { label: "Galeria", href: "#galeria" },
        { label: "Equipa", href: "#equipa" },
        { label: "Contacto", href: "#contacto" },
      ],
      services: ["Personal Training", "Aulas de Grupo", "Nutrição Desportiva", "Treino Online"],
      copyright: "Todos os direitos reservados.",
      privacy: "Política de Privacidade",
      terms: "Termos e Condições",
      backToTop: "Voltar ao topo",
    },
    booking: {
      title: "Marcar Sessão",
      subtitle: "Preenche o formulário e entramos em contacto em 24h para confirmar.",
      closeLabel: "Fechar",
      nameLbl: "Nome Completo",
      namePlaceholder: "O teu nome",
      emailPlaceholder: "o-teu@email.com",
      phoneLbl: "Telefone",
      serviceLbl: "Serviço",
      servicePlaceholder: "Seleccionar serviço",
      dateLbl: "Data Preferida",
      timeLbl: "Horário Preferido",
      timePlaceholder: "Seleccionar horário",
      notesLbl: "Notas Adicionais (opcional)",
      notesPlaceholder: "Objectivos, lesões, disponibilidade específica...",
      submitBtn: "Confirmar Reserva",
      submittingBtn: "A enviar reserva...",
      disclaimer: "A tua reserva não é vinculativa até confirmação da nossa equipa.",
      errorMsg: "Ocorreu um erro ao enviar a reserva. Tenta novamente ou contacta-nos por telefone.",
      successTitle: "Reserva Confirmada!",
      successSubtitle: (email: string) =>
        `Recebemos o teu pedido de reserva. A nossa equipa entrará em contacto para ${email} em menos de 24 horas para confirmar a sessão.`,
      summaryService: "Serviço",
      summaryDate: "Data",
      summaryTime: "Horário",
      doneBtn: "Fechar",
      services: [
        { value: "personal-training", label: "Personal Training" },
        { value: "group-class", label: "Aulas de Grupo" },
        { value: "nutrition", label: "Nutrição Desportiva" },
        { value: "online-training", label: "Treino Online" },
      ],
      validation: {
        name: "Nome obrigatório (mínimo 2 caracteres)",
        email: "Email inválido",
        phone: "Telefone inválido",
        service: "Selecciona um serviço",
        date: "Indica uma data preferida",
        time: "Indica um horário preferido",
      },
    },
  },
  en: {
    navbar: {
      links: [
        { label: "Home", href: "#inicio" },
        { label: "About", href: "#sobre" },
        { label: "Services", href: "#servicos" },
        { label: "Gallery", href: "#galeria" },
        { label: "Team", href: "#equipa" },
        { label: "Contact", href: "#contacto" },
      ],
      cta: "Book Session",
      menuAriaLabel: "Open menu",
    },
    hero: {
      location: "Parque das Nações · Lisbon",
      titleLine1: "Train Like",
      titleLine2: "A Champion",
      subtitle:
        "Elite personal training in the heart of Lisbon. Real results, proven methodologies and certified trainers by your side every rep.",
      ctaStart: "Start Now",
      ctaLearnMore: "Learn More",
    },
    stats: [
      { value: 500, suffix: "+", label: "Active Members" },
      { value: 12, suffix: "+", label: "Years of Experience" },
      { value: 98, suffix: "%", label: "Satisfaction Rate" },
      { value: 15, suffix: "+", label: "Certified Trainers" },
    ],
    about: {
      sectionLabel: "About Us",
      titleLine1: "Where Precision",
      titleLine2: "Meets Performance",
      p1: "Founded with the mission to democratise access to elite training, Target Personal Training Gym was born in Lisbon with a conviction: extraordinary results require extraordinary approaches.",
      p2: "Located at Passeio do Adamastor, Parque das Nações, our space is more than a gym — it's a human performance laboratory. Every machine, every square metre and every trainer exists with a single purpose: to take you further than you thought possible.",
      p3: "From the first assessment session to the workout that breaks your limits, Target is with you every step of the journey.",
      cta: "Schedule Free Assessment",
      imgAlt: "Target Personal Training Gym interior with professional equipment",
      pillars: [
        {
          title: "Total Focus",
          desc: "Each session is designed around your goals, not a generic programme.",
        },
        {
          title: "Proven Excellence",
          desc: "Methodologies grounded in exercise science, delivered by certified trainers.",
        },
        {
          title: "Prime Location",
          desc: "In Parque das Nações, with access to outdoor spaces for training in a natural setting whenever possible.",
        },
      ],
    },
    services: {
      sectionLabel: "What We Offer",
      titleLine1: "Services Designed",
      titleLine2: "For Real Results",
      bookCta: "Book Session",
      items: [
        {
          title: "Personal Training",
          tag: "Core",
          bookingValue: "personal-training",
          desc: "One-on-one training with a plan fully tailored to your body, goals and schedule. Physical assessment, training plan and ongoing support.",
          highlights: ["Full physical assessment", "100% personalised plan", "Weekly check-ins", "Progressive load adjustment"],
          image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&fit=crop",
        },
        {
          title: "Group Classes",
          tag: "Popular",
          bookingValue: "group-class",
          desc: "Group workouts with collective energy and individual results. HIIT, Functional Training, Circuit and much more. Motivation guaranteed.",
          highlights: ["HIIT", "Functional Training", "Circuit Training", "Group Strength Training"],
          image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80&fit=crop",
        },
        {
          title: "Sports Nutrition",
          tag: "New",
          bookingValue: "nutrition",
          desc: "Specialist nutritional coaching focused on performance and body composition. Meal plans adapted to your lifestyle and goals.",
          highlights: ["Body composition analysis", "Personalised meal plan", "Guided supplementation", "Monthly consultations"],
          image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&fit=crop",
        },
        {
          title: "Online Training",
          tag: "Flexible",
          bookingValue: "online-training",
          desc: "The same Target quality, anywhere in the world. Remote training with video calls, a digital plan and chat support.",
          highlights: ["Video call sessions", "Dedicated training app", "Digital training plan", "Daily chat support"],
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80&fit=crop",
        },
      ],
    },
    gallery: {
      sectionLabel: "Our Facilities",
      titleLine1: "Your New",
      titleLine2: "Battleground",
      subtitle:
        "State-of-the-art equipment, spaces designed for maximum performance and an atmosphere that pushes you beyond your limits.",
      images: [
        { alt: "Target Gym weights room with professional equipment", caption: "Weights Room" },
        { alt: "Personal training session at Target Gym", caption: "Personal Training" },
        { alt: "Functional training area with kettlebells", caption: "Functional Training" },
        { alt: "Modern cardiovascular equipment", caption: "Cardio Zone" },
        { alt: "Olympic lifting platform", caption: "Olympic Lifting" },
        { alt: "Combat and boxing training area", caption: "Combat Training" },
        { alt: "General view of Target Gym", caption: "Target Gym" },
        { alt: "Trainer and athlete in an intense session", caption: "Intense Session" },
      ],
      lightboxAriaLabel: "Expanded gallery",
      closeLabel: "Close",
    },
    trainers: {
      sectionLabel: "Our Team",
      titleLine1: "The Specialists",
      titleLine2: "Behind Your Results",
      subtitle:
        "Certified trainers, passionate about human performance and committed to your personal progress.",
      bookCta: (firstName: string) => `Train with ${firstName}`,
      items: [
        {
          name: "Miguel Santos",
          role: "Head Coach · Personal Trainer",
          specialty: "Strength & Conditioning",
          certs: "NSCA-CPT · FMS Level 2 · Corrective Exercise",
          bio: "12 years of experience in high-performance training. A former weightlifting athlete, Miguel combines exercise science with a hands-on approach for measurable results.",
        },
        {
          name: "Ana Rodrigues",
          role: "Personal Trainer · Nutrition",
          specialty: "Body Transformation",
          certs: "ACSM-CPT · Sports Nutrition · HIIT Specialist",
          bio: "Specialist in female body transformation with a focus on hormonal health and performance. She has guided over 200 clients through real transformation journeys.",
        },
        {
          name: "João Ferreira",
          role: "Personal Trainer",
          specialty: "Functional Training & HIIT",
          certs: "NASM-CPT · CrossFit L2 · TRX Certified",
          bio: "Passionate about functional movement and high-intensity training. João adapts every workout to the client's level, ensuring safe progression and fast results.",
        },
        {
          name: "Sofia Lopes",
          role: "Sports Nutritionist",
          specialty: "Nutrition & Performance",
          certs: "BSc Nutrition · Postgrad. Sports Science",
          bio: "Nutritionist specialising in sports performance and body composition. Sofia creates nutritional strategies that enhance training and respect each person's lifestyle.",
        },
      ],
    },
    testimonials: {
      sectionLabel: "Real Stories",
      titleLine1: "What Our",
      titleLine2: "Clients Say",
      verifiedLabel: "Verified client · Google",
    },
    contact: {
      sectionLabel: "Get in Touch",
      titleLine1: "Take the First",
      titleLine2: "Step Today",
      subtitle:
        "Schedule a free assessment and discover the ideal training plan for your goals. No commitment.",
      formTitle: "Free Assessment",
      nameLbl: "Full Name",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messageLbl: "Message",
      messagePlaceholder: "Tell us about your goals and availability...",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successTitle: "Message Sent!",
      successSubtitle: "Our team will get in touch within 24 hours.",
      sendAnother: "Send another message",
      infoLabels: { address: "Address", phone: "Phone", email: "Email", hours: "Hours" },
      hours: "Mon–Fri: 6am–10pm · Sat–Sun: 8am–8pm",
      mapTitle: "Target Gym Location – Parque das Nações, Lisbon",
    },
    footer: {
      tagline: "Personal training gym in Parque das Nações. Committed to your performance since 2012.",
      navTitle: "Navigation",
      servicesTitle: "Services",
      contactTitle: "Contact",
      quickLinks: [
        { label: "Home", href: "#inicio" },
        { label: "About Us", href: "#sobre" },
        { label: "Services", href: "#servicos" },
        { label: "Gallery", href: "#galeria" },
        { label: "Team", href: "#equipa" },
        { label: "Contact", href: "#contacto" },
      ],
      services: ["Personal Training", "Group Classes", "Sports Nutrition", "Online Training"],
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      backToTop: "Back to top",
    },
    booking: {
      title: "Book Session",
      subtitle: "Fill in the form and we'll contact you within 24h to confirm.",
      closeLabel: "Close",
      nameLbl: "Full Name",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      phoneLbl: "Phone",
      serviceLbl: "Service",
      servicePlaceholder: "Select service",
      dateLbl: "Preferred Date",
      timeLbl: "Preferred Time",
      timePlaceholder: "Select time",
      notesLbl: "Additional Notes (optional)",
      notesPlaceholder: "Goals, injuries, specific availability...",
      submitBtn: "Confirm Booking",
      submittingBtn: "Sending booking...",
      disclaimer: "Your booking is not binding until confirmed by our team.",
      errorMsg: "An error occurred while submitting your booking. Please try again or contact us by phone.",
      successTitle: "Booking Confirmed!",
      successSubtitle: (email: string) =>
        `We've received your booking request. Our team will contact ${email} within 24 hours to confirm the session.`,
      summaryService: "Service",
      summaryDate: "Date",
      summaryTime: "Time",
      doneBtn: "Close",
      services: [
        { value: "personal-training", label: "Personal Training" },
        { value: "group-class", label: "Group Classes" },
        { value: "nutrition", label: "Sports Nutrition" },
        { value: "online-training", label: "Online Training" },
      ],
      validation: {
        name: "Name required (minimum 2 characters)",
        email: "Invalid email",
        phone: "Invalid phone number",
        service: "Please select a service",
        date: "Please provide a preferred date",
        time: "Please provide a preferred time",
      },
    },
  },
} as const;

export type Translations = typeof translations["pt"];

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  setLang: () => {},
  t: translations["pt"],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
