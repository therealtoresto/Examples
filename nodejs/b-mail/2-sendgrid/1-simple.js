const sgMail = require('@sendgrid/mail');

// Встановити SendGrid API ключ
sgMail.setApiKey('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');

// Конфігурація електронного листа
const msg = {
  to: 'therealtoresto2@gmail.com', // Адресат
  from: 'therealtoresto@gmail.com', // Ваша електронна адреса (яка буде відправником)
  subject: 'Привіт від SendGrid!', // Тема листа
  text: 'Привіт, це тестовий лист від SendGrid!', // Текстовий варіант листа
  html: '<p>Привіт, це тестовий лист від <strong>SendGrid!</strong></p>', // HTML-варіант листа
};

// Надсилання листа
sgMail
  .send(msg)
  .then(() => {
    console.log('Лист успішно надіслано!');
  })
  .catch((error) => {
    console.error(error.toString());
  });
