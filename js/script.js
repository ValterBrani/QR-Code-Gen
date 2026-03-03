const qrForm = document.getElementById('qrForm');
const qrType = document.getElementById('qrType');
const qrText = document.getElementById('qrText');
const textFields = document.getElementById('textFields');
const wifiFields = document.getElementById('wifiFields');
const wifiSsid = document.getElementById('wifiSsid');
const wifiSecurity = document.getElementById('wifiSecurity');
const wifiPassword = document.getElementById('wifiPassword');
const wifiHidden = document.getElementById('wifiHidden');
const vcardFields = document.getElementById('vcardFields');
const vcardFirstName = document.getElementById('vcardFirstName');
const vcardLastName = document.getElementById('vcardLastName');
const vcardOrganization = document.getElementById('vcardOrganization');
const vcardEmail = document.getElementById('vcardEmail');
const vcardPhone = document.getElementById('vcardPhone');
const vcardWebsite = document.getElementById('vcardWebsite');
const qrSize = document.getElementById('qrSize');
const qrLevel = document.getElementById('qrLevel');
const qrFgColor = document.getElementById('qrFgColor');
const qrBgColor = document.getElementById('qrBgColor');
const downloadFormat = document.getElementById('downloadFormat');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const toggleBtn = document.getElementById('toggleOptions');
const optionsFieldset = document.getElementById('optionsFieldset');
const qrContainer = document.getElementById('qrcode');

let qrCode = null;

function getCorrectLevel() {
  const levels = {
    L: QRCode.CorrectLevel.L,
    M: QRCode.CorrectLevel.M,
    Q: QRCode.CorrectLevel.Q,
    H: QRCode.CorrectLevel.H,
  };
  return levels[qrLevel.value] || QRCode.CorrectLevel.M;
}

function clearQr() {
  qrContainer.innerHTML = '';
}

function escapeWifiValue(value) {
  return value.replace(/([\\;,:\"])/g, '\\$1');
}

function buildVcardPayload() {
  const firstName = vcardFirstName.value.trim();
  const lastName = vcardLastName.value.trim();

  if (!firstName || !lastName) {
    alert('Please enter first and last name for the vCard.');
    return null;
  }

  const organization = vcardOrganization.value.trim();
  const email = vcardEmail.value.trim();
  const phone = vcardPhone.value.trim();
  const website = vcardWebsite.value.trim();

  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  vcard += `FN:${firstName} ${lastName}\n`;
  vcard += `N:${lastName};${firstName};;;\n`;
  
  if (organization) vcard += `ORG:${organization}\n`;
  if (email) vcard += `EMAIL:${email}\n`;
  if (phone) vcard += `TEL:${phone}\n`;
  if (website) vcard += `URL:${website}\n`;
  
  vcard += 'END:VCARD';

  return vcard;
}

function getQrValue() {
  if (qrType.value === 'wifi') {
    const ssid = wifiSsid.value.trim();

    if (!ssid) {
      alert('Please enter the Wi-Fi network name (SSID).');
      return null;
    }

    const security = wifiSecurity.value;
    const password = wifiPassword.value.trim();
    const hidden = wifiHidden.checked ? 'true' : 'false';
    const safeSsid = escapeWifiValue(ssid);
    const safePassword = escapeWifiValue(password);
    const passwordPart = security === 'nopass' ? '' : `P:${safePassword};`;

    return `WIFI:T:${security};S:${safeSsid};${passwordPart}H:${hidden};;`;
  }

  if (qrType.value === 'vcard') {
    return buildVcardPayload();
  }

  const value = qrText.value.trim();
  if (!value) {
    alert('Please enter text or a URL.');
    return null;
  }
  return value;
}

function updateTypeFields() {
  const type = qrType.value;
  textFields.hidden = type !== 'text';
  wifiFields.hidden = type !== 'wifi';
  vcardFields.hidden = type !== 'vcard';
}

function generateQrCode() {
  const value = getQrValue();
  if (!value) {
    return;
  }

  clearQr();

  const size = parseInt(qrSize.value, 10);

  qrCode = new QRCode(qrContainer, {
    text: value,
    width: size,
    height: size,
    colorDark: qrFgColor.value,
    colorLight: qrBgColor.value,
    correctLevel: getCorrectLevel(),
  });

  downloadBtn.disabled = false;
}

function downloadQr() {
  const format = downloadFormat.value;
  const canvas = qrContainer.querySelector('canvas');
  const link = document.createElement('a');

  if (!canvas) {
    alert('Please generate a QR code first.');
    return;
  }

  if (format === 'png') {
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
  } else if (format === 'jpg') {
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = 'qrcode.jpg';
    link.click();
  } else if (format === 'svg') {
    const svgData = canvas.toDataURL('image/svg+xml');
    const svg = atob(svgData.split(',')[1] || '');
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    link.href = URL.createObjectURL(blob);
    link.download = 'qrcode.svg';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

generateBtn.addEventListener('click', generateQrCode);
downloadBtn.addEventListener('click', downloadQr);
resetBtn.addEventListener('click', clearQr);
qrType.addEventListener('change', updateTypeFields);

qrForm.addEventListener('reset', () => {
  setTimeout(() => {
    downloadBtn.disabled = true;
    updateTypeFields();
  }, 0);
});

qrText.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    generateQrCode();
  }
});

toggleBtn.addEventListener('click', () => {
  optionsFieldset.classList.toggle('hidden');
  const isHidden = optionsFieldset.classList.contains('hidden');
  toggleBtn.textContent = isHidden ? '▶ Show Options' : '▼ Hide Options';
});

updateTypeFields();
