const SYSTEM_DEFAULT_ERROR = {
    tr: 'Sistemde geçici bir hata oluşmuştur. Lütfen daha sonra tekrar deneyiniz.',
    en: 'There has been a temporary error. Please try again later.',
};

const returnMessages = {
    ERR_UNDEFINED: {
        code: -1,
        messages: {
            tr: 'Bir hata oluştu. Lütfen daha sonra tekrar dene.',
            en: 'Error occurred. Please try again later.',
        },
    },
    ERR_INTERNAL: {
        code: 1,
        messages: {
            tr: 'Sistem hatası.',
            en: 'Internal error.',
        },
    },
    ERR_VALIDATION: {
        code: 2,
        messages: {
            tr: 'Gönderilen istekteki bilgiler yanlış.',
            en: 'Error while validating request inputs.',
        },
    },
    ERR_AUTHORIZATION: {
        code: 3,
        messages: {
            tr: 'Bilgileri görmeye yetkili değilsiniz.', // 403
            en: 'Not authorized.',
        },
    },
    ERR_AUTHENTICATION: {
        code: 4,
        messages: {
            tr: 'Lütfen uygulamaya giriş yaptığınızdan emin olunuz.', // 403
            en: 'Please make sure you are logged in.',
        },
    },
    ERR_NOTFOUND: {
        code: 5,
        messages: {
            tr: 'Bilgi bulunamadı.',
            en: 'Not found.',
        },
    },
    ERR_USERNAME_IN_USE: {
        code: 6,
        messages: {
            tr: 'Girdiginiz kullanici adi daha once sisteme kayitlidir.',
            en: 'The username you entered has been registered in the system before.',
        },
    },
    ERR_USERNAME_NOTFOUND: {
        code: 7,
        messages: {
            tr: 'Girdiginiz kullanicinin sistem de kaydi bulunmamaktadir.',
            en: 'There is no username registered in system.',
        },
    },
    ERR_INVALID_PASSWORD: {
        code: 8,
        messages: {
            tr: 'Mevcut şifrenizi hatalı girdiniz.',
            en: 'Invalid password.',
        },
    },
    FAILED_REMOVED_READ_LATER: {
        code: 9,
        messages: {
            tr: 'Kullanicinin uzerinden haber silinemedi.',
            en: 'It is failed to remove news on user.',
        },
    },
    USER_NEWS_ALREADY_EXISTS: {
        code: 10,
        messages: {
            tr: 'Haber kullanicinin uzerinde zaten mevcuttur.',
            en: 'The NewsId already exists.',
        },
    },
    NO_USER_NEWS_FOR_REMOVE: {
        code: 11,
        messages: {
            tr: 'Kullanicidan silinecek herhangi bir haber bulunamamistir.',
            en: 'There is no newsId to remove from user news.',
        },
    },

};

const validationMessages = {
    INVALID_FORMAT: {
        tr: 'Girilen parametrenin formatı yanlıştır.',
        en: 'Invalid format type for entered parameter.',
    },
    INVALID_ID: {
        tr: 'Id Hatalı.',
        en: 'Invalid Id.',
    },
    MISSING_FIELDS: {
        tr: 'Eksik parametreler bulunmaktadir.',
        en: 'There is missing fields.',
    },
    INVALID_VALUE_FOR_RSS_SOURCE: {
        tr: 'Bu kaynaga ait herhangi bir haber bulunamamistir.',
        en: 'There is no feeds belongs to rss source',
    },
    INVALID_INTERVAL_FOR_PAGE: {
        tr: 'Sayfa icin belirlenen aralikta deger girilmemistir.',
        en: 'There is interval values defined page',
    },
    INVALID_INTERVAL_FOR_LIMIT: {
        tr: 'Limit icin belirlenen aralikta deger girilmemistir.',
        en: 'There is interval values defined limit',
    },
    INVALID_USERNAME: {
        tr: 'Kullanici adi belirli kurallara uymamistir.',
        en: 'There is an invalid username!',
    },
    INVALID_PASSWORD: {
        tr: 'Sifre belirli kurallara uymamistir.',
        en: 'There is an invalid password!',
    },
    MISSING_AUTH_FIELDS: {
        tr: 'Yetkili giris bilgileriniz eksiktir.',
        en: 'There is missing field related to auth',
    },
    INVALID_NEWS_ID: {
        tr: 'newsId degeri dogru girilmemistir.',
        en: 'newsId is invalid type.',
    },

};

module.exports = {
    RETURN_MESSAGES: returnMessages,
    VALIDATION_MESSAGES: validationMessages,
};
