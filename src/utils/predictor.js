export function predictNextResult(history) {
  if (!Array.isArray(history) || history.length < 3) return '無法預測';

  const lastThree = history.slice(-3);
  const pattern = lastThree.join('-');

  switch (pattern) {
    case '莊-閒-莊':
    case '閒-莊-閒':
      return '閒';
    case '莊-莊-莊':
    case '莊-莊-閒':
      return '莊';
    default:
      return Math.random() > 0.5 ? '莊' : '閒';
  }
}
