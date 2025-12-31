import emailjs from '@emailjs/browser';

// Ces IDs doivent être configurés dans EmailJS
const SERVICE_ID = 'contact@serruresafe.fr'; // À remplacer par l'ID réel
const PUBLIC_KEY = 'tFLv-UrhW-xjGz-ra74'; // À remplacer par la clé publique réelle

export const sendEmail = async (templateId: string, templateParams: any) => {
    try {
        const response = await emailjs.send(
            SERVICE_ID,
            templateId,
            templateParams,
            PUBLIC_KEY
        );
        console.log('Email envoyé avec succès!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
};
