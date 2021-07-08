function handleCopyToClipboard(detailsUrl, setCopiedToClipboardFn) {
  // Lógica de copiar para o clipboard pesquisada no StackOverflow
  // Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
  navigator.clipboard.writeText(`http://localhost:3000${detailsUrl}`);
  setCopiedToClipboardFn(true);
}

export default handleCopyToClipboard;
