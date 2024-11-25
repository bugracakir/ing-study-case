import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  resources: {
    en: {
      translation: {
        pageHeaders: {
          addEmployee: "Add New Employee",
          editEmployee: "Edit Employee",
        },
        tableHeaders: {
          firstName: "First Name",
          lastName: "Last Name",
          dateOfEmployment: "Date of Employment",
          dateOfBirth: "Date of Birth",
          phone: "Phone",
          email: "Email",
          department: "Department",
          position: "Position",
          actions: "Actions",
        },
        buttons: {
          saveChanges: "Save Changes",
          addEmployee: "Add Employee",
          deleteEmployee: "Delete Eployee",
          updateEmployee: "Update Eployee",
          cancel: "Cancel",
        },
        infoTexts: {
          areYouSure: "Are you sure?",
          willBeDeleted:
            "Selected employee record of {{name}} {{lastName}} will be deleted.",
          willBeUpdated:
            "Selected employee record will be updated.",
        },
      },
    },
    tr: {
      translation: {
        pageHeaders: {
          addEmployee: "Yeni Çalışan Ekle",
          editEmployee: "Çalışanı Düzenle",
        },
        tableHeaders: {
          firstName: "Ad",
          lastName: "Soyad",
          dateOfEmployment: "İşe Başlama Tarihi",
          dateOfBirth: "Doğum Tarihi",
          phone: "Telefon",
          email: "E-posta",
          department: "Departman",
          position: "Pozisyon",
          actions: "İşlemler",
        },
        buttons: {
          saveChanges: "Değişiklikleri Kaydet",
          addEmployee: "Çalışanı Ekle",
          deleteEmployee: "Çalışanı Sil",
          updateEmployee: "Çalışanı Güncelle",
          cancel: "İptal",
        },
        infoTexts: {
            areYouSure: "Emin misiniz?",
            willBeDeleted:
              "Seçili olan {{name}} {{lastName}} isimli çalışanın kaydı silinecek.",
            willBeUpdated:
              "Seçili çalışanın kaydı güncellenecek.",
          },
      },
    },
  },
  fallbackLng: "en", // Default language
  interpolation: {
    escapeValue: false, // React escapes by default; LitElement doesn't
  },
});

export default i18next;
