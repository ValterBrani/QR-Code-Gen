const qrText = document.getElementById('qrText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.getElementById('qrcode');

let qrCode = null;

function clearQr() {
  qrContainer.innerHTML = '';
}

function generateQrCode() {
  const value = qrText.value.trim();

  if (!value) {
    alert('Merci de saisir un texte ou une URL.');
    return;
  }

  clearQr();

  qrCode = new QRCode(qrContainer, {
    text: value,
    width: 260,
    height: 260,
    correctLevel: QRCode.CorrectLevel.M,
  });

  downloadBtn.disabled = false;
}

function downloadPng() {
  const canvas = qrContainer.querySelector('canvas');
  const img = qrContainer.querySelector('img');

  if (canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qrcode.png';
    link.click();
    return;
  }

  if (img) {
    const link = document.createElement('a');
    link.href = img.src;
    link.download = 'qrcode.png';
    link.click();
  }
}

generateBtn.addEventListener('click', generateQrCode);
downloadBtn.addEventListener('click', downloadPng);

qrText.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    generateQrCode();
  }
});
