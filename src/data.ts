import { SystemLink } from './types';

export const SYSTEM_LINKS: SystemLink[] = [
  // QC & Maintenance
  {
    id: 'daily-qc',
    title: 'ระบบบันทึกการตรวจสอบเครื่องเอกซเรย์ประจำวัน',
    englishTitle: 'Daily X-Ray QC System',
    description: 'แบบฟอร์มบันทึกการทำ QC ประจำวันเพื่อให้เครื่องเอกซเรย์พร้อมใช้งานอย่างปลอดภัย',
    category: 'qc',
    url: 'https://digital-x-ray-daily-qc-form.vercel.app',
    iconName: 'ClipboardCheck',
    badge: 'Daily QC',
    isPopular: true
  },
  {
    id: 'quarterly-qc',
    title: 'ระบบตรวจสอบประจำไตรมาส (3-6 เดือน) Co Le',
    englishTitle: 'Quarterly Maintenance (3-6 Months)',
    description: 'การตรวจสอบระบบประจำไตรมาสเพื่อการบำรุงรักษาในระยะยาวและเสถียรภาพของเครื่องเอกซเรย์',
    category: 'qc',
    url: 'https://3-6-nine.vercel.app',
    iconName: 'CalendarDays',
    badge: 'Quarterly'
  },
  {
    id: 'darknoise-qc',
    title: 'QC monitor DarkNoise Image',
    englishTitle: 'Monitor Image Uniformity QC',
    description: 'ระบบตรวจสอบความสม่ำเสมอของภาพและจุดบกพร่องของมอนิเตอร์แสดงผลทางการแพทย์',
    category: 'qc',
    url: 'https://spectum168.github.io/Monitor-Image-Uniformity---F3-F5/',
    iconName: 'Monitor',
    badge: 'Monitor QC'
  },
  // Documents & Evidence
  {
    id: 'pregnancy-consent',
    title: 'เอกสารยินยอมในการตรวจสำหรับหญิงตั้งครรภ์',
    englishTitle: 'Pregnancy X-ray Consent Form',
    description: 'แบบฟอร์มอิเล็กทรอนิกส์สำหรับการยืนยอมรับบริการและประเมินความเสี่ยงกรณีที่สงสัยว่าตั้งครรภ์',
    category: 'docs',
    url: 'https://script.google.com/macros/s/AKfycbzbVWcH7Qa2qh6IO1l9RqKgMZ_3gQM9U4ytIQHk_eaZJ43MsOjvfwl2g8z2cQw5JypR/exec',
    iconName: 'Baby',
    badge: 'e-Consent'
  },
  {
    id: 'moph-evidence',
    title: 'MOPH X-ray 2569 Smart Evidence Hub v3.0',
    englishTitle: 'Smart Standard Evidence Hub',
    description: 'ศูนย์รวมข้อมูลหลักฐานตามเกณฑ์มาตรฐานกระทรวงสาธารณสุข (MOPH) สำหรับงานรังสีเทคนิค',
    category: 'docs',
    url: 'https://spectum168.github.io/moph-x-ray-2569-smart-evidence-hub-v3.0/',
    iconName: 'FolderHeart',
    badge: 'MOPH Standard',
    isPopular: true
  },
  // Training & Personnel
  {
    id: 'personnel-training',
    title: 'ระบบฝึกอบรมรังสีและประเมินบุคลากร',
    englishTitle: 'Radiology Training & Evaluation',
    description: 'ระบบการเรียนรู้และประเมินทักษะสำหรับบุคลากรทางการแพทย์และบุคลากรสนับสนุน',
    category: 'training',
    url: 'https://spectum168.github.io/Maetha-Radiology-E-Leaning/',
    iconName: 'GraduationCap',
    badge: 'E-Learning'
  },
  {
    id: 'radiation-safety-learn',
    title: 'ระบบเรียนรู้ความปลอดภัยทางรังสี',
    englishTitle: 'Radiation Safety Education',
    description: 'หลักสูตรป้องกันอันตรายจากรังสีออนไลน์สำหรับเจ้าหน้าที่และผู้ปฏิบัติงานที่เกี่ยวข้อง',
    category: 'training',
    url: 'https://spectum168.github.io/Radiation-Safety-E-Learning-/',
    iconName: 'BookOpen',
    badge: 'Radiation Safety'
  },
  // Safety & Reports
  {
    id: 'radiation-dose-report',
    title: 'ระบบรายงานปริมาณรังสีบุคคล',
    englishTitle: 'Personal Radiation Dose Report',
    description: 'ตรวจสอบค่าสะสมปริมาณรังสีของบุคลากรประจำสถานพยาบาลและโรงพยาบาลแม่ทา',
    category: 'safety',
    url: 'https://radiation-dose-dashboard-report.vercel.app',
    iconName: 'BarChart3',
    badge: 'Dose Reports',
    altUrls: [
      { label: 'Vercel Dashboard', url: 'https://radiation-dose-dashboard-report.vercel.app' },
      { label: 'เครื่องคำนวณและลดรังสี (Dosimeters)', url: 'https://spectum168.github.io/Radiation-Dose-Safety-Dashboard/', iconName: 'Sparkles' }
    ]
  }
];

export const CATEGORY_LABELS = {
  all: { th: 'ทั้งหมด', en: 'All Systems' },
  qc: { th: 'การตรวจสอบและควบคุมคุณภาพ (QC & Maintenance)', en: 'QC & Maintenance' },
  docs: { th: 'เอกสารและหลักฐานทางการแพทย์ (Documents & Evidence)', en: 'Documents & Evidence' },
  training: { th: 'การเรียนรู้และบุคลากร (Training & Personnel)', en: 'Training & Personnel' },
  safety: { th: 'ความปลอดภัยและรายงาน (Safety & Reports)', en: 'Safety & Reports' }
};
