const qrForm = document.getElementById('qrForm');
const qrText = document.getElementById('qrText');
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

function generateQrCode() {
  const value = qrText.value.trim();

  if (!value) {
    alert('Please enter text or a URL.');
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
