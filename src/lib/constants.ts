import {
    ArrowRight,
    CheckCircle,
    Calendar,
    Clock,
    PhoneCall,
    Users,
    Building,
    BadgeCheck
} from "lucide-react";

export const ctaPositions = [
    { top: "10%", left: "20%" },
    { top: "30%", left: "70%" },
    { top: "60%", left: "15%" },
    { top: "40%", left: "50%" },
    { top: "70%", left: "80%" },
];

export const ctaIcons = [
    {
        text: "24/7 AI Receptionist",
        icon: Clock,
        size: 16,
    },
    {
        text: "5-Minute Setup",
        icon: Calendar,
        size: 16,
    },
    {
        text: "Multilingual Support",
        icon: PhoneCall,
        size: 16,
    },
];

export const companyInfo = {
    name: "Kraftodent",
    domain: "kraftodent.com",
    url: "https://kraftodent.com",
    logo: "https://kraftodent.com/logo.png",
    address: {
        city: "Pune",
        state: "Maharashtra",
        country: "India",
    },
    contact: {
        email: "contact@kraftxworks.com",
        phone: "+91 9822296812",
    },
    social: {
        facebook: "https://facebook.com/kraftodent",
        twitter: "https://twitter.com/kraftodent",
        instagram: "https://instagram.com/kraftodent",
        linkedin: "https://linkedin.com/company/kraftodent",
    },
};

export const pricingPlans = [
    {
        name: "Basic",
        icon: Users,
        size: 20,
        description: "Perfect for smaller dental practices with up to 3 dentists",
        monthlyPrice: "₹20,000",
        yearlyPrice: "₹16,000",
        yearlyTotal: "₹192,000",
        features: [
            {
                included: true,
                text: "AI Receptionist with 24/7 availability",
            },
            {
                included: true,
                text: "Appointment scheduling & reminders",
            },
            {
                included: true,
                text: "WhatsApp integration",
            },
            {
                included: true,
                text: "2 language support",
                tooltip:
                    "English and Hindi included. Additional languages available as add-ons.",
            },
            {
                included: false,
                text: "Multi-location support",
            },
            {
                included: false,
                text: "Advanced Analytics Dashboard",
            },
            {
                included: false,
                text: "Custom Integration",
            },
        ],
        popular: false,
        callToAction: "Get Started",
        callToActionLink: "#contact",
    },
    {
        name: "Professional",
        icon: Building,
        size: 20,
        description: "Ideal for growing practices with 4-10 dentists and multiple staff members",
        monthlyPrice: "₹35,000",
        yearlyPrice: "₹28,000",
        yearlyTotal: "₹336,000",
        features: [
            {
                included: true,
                text: "AI Receptionist with 24/7 availability",
            },
            {
                included: true,
                text: "Appointment scheduling & reminders",
            },
            {
                included: true,
                text: "WhatsApp & SMS integration",
            },
            {
                included: true,
                text: "5 language support",
                tooltip:
                    "English, Hindi, Marathi, Tamil, and Telugu included",
            },
            {
                included: true,
                text: "Multi-location support",
                tooltip: "Up to 3 locations",
            },
            {
                included: true,
                text: "Advanced Analytics Dashboard",
            },
            {
                included: false,
                text: "Custom Integration",
            },
        ],
        popular: true,
        callToAction: "Get Started",
        callToActionLink: "#contact",
    },
    {
        name: "Enterprise",
        icon: BadgeCheck,
        size: 20,
        description: "For large dental chains with 10+ dentists and complex requirements",
        monthlyPrice: "Contact Us",
        yearlyPrice: "Contact Us",
        yearlyTotal: "",
        features: [
            {
                included: true,
                text: "AI Receptionist with 24/7 availability",
            },
            {
                included: true,
                text: "Appointment scheduling & reminders",
            },
            {
                included: true,
                text: "All communication channels",
            },
            {
                included: true,
                text: "All available languages",
            },
            {
                included: true,
                text: "Unlimited locations",
            },
            {
                included: true,
                text: "Advanced Analytics Dashboard",
            },
            {
                included: true,
                text: "Custom Integration",
                tooltip:
                    "We'll integrate with your existing practice management software",
            },
        ],
        popular: false,
        callToAction: "Contact Sales",
        callToActionLink: "#contact",
    },
];

// FAQ data structure
export interface FAQType {
    question: string;
    answer: string;
    category: string;
}

export const allFaqs: FAQType[] = [
    {
        question: "Does Kraftodent integrate with my dental software?",
        answer: "Yes, we support most major practice management software platforms used in India, including Dentrix, Carestack, and more. Our team will ensure a smooth integration with your existing systems during the setup process, and we're constantly adding support for additional platforms.",
        category: "Integration",
    },
    {
        question: "Will my patients talk to a robot?",
        answer: "No — our voice AI is designed to sound human, empathetic, and responsive. Patients often can't tell they're speaking with an AI system. We've specifically trained our voice models to handle Indian accents and multiple regional languages with natural conversational patterns.",
        category: "Technology",
    },
    {
        question: "Can I customize responses?",
        answer: "Absolutely. We tailor call flows and language to match your clinic's tone, terminology preferences, and specific procedures. You can customize greeting messages, appointment confirmation details, and follow-up protocols to maintain your practice's unique identity.",
        category: "Customization",
    },
    {
        question: "How long does it take to set up?",
        answer: "Most dental practices are up and running with Kraftodent within 2-3 days. Our onboarding team handles the integration with your existing software, trains your staff, and makes sure everything is working perfectly before going live.",
        category: "Setup",
    },
    {
        question: "What languages does Kraftodent support?",
        answer: "Kraftodent currently supports English, Hindi, Marathi, Gujarati, Tamil, and Telugu. We're adding more Indian languages regularly based on customer demand.",
        category: "Features",
    },
    {
        question: "How secure is patient data?",
        answer: "We take data security extremely seriously. Kraftodent is fully HIPAA-compliant and uses advanced encryption for all patient conversations and data. Your patient information remains private, secure, and is never shared with third parties.",
        category: "Security",
    },
    {
        question: "Do I need special equipment?",
        answer: "No, you don't need any special equipment. Kraftodent works with your existing phone systems and internet connection. Our team will guide you through the simple setup process that requires minimal technical knowledge.",
        category: "Setup",
    },
    {
        question: "What happens if the AI can't answer a question?",
        answer: "If our AI encounters a question it can't handle confidently, it will seamlessly escalate to your staff based on predefined rules. We also continuously train the system based on these exceptions to improve its capabilities over time.",
        category: "Technology",
    },
    {
        question: "Can I monitor the AI's performance?",
        answer: "Yes, you'll have access to a comprehensive dashboard showing call statistics, patient satisfaction metrics, appointment bookings, and more. You can also listen to call recordings to ensure quality and help us improve the system.",
        category: "Analytics",
    },
    {
        question: "What's the pricing structure?",
        answer: "We offer flexible plans based on your practice size and needs. Our pricing is transparent with no hidden fees, starting from ₹16,000 per month with our annual plan. Please contact our team for a custom quote tailored to your specific requirements.",
        category: "Pricing",
    },
];

export const footerLinks = [
    {
        title: "Product",
        links: [
            { text: "Features", href: "/#features" },
            { text: "How It Works", href: "/#product" },
            { text: "Pricing", href: "/#pricing" },
            { text: "Demo", href: "/demo" },
            { text: "Updates", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { text: "Documentation", href: "#" },
            { text: "Tutorials", href: "#" },
            { text: "Blog", href: "#" },
            { text: "Case Studies", href: "/#case-studies" },
            { text: "FAQ", href: "/#faq" },
        ],
    },
    {
        title: "Company",
        links: [
            { text: "About Us", href: "#" },
            { text: "Careers", href: "#" },
            { text: "Contact", href: "/#contact" },
            { text: "Partners", href: "#" },
            { text: "Privacy Policy", href: "/privacy-policy" },
        ],
    },
];